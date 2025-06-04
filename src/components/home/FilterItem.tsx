import { selectActiveFilter } from '@/features/listing/listingSlice';
import { FilterParameter } from '@/types';
import { useSelector } from 'react-redux';

interface FilterItemProps {
  param: FilterParameter;
  handleFilterChange: (name: string, value: string) => void;
}

// First, create a component for each filter item
const FilterItem = ({ param, handleFilterChange }: FilterItemProps) => {
  // Call useSelector here at the top level of a component
  const currentValue = useSelector(selectActiveFilter(param.name));

  return (
    <div className="flex flex-col min-w-[140px] md:min-w-0 md:flex-1">
      <label className="text-[#E6E6E6] font-medium text-xs md:text-sm whitespace-nowrap">
        {param.label}
      </label>
      <select
        name={param.name}
        value={currentValue}
        onChange={(e) => handleFilterChange(param.name, e.target.value)}
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
  );
};

export default FilterItem;
