import { BiMenu, BiX } from 'react-icons/bi';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
    const currentScrollY = window.scrollY;
    
    // Transparency logic
    setIsScrolled(currentScrollY > 50);

    if (isOpen) return;

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
        className={`fixed w-full left-0 right-0 z-50 transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrolled || !isHomePage 
            ? 'glass-morphism shadow-premium py-0' 
            : 'bg-transparent border-none py-2'
        }`}
      >
        <div className="content-container">
          {/* Navigation Bar */}
          <nav className="hidden md:flex flex-wrap items-center justify-between gap-4 py-3">
            {/* Logo */}
            <div className="w-auto">
              <Logo isWhite={!isScrolled && isHomePage} />
            </div>

            {/* Search Input */}
            <SearchInput isWhite={!isScrolled && isHomePage} />

            {/* Action Section */}
            <div className="w-full lg:w-auto flex flex-row items-center gap-6 py-3">
              {/* Icons Section - Restricted to authenticated users */}
              {isAuthenticated && (
                <>
                  <IconNavigation
                    isHostMode={isHostMode}
                    onToggleHostMode={toggleHostMode}
                    isAuthenticated={isAuthenticated}
                    isWhite={!isScrolled && isHomePage}
                  />
                  <div className={`w-[28px] border-l h-6 ${!isScrolled && isHomePage ? 'border-white/20' : 'border-neutral-100'}`}></div>
                </>
              )}

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
                <AuthButtons isWhite={!isScrolled && isHomePage} />
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center p-4">
            <Logo showIcon={true} />

            {/* Menu Toggle Button */}
            {isOpen ? (
              <BiX className="text-4xl" onClick={toggleMenu} />
            ) : (
              <BiMenu className="text-4xl" onClick={toggleMenu} />
            )}
          </div>

          {/* Navigation Menu for Desktop - ONLY for authenticated users */}
          {isAuthenticated && (
            <div className={`hidden md:flex py-4 transition-all duration-500 ${
              isScrolled || !isHomePage ? 'border-t border-neutral-100/50' : 'border-t border-white/20'
            }`}>
              <MainNavigation isHostMode={isHostMode} />
            </div>
          )}

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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // Adjusted height based on whether the sub-nav is visible
  return <div className={`transition-all duration-300 ${isAuthenticated ? 'h-[140px] md:h-[200px] lg:h-[135px]' : 'h-[70px] md:h-[80px] lg:h-[80px]'}`}></div>;
};

export default Header;
