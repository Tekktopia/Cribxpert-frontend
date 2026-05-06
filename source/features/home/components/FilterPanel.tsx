import { ArrowLeft, Settings2Icon, XIcon } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
  resetFilters,
} from '@/features/properties';
import { useGetAmenitiesQuery } from '@/features/amenities';
import { Country, State } from 'country-state-city';

type FilterPanelProps = {
  isOpen: boolean;
  handleToggle: () => void;
};

export default function FilterPanel({ isOpen, handleToggle }: FilterPanelProps) {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const { data: amenitiesData, isLoading: amenitiesLoading } = useGetAmenitiesQuery();

  const [tempFilters, setTempFilters] = useState({
    country: '',
    stateProvince: '',
    city: '',
    priceRange: '',
    priceMin: '',
    priceMax: '',
    amenities: [] as string[],
    rating: '',
    bookingAvailability: '',
  });

  // Derived options from country-state-city
  const countryOptions = useMemo(() => Country.getAllCountries().map((c) => ({
    value: c.name,
    label: c.name,
    isoCode: c.isoCode,
  })), []);

  const stateOptions = useMemo(() => {
    if (!tempFilters.country) return [];
    const countryObj = Country.getAllCountries().find((c) => c.name === tempFilters.country);
    if (!countryObj) return [];
    return State.getStatesOfCountry(countryObj.isoCode).map((s) => ({
      value: s.name,
      label: s.name,
      isoCode: s.isoCode,
    }));
  }, [tempFilters.country]);


  const priceRanges = [
    { value: '0-50000', label: '₦0 - ₦50,000' },
    { value: '50001-100000', label: '₦50,001 - ₦100,000' },
    { value: '100001-200000', label: '₦100,001 - ₦200,000' },
    { value: '200001-500000', label: '₦200,001 - ₦500,000' },
    { value: '500001-plus', label: '₦500,000+' },
  ];

  // Sync temp filters when panel opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters({
        country: activeFilters.country || '',
        stateProvince: activeFilters.stateProvince || '',
        city: activeFilters.city || '',
        priceRange: activeFilters.priceRange || '',
        priceMin: activeFilters.priceMin || '',
        priceMax: activeFilters.priceMax || '',
        amenities: Array.isArray(activeFilters.amenities)
          ? activeFilters.amenities
          : activeFilters.amenities ? [activeFilters.amenities as string] : [],
        rating: activeFilters.rating || '',
        bookingAvailability: activeFilters.bookingAvailability || '',
      });
    }
  }, [isOpen, activeFilters]);

  const handleTempChange = (name: string, value: string | string[]) => {
    setTempFilters((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset dependent fields
      if (name === 'country') {
        updated.stateProvince = '';
        updated.city = '';
      } else if (name === 'stateProvince') {
        updated.city = '';
      }
      return updated;
    });
  };

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter((a) => a !== amenityId),
    }));
  };

  const handleApplyFilters = () => {
    dispatch(updateFilter({ name: 'country', value: tempFilters.country }));
    dispatch(updateFilter({ name: 'stateProvince', value: tempFilters.stateProvince }));
    dispatch(updateFilter({ name: 'city', value: tempFilters.city }));
    dispatch(updateFilter({ name: 'priceRange', value: tempFilters.priceRange }));
    dispatch(updateFilter({ name: 'priceMin', value: tempFilters.priceMin }));
    dispatch(updateFilter({ name: 'priceMax', value: tempFilters.priceMax }));
    dispatch(updateFilter({ name: 'amenities', value: tempFilters.amenities }));
    dispatch(updateFilter({ name: 'rating', value: tempFilters.rating }));
    dispatch(updateFilter({ name: 'bookingAvailability', value: tempFilters.bookingAvailability }));
    // panel stays open
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setTempFilters({
      country: '',
      stateProvince: '',
      city: '',
      priceRange: '',
      priceMin: '',
      priceMax: '',
      amenities: [],
      rating: '',
      bookingAvailability: '',
    });
  };

  const panelClasses = useMemo(() => {
    const base = 'h-fit p-8 pb-12 xl:pb-0 z-30 top-0 bg-white border-r border-neutral-100 pr-10';
    const transform = isOpen
      ? 'translate-x-0 w-full lg:w-1/4 lg:max-w-[320px]'
      : '-translate-x-full w-0';
    return `${transform} ${base} transition-all duration-300 ease-out absolute lg:sticky`;
  }, [isOpen]);

  return (
    <div className={panelClasses}>
      {isOpen && (
        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white pt-2">
            <div className="flex pb-8 justify-between items-center border-b border-neutral-100">
              <span className="flex items-center gap-3">
                <Settings2Icon size={14} className="text-primary" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-900">Refine Search</span>
              </span>
              <button 
                className="flex hover:cursor-pointer p-2.5 hover:bg-neutral-50 rounded-full transition-all group" 
                onClick={handleToggle}
              >
                <ArrowLeft size={16} className="hidden lg:block text-neutral-400 group-hover:text-primary transition-colors" />
                <XIcon size={16} className="lg:hidden text-neutral-400" />
              </button>
            </div>
          </div>

          <div className="filters overflow-y-scroll scrollbar-hide h-fit max-h-[calc(100vh-200px)] xl:pb-12 pt-10">
            <div className="space-y-12">

              {/* Location */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 mb-6">Location</h3>
                <div className="space-y-5">
                  {/* Country */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5 ml-1">Country</label>
                    <select
                      value={tempFilters.country}
                      onChange={(e) => handleTempChange('country', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3.5 text-[12px] text-neutral-900 focus:ring-1 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="">All Countries</option>
                      {countryOptions.map((c) => (
                        <option key={c.isoCode} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* State/Province */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5 ml-1">State / Province</label>
                    <select
                      value={tempFilters.stateProvince}
                      onChange={(e) => handleTempChange('stateProvince', e.target.value)}
                      disabled={!tempFilters.country}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3.5 text-[12px] text-neutral-900 focus:ring-1 focus:ring-primary/20 transition-all outline-none appearance-none disabled:opacity-50 cursor-pointer"
                    >
                      <option value="">
                        {tempFilters.country ? 'All States' : 'Select country'}
                      </option>
                      {stateOptions.map((s) => (
                        <option key={s.isoCode} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-6 pt-10 border-t border-neutral-50">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Price Range</h3>
                <div className="flex gap-3">
                  <div className="relative w-1/2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400">₦</span>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-xl pl-8 pr-4 py-3.5 text-[12px] outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                      value={tempFilters.priceMin}
                      onChange={(e) => handleTempChange('priceMin', e.target.value)}
                    />
                  </div>
                  <div className="relative w-1/2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400">₦</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-xl pl-8 pr-4 py-3.5 text-[12px] outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                      value={tempFilters.priceMax}
                      onChange={(e) => handleTempChange('priceMax', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {priceRanges.map((range, idx) => (
                    <label key={idx} className="flex items-center space-x-3.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        className="accent-primary w-4 h-4"
                        checked={tempFilters.priceRange === range.value}
                        onChange={() => handleTempChange('priceRange', range.value)}
                      />
                      <span className="text-[12px] text-neutral-500 group-hover:text-neutral-900 transition-colors">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-6 pt-10 border-t border-neutral-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Amenities</h3>
                  {tempFilters.amenities.length > 0 && (
                    <button 
                      onClick={() => handleTempChange('amenities', [])}
                      className="text-[8px] uppercase tracking-widest text-primary font-bold hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 max-h-72 overflow-y-auto scrollbar-hide pr-2">
                  {amenitiesLoading ? (
                    <div className="text-[10px] text-neutral-400 italic">Loading features...</div>
                  ) : (
                    (amenitiesData || []).map((amenity) => (
                      <label key={amenity._id} className="flex items-center space-x-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="accent-primary w-4.5 h-4.5 rounded border-neutral-200"
                          checked={tempFilters.amenities.includes(amenity._id)}
                          onChange={(e) => handleAmenityChange(amenity._id, e.target.checked)}
                        />
                        <span className="flex items-center gap-3.5 text-[12px] text-neutral-500 group-hover:text-neutral-900 transition-all">
                          {amenity.icon && (
                            <img 
                              src={amenity.icon.fileUrl} 
                              alt={amenity.name} 
                              className={`w-4 h-4 transition-opacity duration-300 ${
                                tempFilters.amenities.includes(amenity._id) ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'
                              }`} 
                            />
                          )}
                          <span className={tempFilters.amenities.includes(amenity._id) ? 'font-medium text-neutral-900' : ''}>
                            {amenity.name}
                          </span>
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-neutral-100 bg-white">
            <button
              className="w-full border border-luxury-green/20 text-luxury-green py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-green hover:text-white transition-all active:scale-[0.98] shadow-sm"
              onClick={handleApplyFilters}
            >
              Apply Selection
            </button>
            <button
              className="w-full border border-neutral-100 text-neutral-400 py-4 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-50 transition-colors"
              onClick={handleResetFilters}
            >
              Reset All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
