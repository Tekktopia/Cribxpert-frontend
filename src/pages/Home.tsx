import Header, { HeaderSpacer } from '@/components/layout/Header';
import { SAMPLE_DATA, Filter } from '@/utils/data';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import PropertyListings from '@/components/PropertyListing';
import Hero from '@/components/common/Hero';
import FilterBar from '@/components/home/FilterBar';
import type { FilterParameter } from '@/types';
import Pagination from '@/components/discover-components/Pagination';
import { useGeolocation } from '@/hooks/useGeolocation';
import {
  nigerianLocations,
  getNearbyLocations
} from '@/utils/locationUtils';

// Hero carousel images array
const heroImages = [
  '/images/apartment2.jpg',
  '/images/hero-image.jpeg',
  '/images/apartment3.jpg',
];

const Home: React.FC = () => {
  // Get user's geolocation
  const userLocation = useGeolocation();

  // State for filter parameters (with initial default values)
  const [filterParameters, setFilterParameters] = useState<FilterParameter[]>([
    {
      name: 'location',
      label: 'Location',
      options: [
        { value: 'lagos', label: 'Lagos' },
        { value: 'abuja', label: 'Abuja' },
        { value: 'portHarcourt', label: 'Port Harcourt' },
      ],
    },
    {
      name: 'propertyType',
      label: 'Property Type',
      options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'villa', label: 'Villa' },
      ],
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      options: [
        { value: '0-50000', label: '₦0 - ₦50,000' },
        { value: '50000-100000', label: '₦50,000 - ₦100,000' },
        { value: '100000-200000', label: '₦100,000 - ₦200,000' },
      ],
    },
    {
      name: 'bedrooms',
      label: 'Bedrooms',
      options: [
        { value: '1', label: '1 Bedroom' },
        { value: '2', label: '2 Bedrooms' },
        { value: '3plus', label: '3+ Bedrooms' },
      ],
    },
    {
      name: 'amenities',
      label: 'Amenities',
      options: [
        { value: 'wifi', label: 'WiFi' },
        { value: 'pool', label: 'Swimming Pool' },
        { value: 'parking', label: 'Parking' },
      ],
    },
  ]);

  // Update location options based on user's geolocation
  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      // Get locations sorted by proximity to user
      const closestLocations = getNearbyLocations(
        userLocation.latitude,
        userLocation.longitude,
        10 // Get top 10 locations
      );

      // Update filter parameters with closest locations
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'location'
            ? { ...param, options: closestLocations }
            : param
        )
      );
    } else if (!userLocation.loading && userLocation.error) {
      // If geolocation fails, show more default locations
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'location'
            ? {
                ...param,
                options: nigerianLocations
                  .slice(0, 10)
                  .map((loc) => ({ value: loc.value, label: loc.label })),
              }
            : param
        )
      );
    }
  }, [
    userLocation.latitude,
    userLocation.longitude,
    userLocation.loading,
    userLocation.error,
  ]);

  // In Home.tsx, only show a subset of data
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  // Memoize the paginated data
  const paginatedData = useMemo(() => {
    return SAMPLE_DATA.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [page, itemsPerPage]);

  const handlePageChange = useCallback((selected: number) => {
    setPage(selected);
  }, []);
  const [filters, setFilters] = useState<Record<string, string>>({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    amenities: '',
  });

  // Handler for filter changes
  const handleFilterChange = useCallback((name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }, []);

  // Handler for search button click
  const handleSearch = useCallback(() => {
    console.log('Searching with filters:', filters);
    // Implement search functionality here
  }, [filters]);

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
          />{' '}
        </section>{' '}
        {/* Location loading indicator */}
        {userLocation.loading && (
          <div className="bg-blue-50 text-blue-700 px-4 py-2 text-sm rounded-md mx-auto max-w-[1280px] my-2 flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Finding locations near you...
          </div>
        )}
        {/* Filter Bar - Made sticky */}
        <div className="sticky top-0 z-30">
          <FilterBar
            parameters={filterParameters}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            className="hidden lg:block"
          />
          {/* Filters Section */}
          <div className="w-full mx-auto bg-white overflow-x-auto py-2 scrollbar-hide max-w-[1280px]">
            <div className="flex items-center gap-6 min-w-max px-4">
              {Filter.map((filter, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={filter.image}
                    alt={filter.name}
                    loading="lazy"
                    className="w-[24px] h-[24px] object-contain"
                  />
                  <p className="text-[14px] font-[400] text-[#999999]">
                    {filter.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Property Listings Section */}
        <div className="my-5">
          <PropertyListings listings={paginatedData} />
        </div>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(SAMPLE_DATA.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </section>

      {/* Continue Exploring Section */}
      {/* <div className="flex justify-center items-center">
        <div>
          <p className="text-[#6F6F6F] font-[400] text-[14px] mb-4 ">
            Continue exploring short let houses
          </p>
          <div className="mx-auto flex items-center justify-center">
            <button className="bg-[#730071] px-6 py-2 rounded-md text-white">
              Shop Now
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
