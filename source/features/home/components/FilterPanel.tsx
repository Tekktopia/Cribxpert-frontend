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

  const handleTempChange = (name: string, value: string) => {
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
    const base = 'h-fit p-4 pb-8 xl:pb-0 z-30 top-0 bg-white border-r-[1px] md:pr-2';
    const transform = isOpen
      ? 'translate-x-0 w-full lg:w-1/4 lg:max-w-[276px]'
      : '-translate-x-full w-0';
    return `${transform} ${base} transition-transform duration-150 ease-out absolute lg:sticky`;
  }, [isOpen]);

  return (
    <div className={panelClasses}>
      {isOpen && (
        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white pt-4">
            <div className="flex pb-6 justify-between items-center border-b border-neutral-100">
              <span className="flex items-center gap-2">
                <Settings2Icon size={14} className="text-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-900">Filters</span>
              </span>
              <button className="flex hover:cursor-pointer p-2 hover:bg-neutral-50 rounded-full transition-colors" onClick={handleToggle}>
                <ArrowLeft size={16} className="hidden lg:block text-neutral-400" />
                <XIcon size={16} className="lg:hidden text-neutral-400" />
              </button>
            </div>
          </div>

          <div className="filters overflow-y-scroll scrollbar-hide h-fit max-h-[calc(100vh-200px)] xl:pb-0 pt-6">
            <div className="space-y-8">

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">Location</h3>
                <div className="space-y-3">
                  {/* Country */}
                  <div>
                    <label className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 ml-1">Country</label>
                    <select
                      value={tempFilters.country}
                      onChange={(e) => handleTempChange('country', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-[12px] focus:ring-1 focus:ring-primary/20 transition-all outline-none appearance-none"
                    >
                      <option value="">All Countries</option>
                      {countryOptions.map((c) => (
                        <option key={c.isoCode} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* State/Province */}
                  <div>
                    <label className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 ml-1">State / Province</label>
                    <select
                      value={tempFilters.stateProvince}
                      onChange={(e) => handleTempChange('stateProvince', e.target.value)}
                      disabled={!tempFilters.country}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-[12px] focus:ring-1 focus:ring-primary/20 transition-all outline-none appearance-none disabled:opacity-50"
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
              <div className="space-y-4 pt-6 border-t border-neutral-50">
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-[12px] outline-none"
                    value={tempFilters.priceMin}
                    onChange={(e) => handleTempChange('priceMin', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-[12px] outline-none"
                    value={tempFilters.priceMax}
                    onChange={(e) => handleTempChange('priceMax', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {priceRanges.map((range, idx) => (
                    <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        className="accent-primary w-4 h-4"
                        checked={tempFilters.priceRange === range.value}
                        onChange={() => handleTempChange('priceRange', range.value)}
                      />
                      <span className="text-[12px] text-neutral-600 group-hover:text-neutral-900 transition-colors">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4 pt-6 border-t border-neutral-50">
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400">Amenities</h3>
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto scrollbar-hide">
                  {amenitiesLoading ? (
                    <div className="text-[10px] text-neutral-400">Loading...</div>
                  ) : (
                    (amenitiesData || []).map((amenity) => (
                      <label key={amenity._id} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="accent-primary w-4 h-4 rounded"
                          checked={tempFilters.amenities.includes(amenity._id)}
                          onChange={(e) => handleAmenityChange(amenity._id, e.target.checked)}
                        />
                        <span className="flex items-center gap-3 text-[12px] text-neutral-600 group-hover:text-neutral-900 transition-colors">
                          {amenity.icon && (
                            <img src={amenity.icon.fileUrl} alt={amenity.name} className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                          )}
                          {amenity.name}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-10 pt-6 border-t border-neutral-100">
            <button
              className="w-full bg-primary text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
            <button
              className="w-full border border-neutral-100 text-neutral-400 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-50 transition-colors"
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