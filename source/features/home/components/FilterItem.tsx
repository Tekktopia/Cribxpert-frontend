import { selectActiveFilter } from '@/features/properties/listingSlice';
import { FilterParameter } from '@/types';
import { useSelector } from 'react-redux';

export interface FilterItemProps {
  param: FilterParameter;
  value?: string;
  handleFilterChange: (name: string, value: string) => void;
}

// First, create a component for each filter item
const FilterItem = ({ param, handleFilterChange }: FilterItemProps) => {
  // Call useSelector here at the top level of a component
  const currentValue = useSelector(selectActiveFilter(param.name));

  return (
    <div className="flex flex-col min-w-[180px] group">
      <label className="text-white/60 font-bold text-[9px] uppercase tracking-[0.2em] mb-2 group-focus-within:text-white transition-colors">
        {param.label}
      </label>
      <div className="relative">
        <select
          name={param.name}
          value={currentValue}
          onChange={(e) => handleFilterChange(param.name, e.target.value)}
          className="w-full bg-white/10 text-white border border-white/20 rounded-full px-5 py-3 text-[12px] tracking-wide focus:ring-2 focus:ring-white/20 transition-all outline-none cursor-pointer appearance-none hover:bg-white/20"
        >
          <option value="" className="text-neutral-900">Select {param.label}</option>
          {param.options.map((option, idx) => (
            <option key={idx} value={option.value} className="text-neutral-900">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
