import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropertyListings from '@/components/PropertyListing';
import Pagination from '@/components/discover-components/Pagination';
import { selectCurrentListings } from '@/features/listing';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';

interface ListingsSectionProps {
  isLoading?: boolean;
  itemsPerPage?: number;
}

const ListingsSection: React.FC<ListingsSectionProps> = ({
  isLoading = false,
  itemsPerPage = 12,
}) => {
  const currentListings = useSelector(selectCurrentListings);
  const [page, setPage] = useState(1);

  // Memoize the paginated data
  const paginatedData = useMemo(() => {
    return currentListings.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  }, [page, itemsPerPage, currentListings]);

  const handlePageChange = useCallback((selected: number) => {
    setPage(selected);
  }, []);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // No results state
  if (currentListings.length === 0) {
    return <EmptyState />;
  }

  // Property Listings Section
  return (
    <div className="my-5">
      <PropertyListings listings={paginatedData} />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(currentListings.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListingsSection;
