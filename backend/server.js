// backend/server.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

// CORS - allow frontend origin. change origin in production.
app.use(cors({
  origin: "http://localhost:3000", // front-end origin
  credentials: true
}));

app.get("/", (req, res) => res.send("MyShop API is running"));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
