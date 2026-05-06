import React from 'react';
import { Link } from 'react-router-dom';

interface AuthButtonsProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
  isWhite?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isMobile = false,
  onLinkClick,
  isWhite = false,
}) => {
  if (isMobile) {
    // Mobile menu items are always on a light background in this design
    return (
      <div className="flex flex-col gap-2">
        <Link
          to="/login"
          className="w-full py-2 text-center text-[14px] text-primary border border-primary rounded-md font-medium hover:bg-primary hover:text-white transition-colors"
          onClick={onLinkClick}
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="w-full py-2 text-center text-[14px] text-white bg-primary rounded-md font-medium hover:bg-hoverColor transition-colors"
          onClick={onLinkClick}
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className={`text-[14px] font-medium transition-colors ${isWhite ? 'text-white hover:text-secondary' : 'text-primary hover:text-hoverColor'}`}
      >
        Login
      </Link>
      <Link
        to="/sign-up"
        className={`px-6 py-2 text-[14px] rounded-full font-bold transition-all duration-300 ${isWhite ? 'bg-white text-primary hover:bg-secondary hover:text-white shadow-premium' : 'bg-primary text-white hover:bg-hoverColor'}`}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
