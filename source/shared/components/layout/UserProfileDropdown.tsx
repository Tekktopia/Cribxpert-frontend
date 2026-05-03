import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/features/auth/authSlice';
import { hamburger } from '@/assets';

interface User {
  _id?: string;
  email?: string;
  fullName?: string;
  profileImage?: string;
}

interface UserProfileDropdownProps {
  user: User | null;
  showProfileMenu: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  isMobile?: boolean;
  isHostMode?: boolean;
  onToggleHostMode?: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  showProfileMenu,
  onToggleMenu,
  onCloseMenu,
  isMobile = false,
  isHostMode = false,
  onToggleHostMode,
}) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onCloseMenu();
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu, onCloseMenu]);

  const handleLogout = () => {
    dispatch(clearUser());
    onCloseMenu();
    window.location.href = '/login';
  };

  if (isMobile) {
    return (
      <div className="flex flex-col w-full gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-full bg-[#1D5C5C] text-white flex items-center justify-center text-lg font-medium">
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <p className="font-medium text-sm">
                {user?.fullName || user?.email || 'Account'}
              </p>
              <p className="text-gray-500 text-xs truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>

          {/* Switch to Host/Guest button for mobile */}
          {onToggleHostMode && (
            <button
              onClick={onToggleHostMode}
              className={`text-[12px] font-medium px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${isHostMode
                ? 'bg-[#1d5c5c] text-white border-[#1d5c5c]'
                : 'bg-white text-[#1d5c5c] border-[#1d5c5c]'
                }`}
            >
              {isHostMode ? 'Switch to Guest' : 'Switch to Host'}
            </button>
          )}
        </div>

        {/* ✅ Logout button — visible only on mobile */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left px-1 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="w-[82px] h-[40px] rounded-md border border-[#CCCCCC] flex items-center gap-3 px-2 cursor-pointer hover:border-[#1d5c5c] transition-colors"
        onClick={onToggleMenu}
      >
        <img
          src={hamburger}
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

      {showProfileMenu && (
        <div className="absolute right-0 top-[45px] w-[220px] p-2 shadow-lg bg-white rounded-md z-50 border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-medium text-sm">
              {user?.fullName || user?.email || 'Account'}
            </p>
            <p className="text-gray-500 text-xs truncate">
              {user?.email || ''}
            </p>
          </div>

          <ul className="py-2">
            <li>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={onCloseMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={onCloseMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/my-bookings"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={onCloseMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={onCloseMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help Center
              </Link>
            </li>

            {onToggleHostMode && (
              <li className="border-t border-gray-100 mt-2 pt-2">
                <button
                  className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => {
                    onToggleHostMode();
                    onCloseMenu();
                  }}
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {isHostMode ? 'Switch to Guest' : 'Switch to Host'}
                </button>
              </li>
            )}

            <li className="border-t border-gray-100 mt-2 pt-2">
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md transition-colors"
                onClick={handleLogout}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;