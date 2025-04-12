import DiscoverResults from '@/components/discover-components/DiscoverResults';
import FilterPanel from '@/components/discover-components/FilterPanel';
import Header from '@/components/layout/Header';
import { Filter } from '@/utils/data';
import { Settings2Icon } from 'lucide-react';
import { useState } from 'react';

export default function DiscoverPage() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  const handleToggle = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };
  return (
    <div className='transition-all duration-1000 ease-in-out'>
      <Header />
      <div className="w-full flex md:p-8 p-2 pt-8 relative overflow-y-hidden">
        <FilterPanel isOpen={isFilterPanelOpen} handleToggle={handleToggle} />
        <div className={`${isFilterPanelOpen? "md:w-3/4 md:ml-8": "w-full"} w-full mb-8`}>
          <div className="flex gap-4">
            {!isFilterPanelOpen && (
              <button className="flex items-center" onClick={handleToggle}>
                <Settings2Icon />
                Filters
              </button>
            )}

            {/* Filters Section */}
            <div className="w-full overflow-x-auto scrollbar-hide max-w-[1280px]">
              <div className="flex items-center gap-6 min-w-max">
                {Filter.map((filter, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={filter.image}
                      alt={filter.name}
                      className="w-[24px] h-[24px] object-contain"
                    />
                    <p className="text-[14px] font-[400] text-[#999999]">
                      {filter.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DiscoverResults isOpen={isFilterPanelOpen} />
        </div>
      </div>
    </div>
  );
}
