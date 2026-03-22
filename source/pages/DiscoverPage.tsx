import DiscoverResults from '@/features/search/components/DiscoverResults';
import FilterPanel from '@/features/home/components/FilterPanel';
import { Settings2Icon } from 'lucide-react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterCategories from '@/features/home/components/FilterCategories';
import Footer from '@/shared/components/layout/Footer';

export default function DiscoverPage() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Get search query from URL params
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    // Update URL to remove search param
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${newParams}`
    );
  }, [searchParams]);

  const handleToggle = useCallback(() => {
    setIsFilterPanelOpen((prev) => !prev);
  }, []);

  // Memoize the main content area classes to prevent unnecessary recalculations
  const mainContentClasses = useMemo(() => {
    return isFilterPanelOpen ? 'md:w-3/4' : 'w-full';
  }, [isFilterPanelOpen]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <div className="xl:container mx-auto lg:mt-4 w-full flex flex-col md:flex-row relative bg-white pb-6">
          {/* Filter panel */}
          <FilterPanel isOpen={isFilterPanelOpen} handleToggle={handleToggle} />

          {/* Main content area with responsive layout */}
          <div className={`${mainContentClasses} w-full mb-8 pt-0`}>
            <div className="sticky top-0 z-10 bg-white pt-4">
              <div className="flex flex-col items-center md:flex-row gap-4 mb-4">
                {!isFilterPanelOpen && (
                  <button
                    className="flex items-center max-h-[50px] border border-[#1D5C5C] p-3 bg-white rounded-md transition-colors hover:bg-gray-50"
                    onClick={handleToggle}
                    aria-label="Show filters"
                  >
                    <Settings2Icon size={18} />
                    <span>Filters</span>
                  </button>
                )}

                {/* Show clear search button when there's an active search */}
                {searchQuery && (
                  <button
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-md transition-colors"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Clear search: "{searchQuery}"</span>
                  </button>
                )}

                {/* Scrollable filter categories with optimized images */}
                <FilterCategories />
              </div>
            </div>

            {/* Discovery results with responsive layout */}
            <DiscoverResults
              isOpen={isFilterPanelOpen}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
      
      {/* Footer - force it to show */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}