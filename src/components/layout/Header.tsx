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

  // Icon navigation items
  const iconNavItems = [
    { icon: messageIcon, label: 'Message', route: '' },
    { icon: supportIcon, label: 'Support', route: '/support' },
    { icon: notificationIcon, label: 'Notifications', route: '/notification' },
  ];

  // Main navigation links
  const navLinks = [
    { label: 'Dashboard', route: '/' },
    { label: 'Discover', route: '/discover' },
    { label: 'My Bookings', route: '/my-bookings' },
    { label: 'Saved Listings', route: '/saved-listings' },
    { label: 'Payments', route: '/payments' },
  ];

  return (
    <section className="overflow-hidden w-full">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-b-[#CCCCCC80]/50 bg-white shadow-sm">
        <div className="container mx-auto">
          {/* Navigation Bar */}
          <nav className="hidden md:flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-3">
            {/* Logo */}
            <div className="w-auto">
              <Link to={'/'}>
                <h1 className="font-bold text-[20px] text-[#730071]">
                  CribXpert
                </h1>
              </Link>
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
              {iconNavItems.map((item, index) => (
                <Link
                  to={item.route}
                  key={index}
                  className="flex flex-col items-center"
                >
                  <img
                    src={item.icon}
                    alt={`${item.label} Icon`}
                    className="w-[20px] h-[20px]"
                  />
                  <span className="text-[14px] text-[#999999] cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="w-[28px] border-l border-[#CCCCCC]/30"></div>
              <div className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-3 px-2 relative">
                <a href="/profile">
                  {' '}
                  <img
                    src={humburger}
                    alt="humburger Icon"
                    className="w-[18px] h-[10px]"
                  />
                </a>

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
            <Link to={'/'}>
              <h1 className="font-bold text-[20px] text-[#730071]">
                CribXpert
              </h1>
            </Link>

            {isOpen ? (
              <BiX className="block md:hidden text-4xl" onClick={toggleMenu} />
            ) : (
              <BiMenu
                className="block md:hidden text-4xl"
                onClick={toggleMenu}
              />
            )}
          </div>

          {/* Navigation Menu for Desktop */}
          <div className="hidden md:flex px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.route}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#730071] font-bold'
                      : 'text-[#999999] text-[14px] font-medium cursor-pointer'
                  }
                >
                  {link.label}
                </NavLink>
              ))}
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
              <div className="fixed top-0 left-0 w-full bg-white text-black z-50 md:hidden overflow-y-auto">
                {/* Purple header */}
                <div className="bg-[#730071] flex justify-between items-center w-full p-4 text-white">
                  <Link to={'/'}>
                    <h1 className="text-base font-medium">CribXpert</h1>
                  </Link>

                  <BiX className="text-2xl" onClick={toggleMenu} />
                </div>

                {/* Menu items */}
                <div className="py-2">
                  <ul className="flex flex-col">
                    {navLinks.map((link, index) => (
                      <li key={index} className="border-b border-gray-100">
                        <Link
                          to={link.route}
                          className="px-4 py-2 block text-sm font-normal text-gray-800"
                          onClick={toggleMenu}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}

                    {iconNavItems.map((item, index) => (
                      <li
                        key={`icon-${index}`}
                        className="border-b border-gray-100"
                      >
                        <Link
                          to={item.route}
                          className="px-4 py-3.5 block text-sm font-normal text-gray-800"
                          onClick={toggleMenu}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
