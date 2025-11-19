// backend/controllers/productController.js
import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    return res.json({ products: rows });
  } catch (err) {
    console.error("getProducts error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
