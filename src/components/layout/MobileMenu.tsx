import React from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import AuthButtons from './AuthButtons';
import UserProfileDropdown from './UserProfileDropdown';
import messageIcon from '@/assets/icons/message.png';
import supportIcon from '@/assets/icons/like.png';
import notificationIcon from '@/assets/icons/notifications.png';

interface User {
  _id?: string;
  email?: string;
  fullName?: string;
  profileImage?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
  user?: User | null;
  showProfileMenu: boolean;
  onToggleProfileMenu: () => void;
  onCloseProfileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isAuthenticated,
  onClose,
  user,
  showProfileMenu,
  onToggleProfileMenu,
  onCloseProfileMenu,
}) => {
  const iconNavItems = [
    { icon: messageIcon, label: 'Message', route: '/message' },
    { icon: supportIcon, label: 'Support', route: '/support' },
    { icon: notificationIcon, label: 'Notifications', route: '/notification' },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden w-full bg-white shadow-lg border-t border-gray-200 z-40">
      <div className="py-2 max-h-[80vh] overflow-y-auto">
        {/* User Profile Section for authenticated users */}
        {isAuthenticated && user && (
          <div className="px-4 py-3 border-b border-gray-100">
            <UserProfileDropdown
              user={user}
              showProfileMenu={showProfileMenu}
              onToggleMenu={onToggleProfileMenu}
              onCloseMenu={onCloseProfileMenu}
              isMobile
            />
          </div>
        )}

        {/* Main Navigation */}
        <MainNavigation isMobile onLinkClick={onClose} />

        {/* Icon Navigation Items */}
        {iconNavItems.map((item, index) => (
          <div key={`icon-${index}`} className="border-b border-gray-100">
            <Link
              to={item.route}
              className="px-4 py-3.5 block text-sm font-normal text-gray-800 hover:bg-gray-50 hover:text-[#1d5c5c] transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          </div>
        ))}

        {/* Authentication buttons for non-authenticated users */}
        {!isAuthenticated && (
          <div className="border-b border-gray-100 p-4">
            <AuthButtons isMobile onLinkClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
