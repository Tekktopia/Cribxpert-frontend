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
          className="w-full py-2 text-center text-[14px] text-[#1D5C5C] border border-[#1D5C5C] rounded-md font-medium hover:bg-[#1D5C5C] hover:text-white transition-colors"
          onClick={onLinkClick}
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="w-full py-2 text-center text-[14px] text-white bg-[#1D5C5C] rounded-md font-medium hover:bg-[#145252] transition-colors"
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
        className="text-[14px] text-[#1D5C5C] font-medium hover:text-[#145252] transition-colors"
      >
        Login
      </Link>
      <Link
        to="/sign-up"
        className="px-4 py-2 text-[14px] text-white bg-[#1D5C5C] rounded-md font-medium hover:bg-[#145252] transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
