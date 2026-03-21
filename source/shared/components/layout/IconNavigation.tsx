import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface IconNavigationProps {
  isHostMode: boolean;
  onToggleHostMode: () => void;
  isAuthenticated: boolean;
}

const IconNavigation: React.FC<IconNavigationProps> = ({ isHostMode, onToggleHostMode, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleHostToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    onToggleHostMode();
  };

  const iconNavItems = [
    {
      label: 'Message',
      route: '/message',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.833L3 20l1.167-4A7.96 7.96 0 013 12C3 7.582 7.03 4 12 4s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      label: 'Support',
      route: '/support',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414A7 7 0 105.05 18.364l1.414-1.414A5 5 0 1118.364 5.636z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        </svg>
      ),
    },
    {
      label: 'Notifications',
      route: '/notification',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {iconNavItems.map((item, index) => (
        <NavLink
          to={item.route}
          key={index}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 cursor-pointer transition-colors group ${isActive ? 'text-[#1d5c5c]' : 'text-[#999999] hover:text-[#1d5c5c]'
            }`
          }
        >
          {item.icon}
          <span className="text-[12px] font-medium">{item.label}</span>
        </NavLink>
      ))}
      <button
        onClick={handleHostToggle}
        className={`
    text-[13px] font-medium px-4 py-1.5 
    rounded-full transition-all duration-200
    whitespace-nowrap border
    ${isHostMode
            ? 'bg-[#1d5c5c] text-white border-[#1d5c5c]'
            : 'bg-white text-[#1d5c5c] border-[#1d5c5c]'
          }
    hover:text-hoverColor hover:border-hoverColor hover:bg-white
  `}
      >
        {isHostMode ? 'Switch to Guest' : 'Switch to Host'}
      </button>
    </div>
  );
};

export default IconNavigation;