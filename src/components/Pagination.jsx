import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center my-6 gap-2">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`text-2xl p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        }`}
        aria-label="Previous page"
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <span className="px-4 py-2 mx-2 text-gray-700 font-medium select-none">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`text-2xl p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        }`}
        aria-label="Next page"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

export default Pagination;
