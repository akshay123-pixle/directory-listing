import express from "express";
import {
  createProductCombination,
  getAllProductCombinations,
  updateProductCombination,
  bulkEditProductCombinations,
  bulkDeleteProductCombinations
} from "../controllers/combination.controller.js";

const combinationRouter = express.Router();

//Route to create a new product combination
combinationRouter.post("/create", createProductCombination);

// Route to get all product combinations
combinationRouter.get("/", getAllProductCombinations);
// Route to bulk edit multiple product combinations
combinationRouter.put("/bulk-edit", bulkEditProductCombinations);
// Route to bulk delete multiple product combinations
combinationRouter.delete("/bulk-delete", bulkDeleteProductCombinations);

// Route to update a single product combination
combinationRouter.put("/:id", updateProductCombination);




export default combinationRouter;
