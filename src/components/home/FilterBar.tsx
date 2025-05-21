import React from 'react';
import type { FilterParameter } from '@/types';

interface FilterBarProps {
  parameters: FilterParameter[];
  filters: Record<string, string>;
  onFilterChange: (name: string, value: string) => void;
  onSearch: () => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  parameters,
  filters,
  onFilterChange,
  onSearch,
  className = '',
}) => {
  return (
    <div className={`bg-[#8b2b89] w-full py-4 px-3 md:px-8 ${className}`}>
      {/* Mobile View: Collapsible Filter */}
      <div className="md:hidden mb-2 flex justify-between items-center text-white">
        <span className="font-medium">Filters</span>
      </div>

      <div className="flex flex-col md:flex-row container mx-auto justify-center md:justify-between gap-3 md:gap-4">
        {/* Mobile Scrollable Container */}
        <div className="flex md:flex-wrap overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-3">
          {parameters.map((param, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[140px] md:min-w-0 md:flex-1"
            >
              <label className="text-[#E6E6E6] font-medium text-xs md:text-sm whitespace-nowrap">
                {param.label}
              </label>
              <select
                name={param.name}
                value={filters[param.name]}
                onChange={(e) => onFilterChange(param.name, e.target.value)}
                className="w-full md:w-[150px] lg:w-[200px] h-[36px] bg-white text-black border border-gray-300 rounded-md mt-1 text-sm"
              >
                <option value="">Select</option>
                {param.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="bg-black text-white h-[36px] px-4 py-2 rounded-md text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
