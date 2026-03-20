  import PropertyListingCard from '@/features/properties/components/PropertyCard';
  import { useState, useMemo, useEffect, useCallback } from 'react';
  import Pagination from './Pagination';
  import { useSelector, useDispatch } from 'react-redux';
  import {
    selectAllListings,
    setCurrentListings,
    selectActiveFilters,
  } from '@/features/properties/listingSlice';
  import { selectAllPropertyTypes } from '@/features/propertyType';
  import { selectAllAmenities } from '@/features/amenities/amenitiesSlice';
  import { filterListings } from '@/utils/filterUtils';

  type DiscoverResultsProps = {
    isOpen: boolean;
    searchQuery?: string;
  };

  export default function DiscoverResults({
    isOpen,
    searchQuery = '',
  }: DiscoverResultsProps) {
    const dispatch = useDispatch();

    // Get data from Redux store
    const rawListings = useSelector(selectAllListings);
    const rawPropertyTypes = useSelector(selectAllPropertyTypes);
    const rawAmenities = useSelector(selectAllAmenities);
    const activeFilters = useSelector(selectActiveFilters);

    // Memoize the data to prevent unnecessary re-renders
    const allListings = useMemo(() => rawListings || [], [rawListings]);
    const propertyTypes = useMemo(
      () => rawPropertyTypes || [],
      [rawPropertyTypes]
    );
    const amenities = useMemo(() => rawAmenities || [], [rawAmenities]);

    const itemsPerPage = isOpen ? 6 : 8; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Helper functions to resolve IDs to names (memoized for performance)
    const getAmenityNameById = useMemo(() => {
      return (amenityId: string): string => {
        const amenity = amenities.find((a) => a._id === amenityId);
        return amenity?.name || amenityId;
      };
    }, [amenities]);

    const getPropertyTypeNameById = useMemo(() => {
      return (propertyTypeId: string): string => {
        const propertyType = propertyTypes.find(
          (pt) => pt._id === propertyTypeId
        );
        return propertyType?.name || propertyTypeId;
      };
    }, [propertyTypes]);

    // Memoize property type names lookup for better performance
    const propertyTypeNames = useMemo(() => {
      
      return propertyTypes
        .map((type) => ({
          id: type._id,
          name: type.name,
        }))
        .reduce(
          (acc, type) => {
            acc[type.id] = type.name;
            return acc;
          },
          {} as Record<string, string>
        );
    }, [propertyTypes]);

    // Filter listings based on search query and active filters
    const filteredListings = useMemo(() => {
      let filtered = allListings;

      // Apply search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();

        filtered = filtered.filter((listing) => {
          // Skip if listing doesn't have required properties
          if (
            !listing ||
            !listing.name ||
            !listing.city ||
            !listing.state ||
            !listing.country
          ) {
            return false;
          }

          // Search in property name
          if (listing.name.toLowerCase().includes(query)) {
            return true;
          }

          // Search in location (city, state, country)
          if (
            listing.city.toLowerCase().includes(query) ||
            listing.state.toLowerCase().includes(query) ||
            listing.country.toLowerCase().includes(query)
          ) {
            return true;
          }

          // Search in property type name
          const propertyTypeId = typeof listing.propertyType === 'string'
            ? listing.propertyType
            : (typeof listing.propertyType === 'object' && listing.propertyType !== null && '_id' in listing.propertyType
              ? (listing.propertyType as { _id: string })._id
              : '');
          const propertyTypeName = getPropertyTypeNameById(propertyTypeId);
          if (
            propertyTypeName &&
            propertyTypeName.toLowerCase().includes(query)
          ) {
            return true;
          }

          // Search in amenity names
          const hasMatchingAmenity = listing.amenities?.some((amenity) => {
            const amenityId = typeof amenity === 'string'
              ? amenity
              : (typeof amenity === 'object' && amenity !== null && '_id' in amenity
                ? (amenity as { _id: string })._id
                : '');
            const amenityName = getAmenityNameById(amenityId);
            return amenityName && amenityName.toLowerCase().includes(query);
          });

          if (hasMatchingAmenity) {
            return true;
          }

          // Search in description
          if (
            listing.description &&
            listing.description.toLowerCase().includes(query)
          ) {
            return true;
          }

          return false;
        });
      }

      // Apply active filters
      if (
        Object.keys(activeFilters).some(
          (key) => activeFilters[key] && activeFilters[key] !== ''
        )
      ) {
        // Normalize amenities to always be an array
        const normalizedFilters = {
          ...activeFilters,
          amenities: Array.isArray(activeFilters.amenities)
            ? activeFilters.amenities
            : activeFilters.amenities
              ? [activeFilters.amenities as string]
              : [],
        };
        filtered = filterListings(filtered, normalizedFilters);
      }

      return filtered;
    }, [
      allListings,
      searchQuery,
      getPropertyTypeNameById,
      getAmenityNameById,
      activeFilters,
    ]);

    // Memoize pagination calculations
    const paginationData = useMemo(() => {
      const offset = (currentPage - 1) * itemsPerPage;
      const currentItems = filteredListings.slice(offset, offset + itemsPerPage);
      const pageCount = Math.ceil(filteredListings.length / itemsPerPage);

      return {
        currentItems,
        pageCount,
        offset,
      };
    }, [filteredListings, currentPage, itemsPerPage]);

    const handlePageChange = useCallback((selected: number) => {
      setCurrentPage(selected);
    }, []);

    // Reset to first page when search query or filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery, activeFilters]);

    // Update currentListings in Redux store when filtered results change
    useEffect(() => {
      dispatch(setCurrentListings(filteredListings));
    }, [dispatch, filteredListings]);

    // Initialize currentListings with allListings on component mount if no search query
    useEffect(() => {
      if (!searchQuery && allListings.length > 0) {
        dispatch(setCurrentListings(allListings));
      }
    }, [dispatch, allListings, searchQuery]);

    // Memoize the grid classes to prevent unnecessary recalculations
    const gridClasses = useMemo(() => {
      return `grid grid-cols-1 sm:grid-cols-2 ${isOpen ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
        } max-h-[90vh] overflow-y-scroll scrollbar-hide gap-4 mb-14`;
    }, [isOpen]);



    return (
      <div className="mt-8 w-full max-w-none">
        {/* Search results header */}
        {(searchQuery ||
          Object.keys(activeFilters).some(
            (key) => activeFilters[key] && activeFilters[key] !== ''
          )) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : 'Filtered Results'}
              </h2>
              <p className="text-gray-600">
                {filteredListings.length}{' '}
                {filteredListings.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
          )}

        <div className={gridClasses}>
          {paginationData.currentItems.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ||
                  Object.keys(activeFilters).some(
                    (key) => activeFilters[key] && activeFilters[key] !== ''
                  )
                  ? 'No properties found'
                  : 'No properties available'}
              </h3>
              <p className="text-gray-500 max-w-md">
                {searchQuery ||
                  Object.keys(activeFilters).some(
                    (key) => activeFilters[key] && activeFilters[key] !== ''
                  )
                  ? `Try adjusting your search term or filters to find more properties.`
                  : 'Check back later for new property listings.'}
              </p>
            </div>
          ) : (
            paginationData.currentItems.map(
              (
                {
                  _id,
                  listingImg,
                  basePrice,
                  cleaningFee,   // add this
                  rating,
                  name,
                  city,
                  state,
                  country,
                  description,
                  bedroomNo,
                  propertyType,
                  createdAt,
                },

                key
              ) => {
                console.log(`[CARD] ${name} | basePrice: ${basePrice} | cleaningFee: ${cleaningFee} | type: ${typeof cleaningFee}`)
                const images = listingImg.map((img) => img.fileUrl) || [];
                const location = `${city}, ${state}, ${country}`;

                // Get property type name - handle both object and ID formats
                let propertyTypeName = '';
                if (propertyType) {
                  if (typeof propertyType === 'object' && 'name' in propertyType) {
                    // Property type is an object with name property
                    propertyTypeName = (propertyType as { name: string }).name;
                  } else if (typeof propertyType === 'string') {
                    // Property type is an ID string, look it up
                    propertyTypeName = propertyTypeNames[propertyType] ?? '';
                  }
                }

                return (
                  <PropertyListingCard
                    key={key}
                    id={_id}
                    image={images[0] || ''}
                    price={basePrice}
                    cleaningFee={cleaningFee ?? 0}   // add this
                    rating={rating}
                    name={name}
                    location={location}
                    description={description}
                    images={images}
                    bedrooms={bedroomNo}
                    propertyType={propertyTypeName}
                    minWidth="min-w-[200px]"
                    createdAt={createdAt}
                  />
                );
              }
            )
          )}
        </div>
        {/* Only show pagination if there are results */}
        {paginationData.currentItems.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginationData.pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }
