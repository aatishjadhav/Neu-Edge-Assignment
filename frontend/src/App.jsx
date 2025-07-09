// import React, { useState, useEffect } from "react";
// import {
//   generateProducts,
//   getProducts,
//   decreaseStock,
//   increaseEvenStock,
// } from "./services/api";

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [sortBy, setSortBy] = useState("itemNumber");
//   const [order, setOrder] = useState("asc");
//   const [loading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getProducts({ page, sortBy, order });

//       if (!data || !data.products) {
//         console.error("Invalid response:", data);
//         return;
//       }

//       setProducts(data.products);
//       setTotalPages(data.totalPages);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching data:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, sortBy, order]);

//   const handleGenerate = async () => {
//     await generateProducts();
//     fetchData();
//   };

//   const handleDecrease = async () => {
//     await decreaseStock();
//     fetchData();
//   };

//   const handleIncreaseEven = async () => {
//     await increaseEvenStock();
//     fetchData();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           📦 Product Inventory Dashboard
//         </h1>

//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           <button
//             onClick={handleGenerate}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Generate Products
//           </button>
//           <button
//             onClick={() => {
//               setSortBy("itemNumber");
//               setOrder("asc");
//             }}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//           >
//             Sort by Name ↑
//           </button>
//           <button
//             onClick={() => {
//               setSortBy("stockOnHand");
//               setOrder("desc");
//             }}
//             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//           >
//             Sort by Stock ↓
//           </button>
//           <button
//             onClick={handleDecrease}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//           >
//             Reduce Stock by 2
//           </button>
//           <button
//             onClick={handleIncreaseEven}
//             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//           >
//             Increase Even Stock
//           </button>
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border border-gray-300 rounded-lg shadow-sm">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="p-3 border">Product Name</th>
//                   <th className="p-3 border">Stock On Hand</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((p, idx) => (
//                   <tr
//                     key={p._id}
//                     className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                   >
//                     <td className="p-3 border text-center font-medium">
//                       {p.productName}
//                     </td>
//                     <td className="p-3 border text-center">{p.stockOnHand}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {products.length > 0 && (
//           <div className="mt-6 flex justify-center flex-wrap gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 rounded border ${
//                   page === i + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-800 hover:bg-gray-200"
//                 } transition`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

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
