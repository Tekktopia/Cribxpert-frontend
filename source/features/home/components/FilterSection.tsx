import React from 'react';
import FilterBar from './FilterBar';
import FilterCategories from './FilterCategories';

const FilterSection: React.FC = () => {
  return (
    <div className="sticky top-0 z-30">
      <FilterBar />
      <FilterCategories />
    </div>
  );
};

export default FilterSection;
