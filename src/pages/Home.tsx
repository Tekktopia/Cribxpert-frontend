import Header, { HeaderSpacer } from '@/components/layout/Header';
// import { SAMPLE_DATA } from '@/utils/data';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import PropertyListings from '@/components/PropertyListing';
import Hero from '@/components/common/Hero';
import FilterBar from '@/components/home/FilterBar';
import Pagination from '@/components/discover-components/Pagination';
import FilterCategories from '@/components/home/FilterCategories';
import {
  selectCurrentListings,
  selectInitialListingsLoaded,
  setCurrentListings,
  setInitialListingsLoaded,
  useGetListingsQuery,
} from '@/features/listing';
import { useDispatch, useSelector } from 'react-redux';

// Hero carousel images array
const heroImages = [
  '/images/apartment2.jpg',
  '/images/hero-image.jpeg',
  '/images/apartment3.jpg',
];

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const initialListingsLoaded = useSelector(selectInitialListingsLoaded);

  // Initial fetch of all listings (with no filters)
  const { data: allListings, isLoading: isLoadingInitial } =
    useGetListingsQuery(
      {},
      {
        // Only fetch once on component mount
        skip: initialListingsLoaded,
      }
    );

  // Get current listings from Redux state
  const currentListings = useSelector(selectCurrentListings);

  // Set initial listings when they load
  useEffect(() => {
    if (allListings && !initialListingsLoaded) {
      dispatch(setCurrentListings(allListings.listings));
      dispatch(setInitialListingsLoaded(true));
    }
  }, [allListings, initialListingsLoaded, dispatch]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

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

  // Determine if we're in a loading state
  const isLoading =
    isLoadingInitial || (!initialListingsLoaded && !allListings);

  return (
    <div>
      <Header />
      <section className="py-15 my-5">
        <HeaderSpacer />
        <section className="relative w-full">
          {/* Hero Section with Carousel */}
          <Hero
            images={heroImages}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            subtitle="Find Everything You Love, at Prices You'll Adore – Shop Now and Save Big."
            buttonText="Shop Now"
            buttonLink="/discover"
          />
        </section>

        {/* Filter Bar - Made sticky */}
        <div className="sticky top-0 z-30">
          <FilterBar />
          <FilterCategories />
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1D5C5C] mb-4"></div>
            <p className="text-gray-500">Loading available properties...</p>
          </div>
        ) : currentListings.length === 0 ? (
          // No results state
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="/icons/no-results.svg"
              alt="No properties found"
              className="w-20 h-20 mb-4 opacity-60"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        ) : (
          // Property Listings Section
          <div className="my-5">
            <PropertyListings listings={paginatedData} />

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(currentListings.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
