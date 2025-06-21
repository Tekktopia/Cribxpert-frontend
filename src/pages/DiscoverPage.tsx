import DiscoverResults from '@/components/discover-components/DiscoverResults';
import FilterPanel from '@/components/discover-components/FilterPanel';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { Settings2Icon } from 'lucide-react';
import { useState, useCallback } from 'react';
import Footer from '@/components/layout/Footer';
import FilterCategories from '@/components/home/FilterCategories';

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
      <div className="xl:container mx-auto xl:px-8 lg:mt-8 w-full flex flex-col md:flex-row relative bg-white">
        {/* Filter panel */}
        <FilterPanel isOpen={isFilterPanelOpen} handleToggle={handleToggle} />

        {/* Main content area with responsive layout */}
        <div
          className={`${
            isFilterPanelOpen ? 'md:w-3/4 md:ml-8 hidden xl:block' : 'w-full'
          } transition-all duration-200 ease-in-out w-full md:ml-0 mb-8 p-4 pt-0`}
        >
          <div className="sticky top-0 z-10 bg-white pt-4">
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
              <FilterCategories />
            </div>
          </div>

          {/* Discovery results with responsive layout */}
          <DiscoverResults isOpen={isFilterPanelOpen} />
        </div>
      </div>
      <Footer className={`${isFilterPanelOpen ? 'hidden xl:block' : ''}`} />
    </div>
  );
}
