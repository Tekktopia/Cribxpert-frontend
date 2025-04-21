import messageIcon from '@/assets/icons/message.png';
import supportIcon from '@/assets/icons/like.png';
import notificationIcon from '@/assets/icons/notifications.png';
import profileIcon from '@/assets/icons/Profile.png';
import humburger from '@/assets/icons/hamburger.png';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <section className="overflow-hidden w-full">
      <header className="w-full border-b border-b-[#CCCCCC80]/50 bg-white">
        {/* Navigation Bar */}
        <nav className="hidden md:flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-3">
          {/* Logo */}
          <div className="w-auto">
            <h1 className="font-bold text-[20px] text-[#730071]">
              Shotletapp.ng
            </h1>
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
              <img
                src={messageIcon}
                alt="Message Icon"
                className="w-[20px] h-[20px]"
              />
              <Link to="" className="text-[14px] text-[#999999] cursor-pointer">
                Message
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={supportIcon}
                alt="supportIcon"
                className="w-[20px] h-[20px]"
              />
              <Link to="" className="text-[14px] text-[#999999] cursor-pointer">
                Support
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={notificationIcon}
                alt="notificationIcon"
                className="w-[20px] h-[20px]"
              />
              <Link to="" className="text-[14px] text-[#999999] cursor-pointer">
                Notifications
              </Link>
            </div>
            <div className="w-[28px] border-l border-[#CCCCCC]/30"></div>
            <div className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-3 px-2 relative">
              <img
                src={humburger}
                alt="humburger Icon"
                className="w-[18px] h-[10px]"
              />
              <img
                src={profileIcon}
                alt="Profile Icon"
                className="w-[32px] h-[32px]"
              />
              <div className="absolute top-[45px] p-4 shadow-lg bg-white">
                <button
                  className="text-[14px] text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center p-4">
          <h1 className="font-bold text-[20px] text-[#730071]">
            Shotletapp.ng
          </h1>
          {isOpen ? (
            <BiX className="block md:hidden text-4xl" onClick={toggleMenu} />
          ) : (
            <BiMenu className="block md:hidden text-4xl" onClick={toggleMenu} />
          )}
        </div>

        {/* Navigation Menu for Desktop */}
        <div className="hidden md:flex px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#730071] font-bold'
                  : 'text-[#999999] text-[14px] font-medium cursor-pointer'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/discovery"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#730071] font-bold'
                  : 'text-[#999999] text-[14px] font-medium cursor-pointer'
              }
            >
              Discover
            </NavLink>
            <NavLink
              to="/my-booking"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#730071] font-bold'
                  : 'text-[#999999] text-[14px] font-medium cursor-pointer'
              }
            >
              My Bookings
            </NavLink>
            <NavLink
              to="/saved-listing"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#730071] font-bold'
                  : 'text-[#999999] text-[14px] font-medium cursor-pointer'
              }
            >
              Saved Listings
            </NavLink>
            <NavLink
              to="/payments"
              className="text-[14px] font-medium text-[#999999] cursor-pointer hover:text-[#730071]"
            >
              Payments
            </NavLink>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Side Drawer Menu */}
            <div className="fixed top-0 left-0 w-[80%] bg-white text-black z-50 md:hidden">
              <div className="bg-[#730071] flex justify-between items-center w-full mb-5 text-white p-2">
                <h1 className="text-xl font-bold">Shotletapp.ng</h1>
                <BiX className="text-4xl" onClick={toggleMenu} />
              </div>
              <ul className="flex flex-col gap-4 p-4">
                {[
                  'Dashboard',
                  'Discover',
                  'My Bookings',
                  'Saved Listing',
                  'Payments',
                  'Message',
                  'Support',
                  'Notifications',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="opacity-80 hover:opacity-100 transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </header>
    </section>
  );
};

export default Header;
