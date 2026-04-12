import React from 'react';

type BookingNotificationItemProps = {
  username: string;
  description: string;
  daysAgo: string;
  alert: string;
  onAccept: () => void;
  onDecline: () => void;
};

const BookingNotificationItem: React.FC<BookingNotificationItemProps> = ({
  username,
  description,
  daysAgo,
  onAccept,
  onDecline,
  alert,
}) => {
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="flex gap-4 p-4 border-b rounded-md w-full max-w-full">
      {/* Avatar */}
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#E6F1F1] text-[#1D5C5C] text-xl font-bold">
        {firstLetter}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-[#333] text-base">{description}</p>
        <div className="flex flex-row gap-3 items-center mt-1">
          <span className="text-[#999] text-sm">{daysAgo}</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#999] rounded-full inline-block"></span>
            <span className="text-[#999] text-sm">{alert}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={onAccept}
            className="px-4 py-2 text-sm text-white bg-[#1D5C5C] border border-[#1D5C5C] rounded-md hover:bg-opacity-90 transition"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="px-4 py-2 text-sm text-[#1D5C5C] border border-[#1D5C5C] rounded-md hover:bg-[#1D5C5C] hover:text-white transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingNotificationItem;
