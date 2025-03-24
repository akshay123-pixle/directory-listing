import express from "express";
import { getMaterials } from "../controllers/material.controller.js";

const router = express.Router();

router.get("/get-material", getMaterials);

export default router;
