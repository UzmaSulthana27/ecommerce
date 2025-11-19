// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ msg: "Missing token" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    req.user = payload; // payload.sub contains user id
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
