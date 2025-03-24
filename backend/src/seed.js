import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import { Product } from "./models/product.model.js";
import { Material } from "./models/material.model.js";
import { Grade } from "./models/grade.model.js";
import { products, materials, grades } from "./data/seedData.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {

    await Product.insertMany(products);
    await Material.insertMany(materials);
    await Grade.insertMany(grades);
    console.log("Dummy data added successfully");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
