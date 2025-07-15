import React from 'react';

type StatusType = string;
type ButtonType = 'details';

interface StatusButtonProps {
  status: StatusType;
  type?: ButtonType;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, type }) => {
  const statusStyles: Record<StatusType, string> = {
    confirmed: 'bg-[#E7F4EE] text-[#09974C]',
    pending: 'bg-[#FDF1E8] text-[#FFAD09]',
    cancelled: 'bg-[#FEEDEC] text-[#FF3B3B]',
    completed: 'bg-[#E8F8FD] text-[#140BC1]',
  };

  const buttonStyles: Record<StatusType, string> = {
    confirmed: 'bg-[#09974C] text-white',
    pending: 'bg-[#FFAD09] text-white',
    cancelled: 'bg-[#FF3B3B] text-white',
    completed: 'bg-[#140BC1] text-white',
  };

  // const labelMap: Record<StatusType, string> = {
  //   confirmed: 'Confirmed',
  //   pending: 'Pending',
  //   cancelled: 'Cancelled',
  //   completed: 'Completed',
  // };

  const appliedStyle =
    type === 'details'
      ? buttonStyles[status.toLowerCase() as StatusType]
      : statusStyles[status.toLowerCase() as StatusType];

  return (
    <button
      className={`  font-semibold transition-colors duration-300 ${appliedStyle} ${type === 'details' ? 'px-2 py-1 rounded-xl ' : 'px-4 py-2 rounded-lg'}`}
    >
      {status}
    </button>
  );
};

export default StatusButton;
