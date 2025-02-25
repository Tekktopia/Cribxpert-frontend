import heroImage from "../../assets/images/hero-image.jpeg"
import messageIcon from "../../assets/icons/message.png"
import supportIcon from "../../assets/icons/like.png"
import notificationIcon from "../../assets/icons/notifications.png"
import profileIcon from "../../assets/icons/Profile.png"
import humburger from "../../assets/icons/hamburger.png"
import { SAMPLE_DATA,Filter } from "../../constants/data"

import React from "react"
import PropertyListings from "../PropertyListing"

const Header: React.FC = () => {
    return(
<section>
<header className="w-full h-full border-b border-b-[#CCCCCC80]/50  ">
        <nav className="flex flex-row justify-between gap-5 items-center bg-white ">
            <div className="w-[138px] h-[26px]">
<h1 className="font-[700] text-[20px] text-[#730071] ml-5 ">Shotletapp.ng</h1>
            </div>
            <div className="mt-7">
            <input type="text" className="w-[601px] h-[48px]  border border-[#CCCCCC99]/60 rounded-[12px]" placeholder="Search"/>
            </div>
          
          
           
            <div className="w-[433px] h-[45px] flex flex-row gap-8 py-3">
                
            <div className="w-[66px] h-[45px] flex flex-col items-center">
                        <img src={messageIcon} alt="Message Icon" className="w-[20px] h-[20px]" />
                        <p className="font-[400] text-[16px] text-[#999999]">Message</p>
                    </div>
                    <div className="w-[66px] h-[45px] flex flex-col items-center">
                    <img src={supportIcon} alt="supportIcon" className="w-[20px] h-[20px]" />
                    <p className="font-[400] text-[16px] text-[#999999]">Support</p>
                    </div>
                    <div className="w-[66px] h-[45px] flex flex-col items-center">
                    <img src={notificationIcon} alt="notificationIcon" className="w-[20px] h-[20px]" />
                    <p className="font-[400] text-[16px] text-[#999999]">Notifications</p>
                    </div>
                    
                        <div className="w-[28px] border-l border-[#CCCCCC]/30">
                        </div>
                        <div className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-5 justify-center">
                        <img src={humburger} alt="humburger Icon" className="w-[18px] h-[10px]"/>
                        <img src={profileIcon} alt="Profle Icon" className="w-[32px] h-[32px]" />
                        </div>
                   
                   

                </div>

        </nav>
        <div className="px-12 py-6">
          <div className="flex items-center gap-6">
            <p className="text-[16px] font-[400] text-[#999999]">Dashboard</p>
            <p className="text-[16px] font-[400] text-[#999999]">Discover</p>
            <p className="text-[16px] font-[400] text-[#999999]">My Bookings</p>
            <p className="text-[16px] font-[400] text-[#999999]">Saved Listings</p>
            <p className="text-[16px] font-[400] text-[#999999]">Payments</p>
          </div>
        </div>
      
    </header>
    <section className="relative p-8">
        <div
          className="w-[1280px] h-[598px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-[39px] max-w-xl font-bold text-[#E6E6E6] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h1>
            <p className="text-sm font-medium text-[#E6E6E6] mb-6">
              Find Everything You Love, at Prices You’ll Adore – Shop Now and Save Big.
            </p>
            <button className="bg-[#730071] px-6 py-2 rounded-md text-white text-sm">
              Shop Now
            </button>


</div>
<div className=" bg-[#8b2b89] w-full h-[94px] bottom-0 left-0 absolute">
    <div className="w-full h-[62px] px-8 py-2 flex flex-row justify-between items-center ">
<div className="flex flex-col gap-2">
    <label htmlFor="Filter Parameter 1" className="text-[#E6E6E6] font-[400] text-[15px] mt-5">Filter Parameter 1</label>
<select name="filter-1" id="filter-1" className="w-[253px] h-[36px]">
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="2">2</option>2
</select>
</div>
<div className="flex flex-col gap-2">
    <label htmlFor="Filter Parameter 2" className="text-[#E6E6E6] font-[400] text-[15px] mt-5">Filter Parameter 2</label>
    <select name="filter-2" id="filter-2"  className="w-[253px] h-[36px]">
    <option value="">Select</option>
    <option value="3">3</option>
    <option value="4">4</option>
    </select>
</div>
<div className="flex flex-col gap-2">
    <label htmlFor="Filter Parameter 1" className="text-[#E6E6E6] font-[400] text-[15px] mt-5">Filter Parameter 3</label>
<select name="filter-1" id="filter-3"  className="w-[253px] h-[36px] border border-[#D0D5DD4D]/30">
    <option value="">Select</option>
    <option value="5">5</option>
    <option value="6">6</option>
</select>
</div>
<div className="flex flex-col gap-2">
    <label htmlFor="Filter Parameter 1" className="text-[#E6E6E6] font-[400] text-[15px] mt-5">Filter Parameter 4</label>
<select name="filter-1" id="filter-4"  className="w-[253px] h-[36px]">
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="1">1</option>2
</select>
</div>
    </div>
            
          </div>
        </div>
      </section>
      <section className="py-10">
  {/* Filters Section */}
  <div className="overflow-x-auto w-full max-w-[1280px] ml-5">
    <div className="flex flex-wrap md:flex-nowrap items-center gap-8">
      {Filter.map((filter, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center"
        >
          <img
            src={filter.image}
            alt={filter.name}
            className="w-9 h-9 object-contain"
          />
          <p className="text-sm font-medium text-gray-700">{filter.name}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Property Listings Section */}
  <div className="py-10">
    
      <PropertyListings listings={SAMPLE_DATA} />
    </div>
  
</section>
<div className="py-20 flex justify-center items-center">
<div className="w-[231px] h-[76px]">
<p className="text-[#6F6F6F] font-[400] text-[14px] mb-4">Continue exploring short let houses</p>
<button className="bg-[#730071] px-6 py-2 rounded-md text-white ">
              Shop Now
            </button>
</div>
</div>
</section>
    )


}
export default Header