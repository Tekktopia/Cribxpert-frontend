import DiscoverResults from '@/components/discover-components/DiscoverResults';
import FilterPanel from '@/components/discover-components/FilterPanel';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { Filter } from '@/utils/data';
import { Settings2Icon } from 'lucide-react';
import { useState, useCallback } from 'react';
import OptimizedImage from '@/components/common/OptimizedImage';
import Footer from '@/components/layout/Footer';

export default function DiscoverPage() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setIsFilterPanelOpen((prev) => !prev);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed header */}
      <div className="fixed top-0 w-full z-40 bg-white shadow-sm">
        <Header />
      </div>
      {/* Spacer to prevent content from being hidden behind the fixed header */}
      <HeaderSpacer />
      {/* Main content with proper spacing */}
      <div className="xl:container mx-auto sm:px-6 lg:px-8 lg:mt-8 w-full flex flex-col md:flex-row relative bg-white">
        {/* Filter panel */}
        <FilterPanel isOpen={isFilterPanelOpen} handleToggle={handleToggle} />

        {/* Main content area with responsive layout */}
        <div
          className={`${
            isFilterPanelOpen ? 'md:w-3/4 md:ml-8 hidden md:block' : 'w-full'
          } transition-all duration-200 ease-in-out w-full md:ml-0 mb-8 p-4 pt-0`}
        >
          <div className="sticky top-0 z-30 bg-white pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
            {!isFilterPanelOpen && (
              <button
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                onClick={handleToggle}
                aria-label="Show filters"
              >
                <Settings2Icon size={18} />
                <span>Filters</span>
              </button>
            )}

            {/* Scrollable filter categories with optimized images */}
            <div className="w-full overflow-x-auto py-2 scrollbar-hide">
              <div className="flex items-center gap-6 min-w-max px-2">
                {Filter.map((filter, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <OptimizedImage
                      src={filter.image}
                      alt={filter.name}
                      width={24}
                      height={24}
                      loading={index < 5 ? 'eager' : 'lazy'}
                      className="w-[24px] h-[24px] object-contain"
                    />
                    <p className="text-[14px] font-[400] text-[#999999] mt-1 whitespace-nowrap">
                      {filter.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
          

          {/* Discovery results with responsive layout */}
          <DiscoverResults isOpen={isFilterPanelOpen} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
