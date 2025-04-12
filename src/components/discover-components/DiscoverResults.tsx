import { SAMPLE_DATA } from '@/utils/data';
import PropertyListingCard from '../common/PropertyCard';
import { useState } from 'react';
import Pagination from './Pagination';

type DiscoverResultsProps = {
  isOpen: boolean;
};

export default function DiscoverResults({ isOpen }: DiscoverResultsProps) {
  const listings = SAMPLE_DATA.concat(SAMPLE_DATA, SAMPLE_DATA); // Sample data * 3 for testing pagination
  const itemsPerPage = isOpen ? 6 : 8; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the data to display for the current page
  const offset = (currentPage -1 ) * itemsPerPage;
  const currentItems = listings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(listings.length / itemsPerPage);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <div className="mt-8 w-full max-w-none">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${isOpen ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 mb-14`}
      >
        {currentItems.map((listing, key) => (
          <PropertyListingCard
            key={key}
            image={listing.image}
            price={listing.price}
            rating={listing.rating}
            propertyName={listing.propertyName}
            location={listing.location}
            description={listing.description}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
