import { BiMenu, BiX } from 'react-icons/bi';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';

// Import our new components
import Logo from './Logo';
import SearchInput from './SearchInput';
import IconNavigation from './IconNavigation';
import UserProfileDropdown from './UserProfileDropdown';
import AuthButtons from './AuthButtons';
import MainNavigation from './MainNavigation';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isHostMode, setIsHostMode] = useState(false);
  const navigate = useNavigate();

  const toggleHostMode = () => {
    setIsHostMode(prev => {
      const next = !prev;
      navigate(next ? '/my-listing' : '/');
      return next;
    });
  };

  // Get authentication state and user data from Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
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
  return (
    <section className="overflow-hidden w-full">
      <header
        className={`fixed w-full left-0 right-0 z-50 border-b border-b-[#CCCCCC80]/50 bg-white shadow-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="lg:container mx-auto">
          {/* Navigation Bar */}
          <nav className="hidden md:flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-3">
            {/* Logo */}
            <div className="w-auto">
              <Logo />
            </div>

            {/* Search Input */}
            <SearchInput />

            {/* Icons Section */}
            <div className="w-full lg:w-auto justify-between flex flex-row gap-6 py-3">
              <IconNavigation
                isHostMode={isHostMode}
                onToggleHostMode={toggleHostMode}
                isAuthenticated={isAuthenticated}
              />
              <div className="w-[28px] border-l border-[#CCCCCC]/30"></div>

              {/* Conditional rendering based on authentication status */}
              {isAuthenticated ? (
                <UserProfileDropdown
                  user={user}
                  showProfileMenu={showProfileMenu}
                  onToggleMenu={toggleProfileMenu}
                  onCloseMenu={closeProfileMenu}
                  isHostMode={isHostMode}
                  onToggleHostMode={toggleHostMode}
                />
              ) : (
                <AuthButtons />
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center p-4">
            <Logo showIcon={false} />

            {/* Menu Toggle Button */}
            {isOpen ? (
              <BiX className="text-4xl" onClick={toggleMenu} />
            ) : (
              <BiMenu className="text-4xl" onClick={toggleMenu} />
            )}
          </div>

          {/* Navigation Menu for Desktop */}
          <div className="hidden md:flex px-4 md:px-8 py-4">
            <MainNavigation isHostMode={isHostMode} />
          </div>

          {/* Mobile Menu with Profile/Auth */}
          <MobileMenu
            isOpen={isOpen}
            isAuthenticated={isAuthenticated}
            onClose={closeMobileMenu}
            user={user}
            showProfileMenu={showProfileMenu}
            onToggleProfileMenu={toggleProfileMenu}
            onCloseProfileMenu={closeProfileMenu}
            isHostMode={isHostMode}
            onToggleHostMode={toggleHostMode}
          />
        </div>
      </header>
    </section>
  );
};

// Create a header spacer component to use where needed
export const HeaderSpacer: React.FC = () => {
  return <div className="h-[60px] md:h-[200px] lg:h-[125px]"></div>;
};

export default Header;
