import { ArrowLeft, Settings2Icon, XIcon, Star } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
  resetFilters,
  selectAllListings,
} from '@/features/properties';
import { useGetAmenitiesQuery } from '@/features/amenities';
import { calculatePriceRanges } from '@/utils/filterUtils';
import { PropertyListing } from '@/types';

type FilterPanelProps = {
  isOpen: boolean;
  handleToggle: () => void;
};

export default function FilterPanel({
  isOpen,
  handleToggle,
}: FilterPanelProps) {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const allListings = useSelector(selectAllListings);

  // Fetch amenities from API
  const { data: amenitiesData, isLoading: amenitiesLoading } =
    useGetAmenitiesQuery();

  // Local state to track temporary filter changes before applying
  const [tempFilters, setTempFilters] = useState({
    bookingAvailability: '',
    amenities: [] as string[],
    priceMin: '',
    priceMax: '',
    priceRange: '',
    rating: '',
    location: 'Lagos, Nigeria',
  });

  // Calculate dynamic price ranges based on actual listings
  const priceRanges = useMemo(() => {
    return calculatePriceRanges(allListings || []);
  }, [allListings]);

  // Get unique locations from listings
  const uniqueLocations = useMemo(() => {
    if (!allListings || allListings.length === 0) return ['Lagos, Nigeria'];

    const locations = new Set<string>();
    (allListings as PropertyListing[]).forEach((listing: PropertyListing) => {
      const location = `${listing.city}, ${listing.state}, ${listing.country}`;
      locations.add(location);
    });
    return Array.from(locations).sort();
  }, [allListings]);

  // Sync with active filters when panel opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters({
        bookingAvailability: activeFilters.bookingAvailability || '',
        // Handle the case where amenities might be a string or array
        amenities: Array.isArray(activeFilters.amenities)
          ? activeFilters.amenities
          : activeFilters.amenities
            ? [activeFilters.amenities as string]
            : [],
        priceMin: activeFilters.priceMin || '',
        priceMax: activeFilters.priceMax || '',
        priceRange: activeFilters.priceRange || '',
        rating: activeFilters.rating || '',
        location:
          activeFilters.city +
            ',' +
            activeFilters.stateProvince +
            ',' +
            activeFilters.country || 'Lagos, Nigeria',
      });
    }
  }, [isOpen, activeFilters]);

  // Handle checkbox changes for amenities
  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter((a) => a !== amenityId),
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input field changes
  const handleInputChange = (name: string, value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply all filters
  const handleApplyFilters = () => {
    // Dispatch each filter update
    Object.entries(tempFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        dispatch(updateFilter({ name: key, value }));
      }
    });
    handleToggle(); // Close the filter panel
  };

  // Reset all filters
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setTempFilters({
      bookingAvailability: '',
      amenities: [],
      priceMin: '',
      priceMax: '',
      priceRange: '',
      rating: '',
      location: 'Lagos, Nigeria',
    });
  };

  // Memoize filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(
    () => ({
      bookingOptions: [
        'Available Now',
        'Available This Weekend',
        'Available Next Week',
        'Available Next Month',
        'All Availability',
      ],
      amenitiesList: amenitiesData || [],
      priceRanges: priceRanges,
      locations: uniqueLocations,
    }),
    [amenitiesData, priceRanges, uniqueLocations]
  );

  // Memoize filter section content to prevent unnecessary re-renders
  const filterParams = useMemo(
    () => [
      {
        title: 'Booking Availability',
        content: (
          <div className="space-y-1 mt-2 bg-white p-2">
            {filterOptions.bookingOptions.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="booking"
                  className="accent-[#1D5C5C]"
                  checked={tempFilters.bookingAvailability === option}
                  onChange={() =>
                    handleRadioChange('bookingAvailability', option)
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ),
      },
      {
        title: 'Amenities',
        content: (
          <div className="space-y-1 mt-2 bg-white p-2">
            {amenitiesLoading ? (
              <div className="text-sm text-gray-500">Loading amenities...</div>
            ) : (
              filterOptions.amenitiesList.map((amenity) => (
                <label
                  key={amenity._id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    className="accent-[#1D5C5C]"
                    checked={tempFilters.amenities.includes(amenity._id)}
                    onChange={(e) =>
                      handleAmenityChange(amenity._id, e.target.checked)
                    }
                  />
                  <span className="flex items-center gap-2">
                    {amenity.icon && (
                      <img
                        src={amenity.icon.fileUrl}
                        alt={amenity.name}
                        className="w-4 h-4"
                      />
                    )}
                    <span>{amenity.name}</span>
                  </span>
                </label>
              ))
            )}
          </div>
        ),
      },
      {
        title: 'Price Range',
        content: (
          <div className="space-y-2 mt-2 bg-white p-2">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min price"
                className="w-1/2 border rounded p-1 text-sm"
                value={tempFilters.priceMin}
                onChange={(e) => handleInputChange('priceMin', e.target.value)}
              />
              <input
                type="number"
                placeholder="Max price"
                className="w-1/2 border rounded p-1 text-sm"
                value={tempFilters.priceMax}
                onChange={(e) => handleInputChange('priceMax', e.target.value)}
              />
            </div>
            {filterOptions.priceRanges.map((range, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="price"
                  className="accent-[#1D5C5C]"
                  checked={tempFilters.priceRange === range.value}
                  onChange={() => {
                    handleRadioChange('priceRange', range.value);
                    if (range.min)
                      handleInputChange('priceMin', range.min.toString());
                    if (range.max)
                      handleInputChange('priceMax', range.max.toString());
                  }}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        ),
      },
      {
        title: 'Rating',
        content: (
          <div className="space-y-2 mt-2 bg-white p-2">
            {[5, 4, 3, 2, 1].map((stars, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="rating"
                  className="accent-[#1D5C5C]"
                  checked={tempFilters.rating === stars.toString()}
                  onChange={() => handleRadioChange('rating', stars.toString())}
                />
                <span className="flex items-center">
                  <span className="flex">
                    {[...Array(stars)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 text-[#1D5C5C] fill-current"
                      />
                    ))}
                    {[...Array(5 - stars)].map((_, index) => (
                      <Star
                        key={stars + index}
                        className="w-4 h-4 text-gray-300"
                      />
                    ))}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(200)</span>
                </span>
              </label>
            ))}
          </div>
        ),
      },
      {
        title: 'Location',
        content: (
          <div className="mt-2 bg-white p-2">
            <select
              value={tempFilters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full border rounded p-1 text-sm"
            >
              {filterOptions.locations.map((location, idx) => (
                <option key={idx} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        ),
      },
    ],
    [tempFilters, filterOptions]
  );

  // Memoize the panel classes for better performance
  const panelClasses = useMemo(() => {
    const baseClasses =
      'h-fit p-4 pb-8 xl:pb-0 z-30 top-0 bg-white border-r-[1px] md:pr-2';
    const transformClasses = isOpen
      ? 'translate-x-0 w-full lg:w-1/4 lg:max-w-[276px]'
      : '-translate-x-full w-0';
    return `${transformClasses} ${baseClasses} transition-transform duration-150 ease-out absolute lg:sticky`;
  }, [isOpen]);

  return (
    <div className={panelClasses}>
      {isOpen && (
        <div className="relative">
          <div className="sticky top-0 z-10 bg-white pt-4">
            <div className="flex pb-4 justify-between">
              <span className="flex items-center gap-2">
                <Settings2Icon size={18} />
                <span className="font-medium">Filters</span>
              </span>

              <button
                className="flex hover:cursor-pointer"
                onClick={handleToggle}
              >
                <ArrowLeft className="-mr-1 hidden lg:block" />
                <XIcon className="-mr-1 lg:hidden" />
              </button>
            </div>
          </div>

          <div className="filters overflow-y-scroll scrollbar-hide h-fit max-h-screen xl:pb-0">
            <div className="space-y-4 mt-4">
              {filterParams.map(({ title, content }, i) => (
                <details
                  key={i}
                  open
                  className="rounded-md border pt-2 bg-[#e6eff199]"
                >
                  <summary className="flex justify-between items-center cursor-pointer font-medium">
                    <span className="px-2">{title}</span>
                    <svg
                      className="w-4 h-4 transform transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  {content}
                </details>
              ))}
            </div>
          </div>

          {/* Filter Counts */}
          <div className="mt-4 text-sm text-gray-500">
            {Object.entries(tempFilters).filter(([, value]) =>
              Array.isArray(value) ? value.length > 0 : value !== ''
            ).length > 0 ? (
              <div className="text-teal-600 font-medium">
                {
                  Object.entries(tempFilters).filter(([, value]) =>
                    Array.isArray(value) ? value.length > 0 : value !== ''
                  ).length
                }{' '}
                filters selected
              </div>
            ) : (
              <div>No filters selected</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="border px-4 py-2 rounded hover:bg-gray-100"
              onClick={handleResetFilters}
            >
              Reset
            </button>
            <button
              className="bg-[#1D5C5C] text-white px-4 py-2 rounded hover:bg-[#174747]"
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
