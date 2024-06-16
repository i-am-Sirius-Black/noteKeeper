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

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="text-2xl"
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <span className="px-4 py-2 mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="text-2xl"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

export default Pagination;
