import mongoose from "mongoose";

const combinationSchema = new mongoose.Schema(
  {
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    materialId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Material", 
      required: true 
    },
    gradeIds: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Grade", 
      required: true 
    }],
    finalProductName: { 
      type: String, 
    }, 

    count: { 
      type: Number, 
      default: 1, 
      min: 0 
    }, 

    price: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    shape: { type: String, default: "" },
    length: { type: String, default: "" },
    thickness: { type: String, default: "" }
  },
  { timestamps: true }
);


combinationSchema.index({ productId: 1, materialId: 1 });

export const Combination = mongoose.model("Combination", combinationSchema);
