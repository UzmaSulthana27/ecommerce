// backend/models/tokenModel.js
import { pool } from "../db.js";

export const saveRefreshToken = async (userId, token, expiresAt) => {
  await pool.query("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)", [userId, token, expiresAt]);
};

export const deleteRefreshToken = async (token) => {
  await pool.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};

export const deleteRefreshTokensByUser = async (userId) => {
  await pool.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
};

export const findRefreshToken = async (token) => {
  const [rows] = await pool.query("SELECT * FROM refresh_tokens WHERE token = ?", [token]);
  return rows[0];
};
