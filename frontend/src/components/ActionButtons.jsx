const ActionButtons = ({
  onGenerate,
  onSortByName,
  onSortByStock,
  onDecrease,
  onIncreaseEven,
}) => (
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    <button onClick={onGenerate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Generate Products
    </button>
    <button onClick={onSortByName} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
      Sort by Name ↑
    </button>
    <button onClick={onSortByStock} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
      Sort by Stock ↓
    </button>
    <button onClick={onDecrease} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
      Reduce Stock by 2
    </button>
    <button onClick={onIncreaseEven} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
      Increase Even Stock
    </button>
  </div>
);

export default ActionButtons;
