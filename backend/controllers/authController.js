// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { findUserByUsername, findUserByEmail, createUser, findUserById } from "../models/userModel.js";
import { saveRefreshToken, deleteRefreshToken, findRefreshToken, deleteRefreshTokensByUser } from "../models/tokenModel.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXP || "15m";
const REFRESH_EXP = process.env.REFRESH_TOKEN_EXP || "7d";

const signAccessToken = (payload) => jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
const signRefreshToken = (payload) => jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ msg: "All fields required" });

    if (await findUserByUsername(username)) return res.status(400).json({ msg: "Username already taken" });
    if (await findUserByEmail(email)) return res.status(400).json({ msg: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, passwordHash);
    return res.status(201).json({ msg: "User created", user });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Missing credentials" });

    const userRow = await findUserByUsername(username);
    if (!userRow) return res.status(401).json({ msg: "Invalid credentials" });

    // userRow has password_hash in DB; if using model that omitted hash, fetch raw row
    // get password hash directly
    // We'll query password field
    const { password_hash, id } = userRow;
    const ok = await bcrypt.compare(password, password_hash || userRow.password_hash);
    if (!ok) return res.status(401).json({ msg: "Invalid credentials" });

    const accessToken = signAccessToken({ sub: id, username: userRow.username });
    const refreshToken = signRefreshToken({ sub: id });

    // save refresh token server-side (for revoke)
    const expiresAt = new Date(Date.now() + parseExpiryToMs(REFRESH_EXP));
    await saveRefreshToken(id, refreshToken, expiresAt);

    // set HttpOnly cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseExpiryToMs(REFRESH_EXP),
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: "/"
    });

    // return accessToken and basic user info
    const user = await findUserById(id);
    return res.json({ accessToken, user });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ msg: "No refresh token" });

    // ensure token is stored in DB
    const dbToken = await findRefreshToken(token);
    if (!dbToken) return res.status(401).json({ msg: "Invalid refresh token" });

    // verify token
    jwt.verify(token, REFRESH_SECRET, async (err, payload) => {
      if (err) {
        // remove from DB if invalid
        await deleteRefreshToken(token).catch(() => {});
        return res.status(401).json({ msg: "Invalid refresh token" });
      }
      const userId = payload.sub;

      // rotate: delete old token and create new
      await deleteRefreshToken(token);
      const newRefresh = signRefreshToken({ sub: userId });
      const expiresAt = new Date(Date.now() + parseExpiryToMs(REFRESH_EXP));
      await saveRefreshToken(userId, newRefresh, expiresAt);

      // set new cookie
      res.cookie("refreshToken", newRefresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: parseExpiryToMs(REFRESH_EXP),
        domain: process.env.COOKIE_DOMAIN || undefined,
        path: "/"
      });

      const accessToken = signAccessToken({ sub: userId });
      return res.json({ accessToken });
    });
  } catch (err) {
    console.error("refresh error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      await deleteRefreshToken(token).catch(() => {});
    }
    // clear cookie
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    console.error("logout error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// helper to parse "7d" or "15m" strings to milliseconds
function parseExpiryToMs(exp) {
  // simple parser: digits + unit (s,m,h,d)
  const m = exp.match(/^(\d+)([smhd])$/);
  if (!m) {
    // fallback to days if something odd
    return 7 * 24 * 60 * 60 * 1000;
  }
  const num = Number(m[1]);
  const unit = m[2];
  switch (unit) {
    case "s": return num * 1000;
    case "m": return num * 60 * 1000;
    case "h": return num * 60 * 60 * 1000;
    case "d": return num * 24 * 60 * 60 * 1000;
    default: return num * 1000;
  }
}
