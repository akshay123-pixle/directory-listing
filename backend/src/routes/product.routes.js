import express from "express";
import { getProducts, addProduct } from "../controllers/product.controller.js"

const router = express.Router();

router.get("/get-products", getProducts);
router.post("/add-products", addProduct);

export default router;
