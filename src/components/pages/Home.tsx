import Header from "../layout/Header";

import { SAMPLE_DATA,Filter } from "../../constants/data"

import React from "react"
import PropertyListings from "../PropertyListing"
const Home :React.FC= () => {
  return (
    <div>
        <Header/>
        <section className="py-20 m-5">
  {/* Filters Section */}
  <div className="w-full overflow-x-auto scrollbar-hide  max-w-[1280px]">
    <div className="flex items-center gap-6 min-w-max px-4">
      {Filter.map((filter, index) => (
        <div
          key={index}
          className="flex flex-col items-center  text-center"
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
  <div className="py-10 m-5">
    
      <PropertyListings listings={SAMPLE_DATA} />
    </div>
  
</section>
<div className=" flex justify-center items-center ">
<div>
<p className="text-[#6F6F6F] font-[400] text-[14px] mb-4">Continue exploring short let houses</p>
<div className="mx-auto flex items-center justify-center">
<button className="bg-[#730071] px-6 py-2 rounded-md text-white ">Shop Now</button>
</div>

              
            
</div>
</div>

    </div>
  )
}

export default Home