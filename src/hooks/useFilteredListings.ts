import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveFilters, setCurrentListings } from '@/features/listing';
import { useGetListingsQuery } from '@/features/listing';

// Helper function to clean state/province names
const formatStateName = (stateName: string): string => {
  if (!stateName) return '';
  
  // Remove common suffixes with case insensitivity
  const cleanedName = stateName
    .replace(/\s+(state|province|district|region)$/i, '')
    .replace(/\s+(autonomous region|special administrative region|sar)$/i, '')
    .trim();
    
  return cleanedName;
};

export function useFilteredListings() {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);

  // State to track if filters have changed
  const [filterChanged, setFilterChanged] = useState(false);
  // State to hold the formatted API filters
  const [apiFilters, setApiFilters] = useState({});

  // Convert Redux filters to API format whenever activeFilters change
  useEffect(() => {
    // console.log('Active filters changed:', activeFilters);

    // Create formatted filters regardless of whether any are active
    const formattedFilters = {
      // Map location filter to state parameter for API
      // Handle all location filters properly
    ...(activeFilters.country && { country: activeFilters.country }),
    // Format state name to remove "State", "Province", etc.
      ...(activeFilters.stateProvince && { 
        state: formatStateName(activeFilters.stateProvince) 
      }),
    ...(activeFilters.city && { city: activeFilters.city }),

      // Map property type filter
      ...(activeFilters.propertyType && {
        propertyType: activeFilters.propertyType,
      }),

      // Convert bedrooms to number if present
      ...(activeFilters.bedrooms &&
        activeFilters.bedrooms !== '' && {
          bedroomNo:
            activeFilters.bedrooms === '3plus'
              ? 3 // Handle the "3+" case
              : parseInt(activeFilters.bedrooms, 10),
        }),

      // Add amenities if present
      ...(activeFilters.amenities && { amenities: activeFilters.amenities }),

      // Add price range if present
      ...(activeFilters.priceRange &&
        (() => {
          const [min, max] = activeFilters.priceRange.split('-').map(Number);
          return {
            priceMin: min,
            priceMax: max || undefined, // Handle open-ended ranges
          };
        })()),
    };

    // Always update filters and trigger change
    setApiFilters(formattedFilters);
    setFilterChanged(true);
    // console.log('API filters set:', formattedFilters);
  }, [activeFilters]);

  // Use RTK Query hook with skip option to control when it fires
  const {
    data: filteredListings,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetListingsQuery(apiFilters, {
    // Only run the query when filters have changed
    skip: !filterChanged,
    // Ensure we refetch when query parameters change
    refetchOnMountOrArgChange: true,
  });

  // Update Redux store when we get results
  useEffect(() => {
    if (filterChanged && !isLoading && !isFetching) {
      // console.log('Received API response:', filteredListings);

      if (filteredListings) {
        // Handle different response formats - either direct array or nested in listings property
        const listings = Array.isArray(filteredListings)
          ? filteredListings
          : filteredListings.listings || [];

        // console.log('Updating currentListings with:', listings);
        dispatch(setCurrentListings(listings));
      }

      setFilterChanged(false); // Reset for next filter change
    }
  }, [filteredListings, isLoading, isFetching, filterChanged, dispatch]);

  return {
    isLoading: isLoading || isFetching,
    error,
    refetch,
    currentFilters: apiFilters,
  };
}
