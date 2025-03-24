import React, { useEffect } from "react";
import AddProducts from "./components/AddProducts";
import AllProductsInfo from "./components/AllProductsInfo";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios"
import { setGrades, setMaterials, setProduct, setProducts } from "./store/productSlice.js";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/combination");
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]); 
  
  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/products/get-products");
        dispatch(setProduct(response.data.products));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  },[dispatch])
  useEffect(()=>{
    const fetchGrades = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/grades/get-grades");
        dispatch(setGrades(response.data.grades));
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };

    fetchGrades();
  },[dispatch])
  useEffect(()=>{
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/materials/get-material");
        dispatch(setMaterials(response.data.materials));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchMaterials();
  },[dispatch])

  return (
    <>
      <div className="bg-sky-100">
        <AddProducts />
        <AllProductsInfo />
      </div>

      <Toaster />
    </>
  );
}
