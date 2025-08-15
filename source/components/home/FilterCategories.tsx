import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
  useGetListingsQuery,
} from '@/features/listing';
import { useGetPropertyTypesQuery } from '@/features/propertyType';
import { Filter } from '@/utils/data';
import { useFilteredListings } from '@/hooks/useFilteredListings';

const FilterCategories: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);

  // State to track counts for each property type
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  
  // Use the hook to automatically update listings when filters change
  const { isLoading: isFilteringListings, currentFilters } = useFilteredListings();

  // Fetch property types from the API
  const { data: propertyTypes, isLoading, error } = useGetPropertyTypesQuery();
  
  // Create a separate filter object without propertyType
  const filtersWithoutPropertyType = { ...currentFilters };
  if ('propertyType' in filtersWithoutPropertyType) {
    delete filtersWithoutPropertyType.propertyType;
  }
  
  // Fetch all listings matching current filters EXCEPT property type
  const { data: allFilteredListings } = useGetListingsQuery(filtersWithoutPropertyType, {
    skip: isLoading,
  });

  // Calculate counts for each property type based on all filtered listings
  useEffect(() => {
    if (!allFilteredListings || !propertyTypes?.data) return;
    
    // Extract listings array from response
    const listings = Array.isArray(allFilteredListings)
      ? allFilteredListings
      : allFilteredListings.listings || [];
      
    // Calculate total (for "All" category)
    const counts: Record<string, number> = { all: listings.length };
    
    // Count listings for each property type
    propertyTypes.data.forEach((propertyType: { _id: string }) => {
      counts[propertyType._id] = listings.filter(
        (listing) => listing.propertyType === propertyType._id
      ).length;
    });
    
    setCategoryCounts(counts);
  }, [allFilteredListings, propertyTypes]);

  // Handle filter category click
  const handleCategoryClick = (propertyTypeId: string) => {
    // If the same category is clicked again, clear the filter
    const newValue =
      activeFilters.propertyType === propertyTypeId ? '' : propertyTypeId;

    // Update the propertyType filter in Redux - this will trigger the hook's filter effect
    dispatch(updateFilter({ name: 'propertyType', value: newValue }));
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full mx-auto bg-white py-4 px-4 max-w-[1280px] flex justify-center">
        <div className="animate-pulse flex space-x-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-[24px] w-[24px] mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state with visual-only fallback
  if (error) {
    return (
      <div className="w-full mx-auto bg-white overflow-x-auto py-2 scrollbar-hide max-w-[1280px]">
        <div className="flex flex-col">
          {/* Error message with retry button */}
          <div className="text-sm text-red-500 text-center mb-2 px-4">
            Unable to load property types.
            <button
              className="ml-2 underline font-medium"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>

          {/* Visual-only categories */}
          <div className="flex items-center gap-6 min-w-max px-4">
            {/* "All" option that works since it uses empty string */}
            <div
              key="all"
              className={`flex flex-col items-center text-center cursor-pointer ${
                !activeFilters.propertyType
                  ? 'scale-110 transition-transform'
                  : ''
              }`}
              onClick={() => handleCategoryClick('')}
            >
              <div
                className={`relative p-2 rounded-full ${!activeFilters.propertyType ? 'bg-[#1D5C5C]/10' : ''}`}
              >
                <img
                  src={'/icons/otherFilterIcon.png'}
                  alt={'All'}
                  loading="lazy"
                  className={`w-[24px] h-[24px] object-contain ${
                    !activeFilters.propertyType
                      ? 'filter invert-[15%] sepia-[100%] saturate-[3000%] hue-rotate-[195deg] brightness-[75%]'
                      : ''
                  }`}
                />
              </div>
              <p
                className={`text-[14px] font-[400] ${!activeFilters.propertyType ? 'text-[#1D5C5C] font-medium' : 'text-[#999999]'}`}
              >
                All
              </p>
            </div>

            {/* Map through static Filter data as visual elements only */}
            {Filter.map((filter, index) => (
              <div
                key={`static-${index}`}
                className="flex flex-col items-center text-center opacity-50 cursor-not-allowed"
                title="Property type filtering unavailable"
              >
                <div className="relative p-2 rounded-full">
                  <img
                    src={filter.image}
                    alt={filter.name}
                    loading="lazy"
                    className="w-[24px] h-[24px] object-contain"
                  />
                </div>
                <p className="text-[14px] font-[400] text-[#999999]">
                  {filter.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white overflow-x-auto py-2 scrollbar-hide max-w-screen">
      {/* Show filtering indicator if needed */}
      {isFilteringListings && (
        <div className="absolute right-4 top-2">
          <div className="animate-spin h-4 w-4 border-2 border-[#1D5C5C] border-t-transparent rounded-full"></div>
        </div>
      )}

      <div className="flex items-center gap-6 min-w-max px-4">
        <div
          key="all"
          className={`flex flex-col items-center text-center cursor-pointer ${
            !activeFilters.propertyType ? 'scale-110 transition-transform' : ''
          }`}
          onClick={() => handleCategoryClick('')}
        >
          <div
            className={`relative p-2 rounded-full ${!activeFilters.propertyType ? 'bg-[#1D5C5C]/10' : ''}`}
          >
            <img
              src={'/icons/otherFilterIcon.png'}
              alt={'All'}
              loading="lazy"
              className={`w-[24px] h-[24px] object-contain ${
                !activeFilters.propertyType
                  ? 'filter invert-[15%] sepia-[100%] saturate-[3000%] hue-rotate-[195deg] brightness-[75%]'
                  : ''
              }`}
            />
            {categoryCounts.all > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1D5C5C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {categoryCounts.all}
              </span>
            )}
          </div>
          <p
            className={`text-[14px] font-[400] ${!activeFilters.propertyType ? 'text-[#1D5C5C] font-medium' : 'text-[#999999]'}`}
          >
            All
          </p>
        </div>

        {propertyTypes?.data?.map(
          (propertyType: {
            _id: string;
            icon: { fileUrl: string };
            name: string;
          }) => {
            // Check if this filter is currently active
            const isActive = activeFilters.propertyType === propertyType._id;

            // Use the pre-calculated count from categoryCounts
            const count = categoryCounts[propertyType._id] || 0;

            return (
              <div
                key={propertyType._id}
                className={`flex flex-col items-center text-center cursor-pointer ${
                  isActive ? 'scale-110 transition-transform' : ''
                }`}
                onClick={() => handleCategoryClick(propertyType._id)}
              >
                <div
                  className={`relative p-2 rounded-full ${isActive ? 'bg-[#1D5C5C]/10' : ''}`}
                >
                  <img
                    src={
                      propertyType.icon?.fileUrl ||
                      '/icons/default-property.svg'
                    }
                    alt={propertyType.name}
                    loading="lazy"
                    className={`w-[24px] h-[24px] object-contain ${
                      isActive
                        ? 'filter invert-[15%] sepia-[100%] saturate-[3000%] hue-rotate-[195deg] brightness-[75%]'
                        : ''
                    }`}
                  />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1D5C5C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[14px] font-[400] ${isActive ? 'text-[#1D5C5C] font-medium' : 'text-[#999999]'}`}
                >
                  {propertyType.name}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default FilterCategories;
