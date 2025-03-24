import {Grade} from "../models/grade.model.js"

export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    if(!grades){
      return res.status(400).json({success:false,message:"No grades Found"})

    }
    return res.status(200).json({success:true,grades,message:" Fetched grades"})

    
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
