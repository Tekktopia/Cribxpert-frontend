import messageIcon from '@/assets/icons/message.png';
import supportIcon from '@/assets/icons/like.png';
import notificationIcon from '@/assets/icons/notifications.png';
import humburger from '@/assets/icons/hamburger.png';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  clearUser,
} from '@/features/auth/authSlice';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Get authentication state and user data from Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Control header visibility based on scroll direction
  const controlNavbar = useCallback(() => {
    // For mobile devices - if menu is open, don't hide header
    if (isOpen) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY <= 100) {
      // Always show at top of page
      setVisible(true);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling UP - show header
      setVisible(true);
    } else if (currentScrollY > lastScrollY) {
      // Scrolling DOWN - hide header
      setVisible(false);
    }

    // Update scroll position
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = '/login';
  };

  // Icon navigation items
  const iconNavItems = [
    { icon: messageIcon, label: 'Message', route: '/message' },
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
      <header
        className={`fixed w-full left-0 right-0 z-50 border-b border-b-[#CCCCCC80]/50 bg-white shadow-sm transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="lg:container mx-auto">
          {/* Navigation Bar */}
          <nav className="hidden md:flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-3">
            {/* Logo */}
            <div className="w-auto">
              <Link to={'/'} className="flex items-center justify-center">
                <img
                  src="/CribXpert.svg"
                  alt="cribxpert logo"
                  className="w-[35px] h-[35px] mr-[10px]"
                />
                <h1 className="font-bold text-[20px] text-[#1d5c5c]">
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
            <div className="w-full lg:w-auto justify-between flex flex-row gap-6 py-3">
              <div className="flex items-center gap-6">
                {iconNavItems.map((item, index) => (
                  <NavLink
                    to={item.route}
                    key={index}
                    className={({ isActive }) =>
                      `flex flex-col cursor-pointer items-center ${isActive ? 'text-[#1d5c5c] font-bold' : 'text-[#999999] text-[14px]  '}`
                    }
                  >
                    <img
                      src={item.icon}
                      alt={`${item.label} Icon`}
                      className="w-[20px] h-[20px]"
                    />
                    <span className="text-[14px] cursor-pointer">
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </div>

              <div className="w-[28px] border-l border-[#CCCCCC]/30"></div>

              {/* Conditional rendering based on authentication status */}
              {isAuthenticated ? (
                // Authenticated: Show Profile Menu
                <div className="relative">
                  <div
                    className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-3 px-2 cursor-pointer"
                    onClick={toggleProfileMenu}
                  >
                    <img
                      src={humburger}
                      alt="hamburger Icon"
                      className="w-[18px] h-[10px]"
                    />
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-[32px] h-[32px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[32px] h-[32px] rounded-full bg-[#1D5C5C] text-white flex items-center justify-center text-sm font-medium">
                        {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>

                  {/* Dropdown Menu - only shown when showProfileMenu is true */}
                  {showProfileMenu && (
                    <div className="absolute right-0 top-[45px] w-[220px] p-2 shadow-lg bg-white rounded-md z-50">
                      {/* User Info Section - with actual user data */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-sm">
                          {user?.fullName
                            ? `${user.fullName}`
                            : user?.email || 'Account'}
                        </p>
                        <p className="text-gray-500 text-xs truncate">
                          {user?.email || ''}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-bookings"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            My Bookings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/help"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Help Center
                          </Link>
                        </li>

                        {/* Logout with divider */}
                        <li className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
                            onClick={handleLogout}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                // Not authenticated: Show login/signup links
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-[14px] text-[#1D5C5C] font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="px-4 py-2 text-[14px] text-white bg-[#1D5C5C] rounded-md font-medium hover:bg-[#5e005d] transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center p-4">
            <Link to={'/'}>
              <h1 className="font-bold text-[20px] text-[#1d5c5c]">
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
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#1d5c5c] font-bold'
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
            <div className="md:hidden w-full bg-white shadow-lg border-t border-gray-200 z-40">
              {/* Menu items */}
              <div className="py-2 max-h-[80vh] overflow-y-auto">
                <ul className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <li key={index} className="border-b border-gray-100">
                      <NavLink
                        to={link.route}
                        className={({ isActive }) =>
                          `px-4 py-2 block text-sm font-normal text-gray-800 ${
                            isActive
                              ? 'text-[#1d5c5c] font-bold'
                              : 'text-[#999999] text-[14px] font-medium '
                          }`
                        }
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </NavLink>
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

                  {/* Authentication buttons for mobile */}
                  {!isAuthenticated && (
                    <li className="border-b border-gray-100 p-4">
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/login"
                          className="w-full py-2 text-center text-[14px] text-[#1D5C5C] border border-[#1D5C5C] rounded-md font-medium"
                        >
                          Login
                        </Link>
                        <Link
                          to="/sign-up"
                          className="w-full py-2 text-center text-[14px] text-white bg-[#1D5C5C] rounded-md font-medium"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </section>
  );
};

// Create a header spacer component to use where needed
export const HeaderSpacer: React.FC = () => {
  return <div className="h-[40px] md:h-[200px] lg:h-[125px]"></div>;
};

export default Header;
