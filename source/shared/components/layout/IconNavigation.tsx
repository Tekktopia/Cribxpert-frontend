import React from 'react';
import { NavLink } from 'react-router-dom';
import { userIcons } from '@/assets';

const {
  messagePng: messageIcon,
  like: supportIcon,
  notifications: notificationIcon,
} = userIcons;

const IconNavigation: React.FC = () => {
  const iconNavItems = [
    { icon: messageIcon, label: 'Message', route: '/message' },
    { icon: supportIcon, label: 'Support', route: '/support' },
    { icon: notificationIcon, label: 'Notifications', route: '/notification' },
  ];

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
          <img
            src={item.icon}
            alt={`${item.label} Icon`}
            className="w-[20px] h-[20px]"
          />
          <span className="text-[14px] cursor-pointer">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default IconNavigation;
