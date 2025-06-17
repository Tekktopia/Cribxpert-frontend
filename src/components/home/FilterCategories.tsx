import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
  selectCurrentListings,
} from '@/features/listing';
import { useGetPropertyTypesQuery } from '@/features/propertyType';
import { Filter } from '@/utils/data';

const FilterCategories: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const currentListings = useSelector(selectCurrentListings);

  // Fetch property types from the API
  const { data: propertyTypes, isLoading, error } = useGetPropertyTypesQuery();

  // Handle filter category click
  const handleCategoryClick = (propertyTypeId: string) => {
    // If the same category is clicked again, clear the filter
    const newValue =
      activeFilters.propertyType === propertyTypeId ? '' : propertyTypeId;

    // Update the propertyType filter in Redux
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

  // Show error state with functional fallback
  if (error) {
    console.log(error);
    return (
      <div className="w-full mx-auto bg-white overflow-x-auto py-2 scrollbar-hide max-w-[1280px]">
        <div className="flex items-center gap-6 min-w-max px-4">
          {/* Add an "All" option */}
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

          {/* Map through static Filter data */}
          {Filter.map((filter, index) => {
            // Check if this filter is currently active (using the index as a fallback ID)
            const filterId = `static-${index}`;
            const isActive = activeFilters.propertyType === filterId;

            // Count listings with this property type (if available)
            // This assumes your listings have a fallback propertyType field or similar
            const count =
              currentListings.length > 0
                ? currentListings.filter(
                    (listing) =>
                      // Match by name since we don't have IDs in the fallback
                      listing.propertyType?.toLowerCase() ===
                      filter.name.toLowerCase()
                  ).length
                : null;

            return (
              <div
                key={filterId}
                className={`flex flex-col items-center text-center cursor-pointer ${
                  isActive ? 'scale-110 transition-transform' : ''
                }`}
                onClick={() => handleCategoryClick(filterId)}
              >
                <div
                  className={`relative p-2 rounded-full ${isActive ? 'bg-[#1D5C5C]/10' : ''}`}
                >
                  <img
                    src={filter.image}
                    alt={filter.name}
                    loading="lazy"
                    className={`w-[24px] h-[24px] object-contain ${
                      isActive
                        ? 'filter invert-[15%] sepia-[100%] saturate-[3000%] hue-rotate-[195deg] brightness-[75%]'
                        : ''
                    }`}
                  />
                  {count !== null && count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1D5C5C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[14px] font-[400] ${isActive ? 'text-[#1D5C5C] font-medium' : 'text-[#999999]'}`}
                >
                  {filter.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white overflow-x-auto py-2 scrollbar-hide max-w-[1280px]">
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
            {/* Optional count of all listings */}
            {currentListings.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1D5C5C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {currentListings.length}
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

            // Count listings with this property type (if available)
            const count =
              currentListings.length > 0
                ? currentListings.filter(
                    (listing) => listing.propertyType === propertyType._id
                  ).length
                : null;

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
                  {count !== null && count > 0 && (
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
