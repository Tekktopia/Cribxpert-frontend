import DiscoverResults from '@/components/discover-components/DiscoverResults';
import FilterPanel from '@/components/discover-components/FilterPanel';
import Header from '@/components/layout/Header';
import { useState } from 'react';

export default function DiscoverPage() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  return (
    <div>
      <Header />
      <div className="w-full flex">
        <FilterPanel
          isOpen={isFilterPanelOpen}
          setIsOpen={setIsFilterPanelOpen}
        />
        <div>
          <div>Categories Filters</div>
          <DiscoverResults
            isOpen={isFilterPanelOpen}
            setIsOpen={setIsFilterPanelOpen}
          />
        </div>
      </div>
    </div>
  );
}
