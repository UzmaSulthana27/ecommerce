// backend/models/userModel.js
import { pool } from "../db.js";

export const findUserByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const createUser = async (username, email, passwordHash) => {
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, passwordHash]
  );
  const insertId = result.insertId;
  const [rows] = await pool.query("SELECT id, username, email, created_at FROM users WHERE id = ?", [insertId]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT id, username, email, created_at FROM users WHERE id = ?", [id]);
  return rows[0];
};
