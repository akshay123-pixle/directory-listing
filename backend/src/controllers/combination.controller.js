import {Combination} from "../models/combination.model.js"
import { Product } from "../models/product.model.js";
import { Material } from "../models/material.model.js";
import { Grade } from "../models/grade.model.js";


export const createProductCombination = async (req, res) => {
  try {
    const { productId, materialId, gradeIds } = req.body;
    // console.log(req.body);
    

    // Validate product, material, and grades
    const product = await Product.findById(productId);
    const material = await Material.findById(materialId);
    const grades = await Grade.find({ _id: { $in: gradeIds } });

    if (!product || !material || grades.length !== gradeIds.length) {
      return res.status(400).json({ message: "Invalid product, material, or grades" });
    }

    // Generate final product name
    const gradeNames = grades.map((grade) => grade.name).join(" ");
    const finalName = `${material.name} ${gradeNames} ${product.name}`;

    // Check if combination already exists
    let existingCombination = await Combination.findOne({
      productId,
      materialId,
      gradeIds: { $all: gradeIds }
    });

    if (existingCombination) {
      existingCombination.count += 1;
      await existingCombination.save();
      return res.status(200).json({ message: "Product count updated", data: existingCombination });
    }

    // Create new combination
    const newCombination = new Combination({
      productId,
      materialId,
      gradeIds,
      finalProductName:finalName,
      count: 1
    });

    await newCombination.save();
    res.status(201).json({ message: "Product combination created", data: newCombination });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//  Get All Product Combinations
export const getAllProductCombinations = async (req, res) => {
  try {
    const combinations = await Combination.find()
      .populate("productId", "name")
      .populate("materialId", "name")
      .populate("gradeIds", "name");

    res.status(200).json(combinations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//  Update Product Combination
export const updateProductCombination = async (req, res) => {
  try {
    const { id } = req.params;
    const {material, price, shape, length, thickness } = req.body;
    

    const updatedCombination = await Combination.findByIdAndUpdate(
      id,
      {price, shape, length, thickness },
      { new: true }
    );

  

    if (!updatedCombination) {
      return res.status(404).json({ message: "Product combination not found" });
    }

    res.status(200).json({ message: "Product updated", data: updatedCombination });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//  Bulk Edit Product Combinations
export const bulkEditProductCombinations = async (req, res) => {
  try {
    const { productIds, updateData } = req.body;

    const updatedProducts = await Combination.updateMany(
      { _id: { $in: productIds } },
      { $set: updateData }
    );

    res.status(200).json({ message: "Products updated", data: updatedProducts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//  Bulk Delete Product Combinations i will implement this if it will be told by interviewer
export const bulkDeleteProductCombinations = async (req, res) => {
  try {
    const { productIds } = req.body;

    const deletedProducts = await Combination.deleteMany({
      _id: { $in: productIds }
    });

    res.status(200).json({ message: "Products deleted", data: deletedProducts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
