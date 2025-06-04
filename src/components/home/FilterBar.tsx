import React, { useEffect, useState } from 'react';
import type { FilterParameter } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  setCurrentListings,
  updateFilter,
} from '@/features/listing/listingSlice';
import FilterItem from '@/components/home/FilterItem';
import { useGeolocation } from '@/hooks/useGeolocation';
import { getNearbyLocations, nigerianLocations } from '@/utils/locationUtils';
import { useGetListingsQuery } from '@/features/listing';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);

  // State to track if we should trigger a search
  const [searchTrigger, setSearchTrigger] = useState(0);
  // Current filter parameters for the API call
  const [apiFilters, setApiFilters] = useState({});

  // Use RTK Query's hook with skip option to control when it fires
  const {
    data: listings,
    isLoading,
    isFetching,
  } = useGetListingsQuery(apiFilters, {
    skip: searchTrigger === 0, // Skip the initial query
    refetchOnMountOrArgChange: true,
  });

  // Update Redux store when new listings are fetched
  useEffect(() => {
    // Only update if we've triggered a search and have results
    if (searchTrigger > 0) {
      // Update listings when data is available
      if (listings && !isLoading && !isFetching) {
        dispatch(setCurrentListings(listings));
      }
    }
  }, [listings, isLoading, isFetching, dispatch, searchTrigger]);

  // Handler for filter changes using Redux
  const handleFilterChange = (name: string, value: string) => {
    dispatch(updateFilter({ name, value }));
  };

  // Get user's geolocation
  const userLocation = useGeolocation();

  // State for filter parameters (with initial default values)
  const [filterParameters, setFilterParameters] = useState<FilterParameter[]>([
    {
      name: 'location',
      label: 'Location',
      options: [
        { value: 'lagos', label: 'Lagos' },
        { value: 'abuja', label: 'Abuja' },
        { value: 'portHarcourt', label: 'Port Harcourt' },
      ],
    },
    {
      name: 'propertyType',
      label: 'Property Type',
      options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'villa', label: 'Villa' },
      ],
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: [
        { value: '0-50000', label: '₦0 - ₦50,000' },
        { value: '50000-100000', label: '₦50,000 - ₦100,000' },
        { value: '100000-200000', label: '₦100,000 - ₦200,000' },
      ],
    },
    {
      name: 'bedrooms',
      label: 'Bedrooms',
      options: [
        { value: '1', label: '1 Bedroom' },
        { value: '2', label: '2 Bedrooms' },
        { value: '3plus', label: '3+ Bedrooms' },
      ],
    },
    {
      name: 'amenities',
      label: 'Amenities',
      options: [
        { value: 'wifi', label: 'WiFi' },
        { value: 'pool', label: 'Swimming Pool' },
        { value: 'parking', label: 'Parking' },
      ],
    },
  ]);

  // Update location options based on user's geolocation
  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      // Get locations sorted by proximity to user
      const closestLocations = getNearbyLocations(
        userLocation.latitude,
        userLocation.longitude,
        10 // Get top 10 locations
      );

      // Update filter parameters with closest locations
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'location'
            ? { ...param, options: closestLocations }
            : param
        )
      );
    } else if (!userLocation.loading && userLocation.error) {
      // If geolocation fails, show more default locations
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'location'
            ? {
                ...param,
                options: nigerianLocations
                  .slice(0, 10)
                  .map((loc) => ({ value: loc.value, label: loc.label })),
              }
            : param
        )
      );
    }
  }, [
    userLocation.latitude,
    userLocation.longitude,
    userLocation.loading,
    userLocation.error,
  ]);

  const handleSearch = () => {
    // Convert our UI filters to API filter format
    const apiFilters = {
      // Map location filter value to state parameter expected by the API
      // state: activeFilters.location,

      // Map property type directly
      propertyType: activeFilters.propertyType,

      // Parse bedroom count (handle the "3+" case)
      // ...(activeFilters.bedrooms && {
      //   bedroomNo: activeFilters.bedrooms === '3plus'
      //     ? 3 // API might need a minimum number for "3+"
      //     : parseInt(activeFilters.bedrooms, 10)
      // }),

      // Parse price range to get min and max values
      // ...(activeFilters.priceRange && (() => {
      //   const [min, max] = activeFilters.priceRange.split('-').map(Number);
      //   return {
      //     priceMin: min,
      //     priceMax: max
      //   };
      // })()),

      // Handle amenities (convert comma-separated string to array if needed)
      // ...(activeFilters.amenities && {
      //   amenities: [activeFilters.amenities]
      // })
    };

    // Log the API filters for debugging
    console.log('Searching with API filters:', apiFilters);

    // Update the API filters and increment the search trigger to execute the query
    setApiFilters(apiFilters);
    setSearchTrigger((prev) => prev + 1);
  };

  return (
    <div className={`bg-[#1d5c5c] w-full py-4 px-3 md:px-8 hidden lg:block`}>
      {/* Mobile View: Collapsible Filter */}
      <div className="md:hidden mb-2 flex justify-between items-center text-white">
        <span className="font-medium">Filters</span>
      </div>

      <div className="flex flex-col md:flex-row container mx-auto justify-center md:justify-between gap-3 md:gap-6">
        {/* Mobile Scrollable Container */}
        <div className="flex md:flex-wrap overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-3">
          {filterParameters.map((param, index) => (
            <FilterItem
              key={index}
              param={param}
              handleFilterChange={handleFilterChange}
            />
          ))}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || isFetching}
          className={`bg-black text-white h-[36px] px-4 py-2 rounded-md text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end ${
            isLoading || isFetching ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading || isFetching ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
