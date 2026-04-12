import React from 'react';
import { Link } from 'react-router-dom';

interface AuthButtonsProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isMobile = false,
  onLinkClick,
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <Link
          to="/login"
          className="w-full py-2 text-center text-[14px] text-[#1D5C5C] border border-primary rounded-md font-medium hover:bg-hoverColor hover:text-white transition-colors"
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
    <div className="flex items-center gap-3">
      <Link
        to="/login"
        className="text-[14px] text-[#1D5C5C] font-medium hover:text-hoverColor transition-colors"
      >
        Login
      </Link>
      <Link
        to="/sign-up"
        className="px-4 py-2 text-[14px] text-white bg-primary rounded-md font-medium hover:bg-hoverColor transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
