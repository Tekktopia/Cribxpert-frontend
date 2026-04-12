import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 2) pages.push('...');

    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    if (currentPage < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-between items-center py-4">
      {/* Buttons*/}
      <button></button>

      {!(currentPage === totalPages) && (
        <button
          className="bg-primary hover:bg-hoverColor text-white px-6 py-2 rounded-md cursor-pointer hidden md:flex"
          onClick={handleNext}
        >
          Next Page
        </button>
      )}

      {currentPage === totalPages && (
        <button
          className="bg-primary hover:bg-hoverColor text-white px-6 py-2 rounded-md cursor-pointer hidden md:flex"
          onClick={handlePrev}
        >
          Previous Page
        </button>
      )}

      {/* Main Pagination */}
      <div className="flex items-center w-full md:w-auto justify-center space-x-2 text-sm">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="bg-[#e6ebf1] text-[#1D5C5C] px-2 py-1 rounded cursor-pointer"
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded cursor-pointer ${
                page === currentPage
                  ? 'bg-[#1D5C5C] text-white'
                  : 'bg-[#e6ebf1] text-[#1D5C5C]'
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-3 py-1 rounded bg-[#e6ebf1] text-[#1D5C5C]"
            >
              ...
            </span>
          )
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="bg-[#e6ebf1] text-[#1D5C5C] cursor-pointer px-2 py-1 rounded"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
