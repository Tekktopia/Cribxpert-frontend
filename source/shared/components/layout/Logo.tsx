import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  showIcon?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ showIcon = true, className = '' }) => {
  return (
    <Link to="/" className={`flex items-center justify-center ${className}`}>
      {showIcon && (
        <img
          src="/CribXpert.svg"
          alt="cribxpert logo"
          className="w-[35px] h-[35px] mr-[10px]"
        />
      )}
      <h1 className="font-bold text-[20px] text-[#1d5c5c]">CribXpert</h1>
    </Link>
  );
};

export default Logo;
