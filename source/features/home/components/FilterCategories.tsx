import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
  useGetListingsQuery,
} from '@/features/properties';
import { useGetPropertyTypesQuery } from '@/features/propertyType';
import { Filter } from '@/utils/data';
import { useFilteredListings } from '@/hooks/useFilteredListings';

const FilterCategories: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);

  // State to track counts for each property type
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );

  // Use the hook to automatically update listings when filters change
  const { isLoading: isFilteringListings, currentFilters } =
    useFilteredListings();

  // Fetch property types from the API
  const { data: propertyTypes, isLoading, error } = useGetPropertyTypesQuery();

  // Create a separate filter object without propertyType
  const filtersWithoutPropertyType = { ...currentFilters };
  if ('propertyType' in filtersWithoutPropertyType) {
    delete filtersWithoutPropertyType.propertyType;
  }

  // Fetch all listings matching current filters EXCEPT property type
  const { data: allFilteredListings } = useGetListingsQuery(
    filtersWithoutPropertyType,
    {
      skip: isLoading,
    }
  );

  // Calculate counts for each property type based on all filtered listings
  useEffect(() => {
    if (!allFilteredListings || !propertyTypes?.data) return;
  
    const listings = Array.isArray(allFilteredListings)
      ? allFilteredListings
      : allFilteredListings.listings || [];
  
    const counts: Record<string, number> = { all: listings.length };
  
    propertyTypes.data.forEach((propertyType: { _id: string }) => {
      counts[propertyType._id] = listings.filter((listing) => {
        // Handle both populated object and plain string ID
        const typeId =
          typeof listing.propertyType === 'object' && listing.propertyType !== null
            ? (listing.propertyType as { _id: string })._id
            : listing.propertyType;
        return typeId === propertyType._id;
      }).length;
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
              className={`flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                !activeFilters.propertyType
                  ? 'scale-110 transition-transform'
                  : ''
              }`}
              onClick={() => handleCategoryClick('')}
            >
              <div
                className={`relative p-2 rounded-full transition-colors duration-200 ${
                  !activeFilters.propertyType 
                    ? 'bg-[#1D5C5C]/10' 
                    : 'hover:bg-[#1D5C5C]/5'
                }`}
              >
                <img
                  src={'/other-icons/otherFilterIcon.png'}
                  alt={'All'}
                  loading="lazy"
                  className={`w-[24px] h-[24px] object-contain transition-all duration-200 ${
                    !activeFilters.propertyType
                      ? 'filter invert-[15%] sepia-[100%] saturate-[3000%] hue-rotate-[195deg] brightness-[75%]'
                      : ''
                  }`}
                />
              </div>
              <p
                className={`text-[14px] font-[400] transition-colors duration-200 ${
                  !activeFilters.propertyType 
                    ? 'text-primary font-medium' 
                    : 'text-[#999999] hover:text-primary'
                }`}
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
    <div className="w-full bg-white overflow-x-auto py-6 scrollbar-hide border-b border-neutral-100 content-container relative">
      {/* Show filtering indicator if needed */}
      {isFilteringListings && (
        <div className="absolute right-8 top-2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      <div className="flex items-center gap-10 min-w-max">
        <div
          key="all"
          className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 min-w-[70px] group ${
            !activeFilters.propertyType ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
          onClick={() => handleCategoryClick('')}
        >
          <div
            className={`relative p-3 rounded-xl transition-all duration-300 mb-2 ${
              !activeFilters.propertyType 
                ? 'bg-primary shadow-premium scale-110' 
                : 'bg-neutral-100 group-hover:bg-neutral-200'
            }`}
          >
            <img
              src={'/other-icons/otherFilterIcon.png'}
              alt={'All'}
              loading="lazy"
              className={`w-[24px] h-[24px] object-contain transition-all duration-300 ${
                !activeFilters.propertyType
                  ? 'filter brightness-0 invert'
                  : 'filter grayscale'
              }`}
            />
            {categoryCounts.all > 0 && (
              <span className={`absolute -top-2 -right-2 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white shadow-sm transition-all duration-300 ${
                !activeFilters.propertyType ? 'bg-secondary text-white' : 'bg-primary text-white'
              }`}>
                {categoryCounts.all}
              </span>
            )}
          </div>
          <p
            className={`text-xs tracking-tight transition-all duration-300 ${
              !activeFilters.propertyType 
                ? 'text-primary font-bold' 
                : 'text-neutral-500 font-medium'
            }`}
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
                className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 min-w-[80px] group ${
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
                onClick={() => handleCategoryClick(propertyType._id)}
              >
          <div
            className={`relative p-3 rounded-full transition-all duration-500 mb-3 ${
              isActive 
                ? 'bg-primary shadow-premium scale-110' 
                : 'bg-neutral-50 group-hover:bg-neutral-100'
            }`}
          >
            <img
              src={
                propertyType.icon?.fileUrl ||
                '/icons/default-property.svg'
              }
              alt={propertyType.name}
              loading="lazy"
              className={`w-5 h-5 object-contain transition-all duration-300 ${
                isActive
                  ? 'filter brightness-0 invert'
                  : 'filter grayscale opacity-40 group-hover:opacity-100'
              }`}
            />
            {count > 0 && (
              <span className={`absolute -top-1 -right-1 text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold border border-white shadow-sm transition-all duration-300 ${
                isActive ? 'bg-secondary text-white' : 'bg-primary text-white'
              }`}>
                {count}
              </span>
            )}
          </div>
          <p
            className={`text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${
              isActive 
                ? 'text-primary font-bold' 
                : 'text-neutral-400 font-medium group-hover:text-neutral-900'
            }`}
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