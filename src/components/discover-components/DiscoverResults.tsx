import PropertyListingCard from '../common/PropertyCard';
import { useState } from 'react';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { selectAllListings } from '@/features/listing/listingSlice';
import { selectAllPropertyTypes } from '@/features/propertyType';

type DiscoverResultsProps = {
  isOpen: boolean;
};

export default function DiscoverResults({ isOpen }: DiscoverResultsProps) {
  const listings = useSelector(selectAllListings) || []; // Sample data * 3 for testing pagination
  const itemsPerPage = isOpen ? 6 : 8; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the data to display for the current page
  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = listings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(listings.length / itemsPerPage);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const propertyTypes = useSelector(selectAllPropertyTypes) || [];
  // Precompute property type names for all listings
  const propertyTypeNames = propertyTypes
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

  return (
    <div className="mt-8 w-full max-w-none">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${isOpen ? 'xl:grid-cols-3' : 'xl:grid-cols-4'} max-h-[90vh] overflow-y-scroll scrollbar-hide gap-4 mb-14 place-items-center`}
      >
        {currentItems.map(
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
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
