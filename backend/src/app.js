import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import productRoutes from "./routes/product.routes.js";
import materialRoutes from "./routes/material.routes.js";
import combinationRouter from "./routes/combination.routes.js"
import gradeRouter from "./routes/grade.routes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true,
    })
  );
  
app.use(helmet());
app.use(morgan("dev"));

app.use('/',(req,res)=>{
  res.send("Working backned")
})

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/materials", materialRoutes);
app.use("/api/v1/grades",gradeRouter)
app.use("/api/v1/combination",combinationRouter)

export default app;
