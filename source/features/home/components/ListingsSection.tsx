import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropertyListings from '@/features/properties/components/PropertyListing';
import { selectCurrentListings } from '@/features/properties';
import LoadingState from '@/shared/components/LoadingState';
import EmptyState from '@/shared/components/EmptyState';

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
    <div className="py-20">
      <PropertyListings listings={paginatedData} />
      
      {currentListings.length > itemsPerPage && (
        <div className="flex justify-center mt-24">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="premium-transition border-2 border-neutral-200 text-neutral-900 px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:border-primary hover:text-white"
          >
            Load More Spaces
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingsSection;
