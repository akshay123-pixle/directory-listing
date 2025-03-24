import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [], 
  products:[],
  grades:[],
  materials:[],
  
  
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload; 
    },
    addProduct: (state, action) => {
      state.productList.push(action.payload); 
    },

    setProduct:(state,action)=>{
        state.products=action.payload
    },

    setGrades:(state,action)=>{
        state.grades=action.payload
    },

    setMaterials:(state,action)=>{
        state.materials=action.payload
    }
  },
});


export const { setProducts, addProduct, removeProduct,setProduct,setGrades,setMaterials } = productSlice.actions;


export default productSlice.reducer;
