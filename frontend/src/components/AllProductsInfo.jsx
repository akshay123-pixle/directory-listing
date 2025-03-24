import axios from "axios";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function AllProductsInfo() {
  const [expandedRow, setExpandedRow] = useState(null);
  const productList = useSelector((state) => state.products.productList);
  const [price, setPrice] = useState("");
  const [shape, setShape] = useState("");
  const [length, setLength] = useState("");
  const [thickness, setThickness] = useState("");
  const [material, setMaterial] = useState("");
  const [productId, setProductId] = useState(null);
  const [multiProductIds, setMultiProductIds] = useState([]);
  const [index,setIndex]=useState(null)
  console.log("index", typeof(index));
  

  ///

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const materials = [
    ...new Set(productList.map((item) => item.materialId?.name)),
  ];
  const products = [
    ...new Set(
      productList.map((item) => item.finalProductName?.split(" ").pop())
    ),
  ];

  // Filtered products
  const filteredProducts = productList.filter((item) => {
    const matchesSearch =
      item.finalProductName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.materialId?.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProduct = selectedProduct
      ? item.finalProductName?.endsWith(selectedProduct)
      : true;

    const matchesMaterial = selectedMaterial
      ? item.materialId?.name === selectedMaterial
      : true;

    return matchesSearch && matchesProduct && matchesMaterial;
  });

  //



  const handleMultiProductIds = (_id) => {
    setMultiProductIds((prev) =>
      prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
    );
  };

  console.log(multiProductIds);

  // console.log(productId);

  const handleDetailsSubmit = async () => {
    console.log("Submitting details for productId:", productId);
    


    const updateData = {
      price,
      shape,
      length,
      thickness,
    };

    if (multiProductIds.length > 0) {
      console.log("Doing Bulk Update for IDs:", multiProductIds);
      try {
        const response = await axios.put(
          "http://localhost:5000/api/v1/combination/bulk-edit",
          { productIds: multiProductIds, updateData } 
        );
        console.log("Success for bulk update:", response.data);
        setExpandedRow(false);
        window.location.reload();

        return; 
      } catch (error) {
        console.error("Error occurred during bulk update:", error);
        return;
      }
    }

    if (productId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/combination/${productId}`,
          updateData
        );
        console.log("Success for single update:", response.data);
        setExpandedRow(false);
        window.location.reload();

      } catch (error) {
        console.error("Error occurred during single update:", error);
      }
    } else {
      console.log("Error: productId is undefined or no products selected.");
    }
  };

  // console.log(productList);

  // Function to toggle row expansion
  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Search Section */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search Products...."
          className="border px-4 py-2 rounded-l-md w-[500px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Filters and Actions */}
      <div className="flex justify-between p-4 rounded-md">
        <div className="flex space-x-6">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-white cursor-pointer h-8 px-4 rounded-xl"
          >
            <option value="">All Products</option>
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>

          {/* Material Filter */}
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="bg-white cursor-pointer h-8 px-4 rounded-xl"
          >
            <option value="">All Materials</option>
            {materials.map((material, index) => (
              <option key={index} value={material}>
                {material}
              </option>
            ))}
          </select>
          <div className="flex items-center bg-white cursor-pointer h-8 px-4 rounded-xl">
            Filter
          </div>
          <div className="flex items-center bg-white cursor-pointer h-8 px-4 rounded-xl">
            Bulk Actions <RiArrowDropDownLine className="text-2xl ml-16" />
          </div>
          <div className="flex items-center bg-white cursor-pointer h-8 px-4 rounded-xl">
            Apply
          </div>
        </div>
        <div className="flex items-center">
          Products
          <span className="bg-white cursor-pointer h-8 px-4 rounded-xl ml-2 flex items-center">
            {filteredProducts.length}{" "}
            <RiArrowDropDownLine className="text-xl ml-2" />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-md shadow-md">
          <thead className="bg-cyan-200">
            <tr className="text-left">
              <th className="p-3 w-10">
                <input type="checkbox" className="w-4 h-4 accent-black" />
              </th>
              <th className="p-3">Products</th>
              <th className="p-3">Action</th>
              <th className="p-3">Products Details</th>
              <th className="p-3">Price in Units</th>
            </tr>
          </thead>
          <tbody>
            {/* Row */}
            {expandedRow !== 0 &&
              filteredProducts.map((item, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      onChange={() => handleMultiProductIds(item._id)}
                      checked={multiProductIds.includes(item._id)} 
                      className="w-4 h-4 accent-black"
                    />
                  </td>

                  <td className="p-3">
                    {item.finalProductName || "Product XYZ"}
                  </td>
                  <td className="p-3">
                    <button
                      className="text-blue-400 px-3 py-1"
                      onClick={() => {
                        toggleExpand(0);
                        setProductId(item._id,index);
                        setIndex(index);  
                      }}
                    >
                      Quick Edit
                    </button>
                    <span className="text-blue-400"> | </span>
                    <button className="text-blue-400 px-3 py-1">
                      Add Product Details
                    </button>
                  </td>
                  <td className="p-3 leading-none">
                    <p>
                      <span className="font-semibold">Material</span>:
                      {item.materialId.name || " Empty"}
                    </p>
                    <p>
                      <span className="font-semibold">Unit Length</span>:{" "}
                      {item.length+ " meter" || "Empty"}
                    </p>
                    <p>
                      <span className="font-semibold">Shape</span>:{" "}
                      {item.shape || "Empty"}
                    </p>
                  </td>
                  <td className="p-3">{item.price || "Empty"}/KG</td>
                </tr>
              ))}

            {/* Inline Expanded Row - Replaces the existing row when expanded */}
            {expandedRow === 0 && (
              <tr className="border-b bg-gray-100">
                <td colSpan="5" className="p-4">
                  <div>
                    <p className=" text-sm my-2 font-semibold">Quick Edit</p>
                    <div className="flex items-center mb-4 space-x-40">
                      <div className="mr-2 flex items-center">
                        <span className="mr-2">Title</span>
                        <p>{productList[index].finalProductName}</p>
                      </div>
                      <div className="ml-4 flex items-center">
                        <span className="mr-2">Price</span>
                        <select className="border px-2 py-1 rounded-l-md text-sm">
                          <option>INR</option>
                          <option>USD</option>
                          <option>EUR</option>
                        </select>
                        <input
                          type="text"
                          className="border-t border-b border-r px-2 py-1 w-16 text-sm"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <select className="border px-2 py-1 rounded-r-md text-sm">
                          <option>KG</option>
                          <option>Unit</option>
                          <option>Meter</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full h-[2px] bg-gray-400"></div>

                    <p className="text-sm my-2 font-semibold ">
                      Product Details
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <label className="block text-sm font-medium w-32">
                          Material
                        </label>
                        <p>{productList[index].materialId.name}</p>

                      </div>
                      <div className="flex items-center">
                        <label className="block text-sm font-medium w-32">
                          Shape
                        </label>
                        <input
                          type="text"
                          className="border px-3 py-1 rounded-md w-52"
                          value={shape}
                          onChange={(e) => setShape(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-sm font-medium w-32">
                          Length
                        </label>
                        <input
                          type="text"
                          className="border px-3 py-1 rounded-md w-52"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <label className="block text-sm font-medium w-32">
                          thickness
                        </label>
                        <input
                          type="text"
                          className="border px-3 py-1 rounded-md w-52"
                          value={thickness}
                          onChange={(e) => setThickness(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-sm font-medium w-32">
                          Surface Finish
                        </label>
                        <input
                          type="text"
                          className="border px-3 py-1 rounded-md w-52"
                          defaultValue="Matte"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-sm font-medium w-32">
                          Outside Dia
                        </label>
                        <input
                          type="text"
                          className="border px-3 py-1 rounded-md w-52"
                          defaultValue="40mm"
                        />
                      </div>
                    </div>

                    <div className="flex mt-4">
                      <button
                        onClick={() => handleDetailsSubmit()
                        }
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600 mr-2"
                      >
                        Update
                      </button>
                      <button
                        className="bg-gray-300 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600"
                        onClick={() => setExpandedRow(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
