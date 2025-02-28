import messageIcon from "../../assets/icons/message.png"
import supportIcon from "../../assets/icons/like.png"
import notificationIcon from "../../assets/icons/notifications.png"
import profileIcon from "../../assets/icons/Profile.png"
import humburger from "../../assets/icons/hamburger.png"

import React from "react"

const Header: React.FC = () => {
    return (
        <section className="overflow-hidden w-full">
            <header className="w-full border-b border-b-[#CCCCCC80]/50 bg-white">
                {/* Navigation Bar */}
                <nav className="flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-3">
                    {/* Logo */}
                    <div className="w-auto">
                        <h1 className="font-bold text-[20px] text-[#730071]">Shotletapp.ng</h1>
                    </div>

                    {/* Search Input */}
                    <div className="flex-grow max-w-[500px]">
                        <input 
                            type="text" 
                            className="w-full h-[48px] border border-[#CCCCCC99]/60 rounded-[12px] px-4 text-[14px]" 
                            placeholder="Search"
                        />
                    </div>

                    {/* Icons Section */}
                    <div className="w-auto flex flex-row gap-6 py-3">
                        <div className="flex flex-col items-center">
                            <img src={messageIcon} alt="Message Icon" className="w-[20px] h-[20px]" />
                            <p className="text-[14px] text-[#999999]">Message</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={supportIcon} alt="supportIcon" className="w-[20px] h-[20px]" />
                            <p className="text-[14px] text-[#999999]">Support</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={notificationIcon} alt="notificationIcon" className="w-[20px] h-[20px]" />
                            <p className="text-[14px] text-[#999999]">Notifications</p>
                        </div>
                        <div className="w-[28px] border-l border-[#CCCCCC]/30"></div>
                        <div className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-3 px-2">
                            <img src={humburger} alt="humburger Icon" className="w-[18px] h-[10px]" />
                            <img src={profileIcon} alt="Profile Icon" className="w-[32px] h-[32px]" />
                        </div>
                    </div>
                </nav>

                {/* Navigation Menu */}
                <div className="px-4 md:px-8 py-4 overflow-x-auto">
                    <div className="flex items-center gap-4 whitespace-nowrap">
                        <p className="text-[14px] font-medium text-[#999999] cursor-pointer hover:text-[#730071]">Dashboard</p>
                        <p className="text-[14px] font-medium text-[#999999] cursor-pointer hover:text-[#730071]">Discover</p>
                        <p className="text-[14px] font-medium text-[#999999] cursor-pointer hover:text-[#730071]">My Bookings</p>
                        <p className="text-[14px] font-medium text-[#999999] cursor-pointer hover:text-[#730071]">Saved Listings</p>
                        <p className="text-[14px] font-medium text-[#999999] cursor-pointer hover:text-[#730071]">Payments</p>
                    </div>
                </div>
            </header>
        </section>
    )
}

export default Header
