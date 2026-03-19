import React from 'react';
import { NavLink } from 'react-router-dom';
import { userIcons } from '@/assets';
import { useNavigate } from 'react-router-dom';

const {
  messagePng: messageIcon,
  like: supportIcon,
  notifications: notificationIcon,
} = userIcons;

interface IconNavigationProps {
  isHostMode: boolean;
  onToggleHostMode: () => void;
  isAuthenticated: boolean;
}

const IconNavigation: React.FC<IconNavigationProps> = ({ isHostMode, onToggleHostMode, isAuthenticated }) => {
  const iconNavItems = [
    { icon: messageIcon, label: 'Message', route: '/message' },
    { icon: supportIcon, label: 'Support', route: '/support' },
    { icon: notificationIcon, label: 'Notifications', route: '/notification' },
  ];

  const navigate = useNavigate();

  const handleHostToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    onToggleHostMode();
  };

  return (
    <div className="flex items-center gap-6">
      {iconNavItems.map((item, index) => (
        <NavLink
          to={item.route}
          key={index}
          className={({ isActive }) =>
            `flex flex-col cursor-pointer items-center transition-colors ${
              isActive
                ? 'text-[#1d5c5c] font-bold'
                : 'text-[#999999] text-[14px] hover:text-[#1d5c5c]'
            }`
          }
        >
          <img src={item.icon} alt={`${item.label} Icon`} className="w-[20px] h-[20px]" />
          <span className="text-[14px] cursor-pointer">{item.label}</span>
        </NavLink>
      ))}

      {/* Minimalistic Switch Mode Button */}
      <button
        onClick={handleHostToggle}
        className={`
          text-[13px] font-medium px-4 py-1.5 
          rounded-full
          transition-all duration-200
          whitespace-nowrap
          border
          ${
            isHostMode
              ? 'bg-[#1d5c5c] text-white border-[#1d5c5c] hover:bg-[#164747]'
              : 'bg-white text-[#1d5c5c] border-[#1d5c5c] hover:bg-[#1d5c5c]/5'
          }
        `}
      >
        {isHostMode ? 'Switch to Guest' : 'Switch to Host'}
      </button>
    </div>
  );
};

export default IconNavigation;