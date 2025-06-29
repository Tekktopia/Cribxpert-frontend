import PropertyListingCard from '../common/PropertyCard';
import { useState, useMemo, useEffect } from 'react';
import Pagination from './Pagination';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllListings,
  setCurrentListings,
} from '@/features/listing/listingSlice';
import { selectAllPropertyTypes } from '@/features/propertyType';
import { selectAllAmenities } from '@/features/amenities/amenitiesSlice';

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

  // Filter listings based on search query
  const filteredListings = useMemo(() => {
    if (!searchQuery.trim()) {
      return allListings;
    }

    const query = searchQuery.toLowerCase().trim();

    return allListings.filter((listing) => {
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
      const propertyTypeName = getPropertyTypeNameById(listing.propertyType);
      if (propertyTypeName.toLowerCase().includes(query)) {
        return true;
      }

      // Search in amenity names
      const hasMatchingAmenity = listing.amenities?.some((amenityId) => {
        const amenityName = getAmenityNameById(amenityId);
        return amenityName.toLowerCase().includes(query);
      });

      if (hasMatchingAmenity) {
        return true;
      }

      // Search in description
      if (listing.description.toLowerCase().includes(query)) {
        return true;
      }

      return false;
    });
  }, [allListings, searchQuery, getPropertyTypeNameById, getAmenityNameById]);

  // Calculate the data to display for the current page
  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredListings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredListings.length / itemsPerPage);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

  // Precompute property type names for rendering
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

  return (
    <div className="mt-8 w-full max-w-none">
      {/* Search results header */}
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Search Results for "{searchQuery}"
          </h2>
          <p className="text-gray-600">
            {filteredListings.length}{' '}
            {filteredListings.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${isOpen ? 'xl:grid-cols-2' : 'xl:grid-cols-3'} max-h-[90vh] overflow-y-scroll scrollbar-hide gap-4 mb-14 place-items-center`}
      >
        {currentItems.length === 0 ? (
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
              {searchQuery ? 'No properties found' : 'No properties available'}
            </h3>
            <p className="text-gray-500 max-w-md">
              {searchQuery
                ? `Try adjusting your search term or browse all available properties.`
                : 'Check back later for new property listings.'}
            </p>
          </div>
        ) : (
          currentItems.map(
            (
              {
                _id,
                listingImg,
                basePrice,
                rating,
                name,
                city,
                state,
                country,
                description,
                bedroomNo,
                propertyType,
              },
              key
            ) => {
              const images = listingImg.map((img) => img.fileUrl) || [];
              const location = `${city}, ${state}, ${country}`;
              const propertyTypeName = propertyTypeNames[propertyType];

              return (
                <PropertyListingCard
                  key={key}
                  id={_id}
                  image={images[0] || ''}
                  price={basePrice}
                  rating={rating}
                  name={name}
                  location={location}
                  description={description}
                  images={images}
                  bedrooms={bedroomNo}
                  propertyType={propertyTypeName}
                />
              );
            }
          )
        )}
      </div>
      {/* Only show pagination if there are results */}
      {currentItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
