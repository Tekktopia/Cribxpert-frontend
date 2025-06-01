import Header, { HeaderSpacer } from '@/components/layout/Header';
import { SAMPLE_DATA, Filter } from '@/utils/data';
import React, { useCallback, useMemo, useState } from 'react';
import PropertyListings from '@/components/PropertyListing';
import Hero from '@/components/common/Hero';
import FilterBar from '@/components/home/FilterBar';
import type { FilterParameter } from '@/types';
import Pagination from '@/components/discover-components/Pagination';

const filterParameters: FilterParameter[] = [
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
];

// Hero carousel images array
const heroImages = [
  '/images/apartment2.jpg',
  '/images/hero-image.jpeg',
  '/images/apartment3.jpg',
];

const Home: React.FC = () => {
  // In Home.tsx, only show a subset of data
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  // Memoize the paginated data
  const paginatedData = useMemo(() => {
    return SAMPLE_DATA.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
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
        <HeaderSpacer/>
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

        {/* Filter Bar */}
        <FilterBar
          parameters={filterParameters}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          className="hidden lg:block z-10"
        />

        {/* Filters Section */}
        <div className="w-full mx-auto overflow-x-auto lg:mt-12 py-2 scrollbar-hide max-w-[1280px]">
          <div className="flex items-center gap-6 min-w-max px-4">
            {Filter.map((filter, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={filter.image}
                  alt={filter.name}
                  className="w-[24px] h-[24px] object-contain"
                />
                <p className="text-[14px] font-[400] text-[#999999]">
                  {filter.name}
                </p>
              </div>
            ))}
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
