import Header, { HeaderSpacer } from '@/components/layout/Header';
import { SAMPLE_DATA, Filter } from '@/utils/data';
import React, { useCallback, useMemo, useState} from 'react';
import PropertyListings from '@/components/PropertyListing';
import Hero from '@/components/common/Hero';
import FilterBar from '@/components/home/FilterBar';
import Pagination from '@/components/discover-components/Pagination';

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
    return SAMPLE_DATA.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [page, itemsPerPage]);

  const handlePageChange = useCallback((selected: number) => {
    setPage(selected);
  }, []);

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
        {/* Filter Bar - Made sticky */}
        <div className="sticky top-0 z-30">
          <FilterBar/>
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
            <button className="bg-[#1D5C5C] px-6 py-2 rounded-md text-white">
              Shop Now
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
