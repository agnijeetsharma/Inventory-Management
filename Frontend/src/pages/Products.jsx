import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProductQuantity } from "../services/api";

import ProductCards from "../component/ProductCard";
import ProductForms from "../component/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const fetchProducts = async (pageNum = 1) => {
    try {
      const res = await getProducts(pageNum);

      // Defensive fallback depending on backend response structure
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.products || [];

      setProducts(data);
      setPage(pageNum);
      setError("");
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to load products. Please try again later.");
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await addProduct(product);
      fetchProducts(page);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  const handleQuantityUpdate = async (id, quantity) => {
    if (!quantity || isNaN(quantity)) return;

    try {
      await updateProductQuantity(id, Number(quantity));
      fetchProducts(page);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Error updating product quantity");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Products
        </h1>

        <ProductForms onSubmit={handleAddProduct} />

        {error && (
          <p className="text-red-500 text-center my-4 text-sm font-medium">
            {error}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductCards
                key={product._id}
                product={product}
                onQuantityUpdate={handleQuantityUpdate}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products found.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => fetchProducts(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {page}
          </span>

          <button
            onClick={() => fetchProducts(page + 1)}
            className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
