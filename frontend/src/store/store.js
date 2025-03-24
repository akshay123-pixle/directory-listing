import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice.js"; 

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store; 