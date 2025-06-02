import React from 'react';

type StatusType = 'confirmed' | 'pending' | 'cancelled' | 'completed';

interface StatusButtonProps {
  status: StatusType;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  const statusStyles: Record<StatusType, string> = {
    confirmed: 'bg-[#E7F4EE] text-[#09974C]',
    pending: 'bg-[#FDF1E8] text-[#FFAD09]',
    cancelled: 'bg-[#FEEDEC] text-[#FF3B3B]',
    completed: 'bg-[#E8F8FD] text-[#140BC1]',
  };

  const labelMap: Record<StatusType, string> = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    completed: 'Completed',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold ${statusStyles[status]} transition-colors duration-300`}
    >
      {labelMap[status]}
    </button>
  );
};

export default StatusButton;
