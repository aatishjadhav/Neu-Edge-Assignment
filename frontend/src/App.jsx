import React, { useState, useEffect } from "react";
import {
  generateProducts,
  getProducts,
  decreaseStock,
  increaseEvenStock,
} from "./services/api";
import ProductTable from "./components/ProductTable";
import ActionButtons from "./components/ActionButtons";
import Pagination from "./components/Pagination";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("itemNumber");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getProducts({ page, sortBy, order });
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortBy, order]);

  const handleGenerate = async () => {
    await generateProducts();
    fetchData();
  };

  const handleDecrease = async () => {
    await decreaseStock();
    fetchData();
  };

  const handleIncreaseEven = async () => {
    await increaseEvenStock();
    fetchData();
  };

  const handleSortByName = () => {
    setSortBy("itemNumber");
    setOrder("asc");
  };

  const handleSortByStock = () => {
    setSortBy("stockOnHand");
    setOrder("desc");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          📦 Product Inventory Dashboard
        </h1>

        <ActionButtons
          onGenerate={handleGenerate}
          onSortByName={handleSortByName}
          onSortByStock={handleSortByStock}
          onDecrease={handleDecrease}
          onIncreaseEven={handleIncreaseEven}
        />

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            The inventory is currently empty. Click{" "}
            <span className="font-semibold text-blue-600">
              "Generate Products"
            </span>{" "}
            to initialize the dataset and simulate product records for this
            dashboard.
          </div>
        ) : (
          <ProductTable products={products} />
        )}

        {products.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default App;
