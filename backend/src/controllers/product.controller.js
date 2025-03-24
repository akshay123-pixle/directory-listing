import {Product} from "../models/product.model.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(!products){
      return res.status(400).json({success:false,message:"No Product Found"})
    }
    return res.status(200).json({success:true,products,message:"Fetched Products"})


  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("🚨 Error:", error);
    res.status(400).json({ error: error.message }); // Sends the actual error
  }
};

