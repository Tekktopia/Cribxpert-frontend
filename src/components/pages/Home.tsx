import Header from '../layout/Header';
import heroImage from '../../assets/images/hero-image.jpeg';
import { SAMPLE_DATA, Filter } from '@/utils/data';
import React, { useEffect, useState } from 'react';
import PropertyListings from '../PropertyListing';

type FilterOption = {
  value: string;
  label: string;
};

type FilterParameter = {
  name: string;
  label: string;
  options: FilterOption[];
};

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
  
  "/images/apartment2.jpg",
  heroImage,
  "/images/apartment3.jpg",
];

const Home: React.FC = () => {
  // State for tracking current image index
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Function to manually navigate to a specific slide
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <Header />
      <section className="py-15 my-5 lg:mx-5">
        <section className="relative w-full lg:h-[100vh]">
          {/* Hero Section with Carousel */}
          <div
            className="relative w-full h-[600px] bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#E6E6E6] mb-4 max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#E6E6E6] mb-6">
                Find Everything You Love, at Prices You'll Adore – Shop Now and
                Save Big.
              </p>
              <button className="bg-[#730071] px-6 py-2 rounded-md text-white text-sm md:text-base">
                Shop Now
              </button>
            </div>
            
            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 hover:cursor-pointer rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Optional: Left/Right Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
              onClick={() => setCurrentImageIndex(prev => prev === 0 ? heroImages.length - 1 : prev - 1)}
            >
              ←
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
              onClick={() => setCurrentImageIndex(prev => prev === heroImages.length - 1 ? 0 : prev + 1)}
            >
              →
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-[#8b2b89] hidden lg:block w-full py-4 px-3 md:px-8 absolute bottom-0 transform translate-y-1/2 z-10">
            {/* Mobile View: Collapsible Filter */}
            <div className="md:hidden mb-2 flex justify-between items-center text-white">
              <span className="font-medium">Filters</span>
            </div>

            <div className="flex flex-col md:flex-row container mx-auto justify-center md:justify-between gap-3 md:gap-4">
              {/* Mobile Scrollable Container */}
              <div className="flex md:flex-wrap overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-3">
                {filterParameters.map((param, index) => (
                  <div
                    key={index}
                    className="flex flex-col min-w-[140px] md:min-w-0 md:flex-1"
                  >
                    <label className="text-[#E6E6E6] font-medium text-xs md:text-sm whitespace-nowrap">
                      {param.label}
                    </label>
                    <select
                      name={param.name}
                      className="w-full md:w-[150px] lg:w-[200px] h-[36px] bg-white text-black border border-gray-300 rounded-md mt-1 text-sm"
                    >
                      <option value="">Select</option>
                      {param.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Search Button - Full Width on Mobile */}
              <button className="bg-black text-white h-[36px] px-4 py-2 rounded-md text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end">
                Search
              </button>
            </div>
          </div>
        </section>

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
        <div className="m-5">
          <PropertyListings listings={SAMPLE_DATA} />
        </div>
      </section>

      {/* Continue Exploring Section */}
      <div className="flex justify-center items-center">
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
      </div>
    </div>
  );
};

export default Home;
