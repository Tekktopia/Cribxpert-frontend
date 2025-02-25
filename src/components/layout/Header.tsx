import heroImage from "../../assets/images/hero-image.jpeg"
import messageIcon from "../../assets/icons/message.png"
import supportIcon from "../../assets/icons/like.png"
import notificationIcon from "../../assets/icons/notifications.png"
import profileIcon from "../../assets/icons/Profile.png"
import humburger from "../../assets/icons/hamburger.png"

import React from "react"

const Header: React.FC = () => {
    return(
        <section>
        <header className="w-full border-b border-b-[#CCCCCC80]/50">
          <nav className="flex flex-wrap items-center justify-center md:justify-between gap-5 bg-white px-4 md:px-8 py-3">
            <div className="w-[138px] h-[26px]">
              <h1 className="font-[700] text-[20px] text-[#730071] ml-5">Shotletapp.ng</h1>
            </div>
            <div className="mt-7 flex-grow  max-w-[600px]">
              <input type="text" className="w-full h-[48px] border border-[#CCCCCC99]/60 rounded-[12px]" placeholder="Search" />
            </div>
            <div className="w-full md:w-auto flex flex-row gap-8 py-3 justify-center">
              <div className="flex flex-col items-center">
                <img src={messageIcon} alt="Message Icon" className="w-[20px] h-[20px]" />
                <p className="font-[400] text-[16px] text-[#999999]">Message</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={supportIcon} alt="supportIcon" className="w-[20px] h-[20px]" />
                <p className="font-[400] text-[16px] text-[#999999]">Support</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={notificationIcon} alt="notificationIcon" className="w-[20px] h-[20px]" />
                <p className="font-[400] text-[16px] text-[#999999]">Notifications</p>
              </div>
              <div className="w-[28px] border-l border-[#CCCCCC]/30"></div>
              <div className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-5 justify-center">
                <img src={humburger} alt="humburger Icon" className="w-[18px] h-[10px]" />
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
  
  

</section>
    )


}
export default Header