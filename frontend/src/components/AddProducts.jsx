import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AddProducts() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const productList = useSelector((state) => state.products.productList);
  const products = useSelector((state) => state.products.products);
  const grades = useSelector((state) => state.products.grades);
  const materials = useSelector((state) => state.products.materials);

  // console.log(products);
  // console.log(grades);
  // console.log(materials);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedGrades, setSelectedGrades] = useState([]);

  // Function to select a single product or material
  const handleSingleSelect = (category, item) => {
    if (category === "product") {
      setSelectedProduct({ ...item, count: 1 });
    } else if (category === "material") {
      setSelectedMaterial({ ...item, count: 1 });
    }
  };

  // Function to select multiple grades
  const handleGradeSelect = (grade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };
  console.log(selectedGrades);

  const addProduct = async (productId, materialId, gradeIds) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/combination/create",
        {
          productId,
          materialId,
          gradeIds,
        }
      );
      // console.log("Product added successfully:",  response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmit = () => {
    if (selectedProduct && selectedMaterial && selectedGrades.length > 0) {
      const productId = selectedProduct?._id;
      const materialId = selectedMaterial?._id;
      const gradeIds = selectedGrades.map((grade) => grade?._id);

      addProduct(productId, materialId, gradeIds);
      setOpenAddProduct(false);
      toast.success("Product added successfully");
      window.location.reload();

    }
  };

  return (
    <>
      <div className="flex items-center justify-start space-x-6 p-6">
        {/* Add Products Button */}
        <div
          onClick={() => setOpenAddProduct(true)}
          className="flex items-center cursor-pointer justify-between text-sm bg-blue-600 text-white px-10 py-2 rounded-3xl hover:bg-blue-700 transition duration-200"
        >
          <span className="px-2">
            <FaPlus />
          </span>
          Add Products
        </div>

        {/* Product Count */}
        <div className="bg-white px-10 py-2 rounded-full shadow">
          <span className="text-black font-bold">
            {productList?.length || 0}/400
          </span>
          <span className="text-sm ml-2">Products</span>
        </div>
      </div>

      {/* Show Product List when `openAddProduct` is true */}
      {openAddProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative w-[80%] max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
            <button
              onClick={() => setOpenAddProduct(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              <div className="flex items-center justify-end space-x-2">
                <span className="text-sm">
                  {selectedGrades.length}/100 Products Selected
                </span>
                <div className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded-full p-1 cursor-pointer hover:bg-gray-200">
                  <FaTimes className="text-gray-600" />
                </div>
              </div>
            </button>

            {/* Heading */}
            <h2 className="text-xl font-bold text-center mb-4">All Products</h2>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-6">
              {/* Product Column */}

              <div className="border border-gray-400 rounded-md bg-gray-50">
                <h2 className="text-lg font-bold text-center border-b py-2 bg-gray-200 sticky top-0">
                  Product
                </h2>
                <div className="h-80 overflow-y-auto p-2">
                  {products && products.length > 0 ? (
                    products.map((item, i) => (
                      <div
                        key={item?._id || `product-${i}`}
                        className={`flex items-center justify-between px-2 py-1 border-b cursor-pointer ${
                          selectedProduct?.name === item.name
                            ? "bg-sky-200"
                            : ""
                        }`}
                        onClick={() => handleSingleSelect("product", item)}
                      >
                        <span>
                          {item?.name ||
                            `Product ${i + 1}` ||
                            "Unnamed Product"}
                        </span>
                        {selectedProduct?.name === item.name && (
                          <span className="text-sm text-gray-700">
                            {selectedProduct?.count || 1}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-2 py-1 text-gray-500">
                      No products available
                    </div>
                  )}
                </div>
              </div>

              {/* Material Column */}
              <div className="border border-gray-400 rounded-md bg-gray-50">
                <h2 className="text-lg font-bold text-center border-b py-2 bg-gray-200 sticky top-0">
                  Material
                </h2>
                <div className="h-80 overflow-y-auto p-2">
                  {materials && materials.length > 0 ? (
                    materials.map((item, i) => (
                      <div
                        key={item?._id || `material-${i}`}
                        className={`flex items-center justify-between px-2 py-1 border-b cursor-pointer ${
                          selectedMaterial?.name === item.name
                            ? "bg-sky-200"
                            : ""
                        }`}
                        onClick={() => handleSingleSelect("material", item)}
                      >
                        <span>
                          {item?.name ||
                            `Material ${i + 1}` ||
                            "Unnamed Material"}
                        </span>
                        {selectedMaterial?.name === item.name && (
                          <span className="text-sm text-gray-700">
                            {selectedMaterial?.count || 1}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-2 py-1 text-gray-500">
                      No materials available
                    </div>
                  )}
                </div>
              </div>

              {/* Grades Column */}
              <div className="border border-gray-400 rounded-md bg-gray-50">
                <h2 className="text-lg font-bold text-center border-b py-2 bg-gray-200 sticky top-0">
                  Grades
                </h2>
                <div className="h-80 overflow-y-auto p-2">
                  {grades && grades.length > 0 ? (
                    grades.map((item, i) => (
                      <div
                        key={item?._id || `grade-${i}`}
                        className={`flex items-center justify-between px-2 py-1 border-b cursor-pointer ${
                          selectedGrades.includes(item) ? "bg-sky-200" : ""
                        }`}
                      >
                        {item?.name ||
                          item?.grade ||
                          `Grade ${i + 1}` ||
                          "Unnamed Grade"}
                        <input
                          type="checkbox"
                          checked={selectedGrades.includes(item)}
                          onChange={() => handleGradeSelect(item)}
                          className="cursor-pointer accent-black"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="px-2 py-1 text-gray-500">
                      No grades available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-6 block mx-auto bg-blue-400 text-white px-20 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
