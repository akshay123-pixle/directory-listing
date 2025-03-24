import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import productRoutes from "./routes/product.routes.js";
import materialRoutes from "./routes/material.routes.js";
import combinationRouter from "./routes/combination.routes.js";
import gradeRouter from "./routes/grade.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods:['GET',"POST","PUT"],
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Working backend");
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/materials", materialRoutes);
app.use("/api/v1/grades", gradeRouter);
app.use("/api/v1/combination", combinationRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
