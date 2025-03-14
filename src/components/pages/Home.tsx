import Header from "../layout/Header";
import heroImage from "../../assets/images/hero-image.jpeg";
import { SAMPLE_DATA, Filter } from "../../constants/data";
import React from "react";
import PropertyListings from "../PropertyListing";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <section className="py-15 m-5">
        <section className="relative w-full">
          {/* Hero Section */}
          <div
            className="relative w-full h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#E6E6E6] mb-4 max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#E6E6E6] mb-6">
                Find Everything You Love, at Prices You’ll Adore – Shop Now and Save Big.
              </p>
              <button className="bg-[#730071] px-6 py-2 rounded-md text-white text-sm md:text-base">
                Shop Now
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-[#8b2b89] w-full py-4 px-4 md:px-8 absolute bottom-0 transform translate-y-1/2">
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4">
              {["Filter Parameter 1", "Filter Parameter 2", "Filter Parameter 3", "Filter Parameter 4", "Filter Parameter 5"].map(
                (param, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-[#E6E6E6] font-medium text-sm">{param}</label>
                    <select className="w-full md:w-[200px] h-[36px] bg-white text-black border border-gray-300 rounded-md mt-1">
                      <option value="">Select</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </select>
                  </div>
                )
              )}
              {/* Search Button */}
              <button className="bg-black text-white px-6 py-2 rounded-md text-sm md:text-base">Search</button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <div className="w-full overflow-x-auto mt-20 py-2 scrollbar-hide max-w-[1280px]">
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
                <p className="text-[14px] font-[400] text-[#999999]">{filter.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Property Listings Section */}
        <div className="py- m-5">
          <PropertyListings listings={SAMPLE_DATA} />
        </div>
      </section>

      {/* Continue Exploring Section */}
      <div className="flex justify-center items-center">
        <div>
          <p className="text-[#6F6F6F] font-[400] text-[14px] mb-4 ">Continue exploring short let houses</p>
          <div className="mx-auto flex items-center justify-center">
            <button className="bg-[#730071] px-6 py-2 rounded-md text-white">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;