// backend/routes/productRoutes.js
import express from "express";
import { getProducts } from "../controllers/productController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getProducts);

export default router;
