const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mt-6 flex justify-center flex-wrap gap-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`px-3 py-1 rounded border ${
          currentPage === i + 1
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800 hover:bg-gray-200"
        } transition`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
