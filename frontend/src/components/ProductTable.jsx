const ProductTable = ({ products }) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto border border-gray-300 rounded-lg shadow-sm">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="p-3 border">Product Name</th>
          <th className="p-3 border">Stock On Hand</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, idx) => (
          <tr key={p._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="p-3 border text-center font-medium">{p.productName}</td>
            <td className="p-3 border text-center">{p.stockOnHand}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
