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
  if (totalPages <= 1) return null;

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

    if (currentPage > 3) pages.push('...');

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...');

    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-neutral-100 mt-12 gap-8">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 disabled:opacity-20 transition-all hover:text-primary"
        >
          <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center group-hover:border-primary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="hidden sm:inline">Previous</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full text-[10px] font-bold transition-all duration-300 ${
                page === currentPage
                  ? 'bg-neutral-900 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="text-neutral-300 text-xs px-2"
            >
              {page}
            </span>
          )
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 disabled:opacity-20 transition-all hover:text-primary"
        >
          <span className="hidden sm:inline">Next</span>
          <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center group-hover:border-primary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
