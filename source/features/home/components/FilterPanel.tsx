import { ArrowLeft, Settings2Icon, XIcon, Star } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
  resetFilters,
} from '@/features/properties';
import { useGetAmenitiesQuery } from '@/features/amenities';
import { Country, State, City } from 'country-state-city';

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

  const cityOptions = useMemo(() => {
    if (!tempFilters.country || !tempFilters.stateProvince) return [];
    const countryObj = Country.getAllCountries().find((c) => c.name === tempFilters.country);
    const stateObj = countryObj
      ? State.getStatesOfCountry(countryObj.isoCode).find((s) => s.name === tempFilters.stateProvince)
      : null;
    if (!countryObj || !stateObj) return [];
    return City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode).map((c) => ({
      value: c.name,
      label: c.name,
    }));
  }, [tempFilters.country, tempFilters.stateProvince]);

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

  const selectClass = "w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D5C5C]";

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
            <div className="flex pb-4 justify-between">
              <span className="flex items-center gap-2">
                <Settings2Icon size={18} />
                <span className="font-medium">Filters</span>
              </span>
              <button className="flex hover:cursor-pointer" onClick={handleToggle}>
                <ArrowLeft className="-mr-1 hidden lg:block" />
                <XIcon className="-mr-1 lg:hidden" />
              </button>
            </div>
          </div>

          <div className="filters overflow-y-scroll scrollbar-hide h-fit max-h-screen xl:pb-0">
            <div className="space-y-4 mt-4">

              {/* Location */}
              <details open className="rounded-md border pt-2 bg-[#e6eff199]">
                <summary className="flex justify-between items-center cursor-pointer font-medium px-2 pb-2">
                  Location
                </summary>
                <div className="space-y-3 p-2 bg-white">
                  {/* Country */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                    <select
                      value={tempFilters.country}
                      onChange={(e) => handleTempChange('country', e.target.value)}
                      className={selectClass}
                    >
                      <option value="">All Countries</option>
                      {countryOptions.map((c) => (
                        <option key={c.isoCode} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* State/Province */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">State / Province</label>
                    <select
                      value={tempFilters.stateProvince}
                      onChange={(e) => handleTempChange('stateProvince', e.target.value)}
                      disabled={!tempFilters.country}
                      className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <option value="">
                        {tempFilters.country ? 'All States' : 'Select a country first'}
                      </option>
                      {stateOptions.map((s) => (
                        <option key={s.isoCode} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                    <select
                      value={tempFilters.city}
                      onChange={(e) => handleTempChange('city', e.target.value)}
                      disabled={!tempFilters.stateProvince}
                      className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <option value="">
                        {tempFilters.stateProvince ? 'All Cities' : 'Select a state first'}
                      </option>
                      {cityOptions.map((c, i) => (
                        <option key={i} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </details>

              {/* Price Range */}
              <details open className="rounded-md border pt-2 bg-[#e6eff199]">
                <summary className="flex justify-between items-center cursor-pointer font-medium px-2 pb-2">
                  Price Range
                </summary>
                <div className="space-y-2 p-2 bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 border rounded p-1 text-sm"
                      value={tempFilters.priceMin}
                      onChange={(e) => handleTempChange('priceMin', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 border rounded p-1 text-sm"
                      value={tempFilters.priceMax}
                      onChange={(e) => handleTempChange('priceMax', e.target.value)}
                    />
                  </div>
                  {priceRanges.map((range, idx) => (
                    <label key={idx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="price"
                        className="accent-[#1D5C5C]"
                        checked={tempFilters.priceRange === range.value}
                        onChange={() => handleTempChange('priceRange', range.value)}
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </details>

              {/* Amenities */}
              <details open className="rounded-md border pt-2 bg-[#e6eff199]">
                <summary className="flex justify-between items-center cursor-pointer font-medium px-2 pb-2">
                  Amenities
                </summary>
                <div className="space-y-1 p-2 bg-white">
                  {amenitiesLoading ? (
                    <div className="text-sm text-gray-500">Loading amenities...</div>
                  ) : (
                    (amenitiesData || []).map((amenity) => (
                      <label key={amenity._id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="accent-[#1D5C5C]"
                          checked={tempFilters.amenities.includes(amenity._id)}
                          onChange={(e) => handleAmenityChange(amenity._id, e.target.checked)}
                        />
                        <span className="flex items-center gap-2 text-sm">
                          {amenity.icon && (
                            <img src={amenity.icon.fileUrl} alt={amenity.name} className="w-4 h-4" />
                          )}
                          {amenity.name}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </details>

              {/* Rating */}
              <details open className="rounded-md border pt-2 bg-[#e6eff199]">
                <summary className="flex justify-between items-center cursor-pointer font-medium px-2 pb-2">
                  Rating
                </summary>
                <div className="space-y-2 p-2 bg-white">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <label key={stars} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="rating"
                        className="accent-[#1D5C5C]"
                        checked={tempFilters.rating === stars.toString()}
                        onChange={() => handleTempChange('rating', stars.toString())}
                      />
                      <span className="flex items-center">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#1D5C5C] fill-current" />
                        ))}
                        {[...Array(5 - stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </span>
                    </label>
                  ))}
                </div>
              </details>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="border px-4 py-2 rounded hover:bg-gray-100 text-sm"
              onClick={handleResetFilters}
            >
              Reset
            </button>
            <button
              className="bg-[#1D5C5C] text-white px-4 py-2 rounded hover:bg-[#174747] text-sm transition-colors"
              onClick={handleApplyFilters}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}