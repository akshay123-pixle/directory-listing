import {Material} from "../models/material.model.js"

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    if(!materials){
    return res.status(400).json({success:true,grades,message:"No materials Found"})

    }

    return res.status(200).json({success:true,materials,message:"Fetched materials"})

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
