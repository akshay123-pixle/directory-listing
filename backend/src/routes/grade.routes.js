import express from "express";
import { getGrades } from "../controllers/grade.controller.js";


const gradeRouter = express.Router();

gradeRouter.get("/get-grades", getGrades);

export default gradeRouter;
