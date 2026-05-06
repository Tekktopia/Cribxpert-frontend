import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  showIcon?: boolean;
  className?: string;
  isWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ showIcon = true, className = '', isWhite = false }) => {
  return (
    <Link to="/" className={`flex items-center justify-center ${className}`}>
      {showIcon && (
        <img
          src="/CribXpert.svg"
          alt="cribxpert logo"
          className={`w-[35px] h-[35px] mr-[10px] ${isWhite ? 'brightness-0 invert' : ''}`}
        />
      )}
      <h1 className={`font-bold text-[22px] tracking-tight font-sans ${isWhite ? 'text-white' : 'text-primary'}`}>Cribxpert</h1>
    </Link>
  );
};

export default Logo;
