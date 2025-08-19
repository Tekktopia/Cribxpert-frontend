import React from 'react';
import { NavLink } from 'react-router-dom';

interface MainNavigationProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  isMobile = false,
  onLinkClick,
}) => {
  const navLinks = [
    { label: 'Dashboard', route: '/' },
    { label: 'Discover', route: '/discover' },
    { label: 'My Bookings', route: '/my-bookings' },
    { label: 'Saved Listings', route: '/saved-listings' },
    { label: 'Payments', route: '/payments' },
    { label: 'My Listing', route: '/my-listing' },
  ];

  if (isMobile) {
    return (
      <ul className="flex flex-col">
        {navLinks.map((link, index) => (
          <li key={index} className="border-b border-gray-100">
            <NavLink
              to={link.route}
              className={({ isActive }) =>
                `px-4 py-2 block text-sm font-normal transition-colors ${
                  isActive
                    ? 'text-[#1d5c5c] font-bold bg-[#1d5c5c]/5'
                    : 'text-[#999999] hover:text-[#1d5c5c] hover:bg-gray-50'
                }`
              }
              onClick={onLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.route}
          end
          className={({ isActive }) =>
            `transition-colors ${
              isActive
                ? 'text-[#1d5c5c] font-bold'
                : 'text-[#999999] text-[14px] font-medium cursor-pointer hover:text-[#1d5c5c]'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default MainNavigation;
