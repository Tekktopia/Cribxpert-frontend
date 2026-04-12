import React from 'react';
type ListingNotificationItemProps = {
  username: string;
  description: string;
  daysAgo: string;
  onViewListing: () => void;
  buttonLabel?: string;
};

const ListingNotificationItem: React.FC<ListingNotificationItemProps> = ({
  username,
  description,
  daysAgo,
  onViewListing,
  buttonLabel = 'Update wallet', 
}) => {
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="flex gap-4 p-4 border-b rounded-md w-full max-w-full">
      {/* Avatar */}
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#F1E6F1] text-gray-700 text-xl font-bold">
        {firstLetter}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-[#333] text-base">{description}</p>
        <span className="text-[#999] text-sm mt-1">{daysAgo}</span>
        <div className="max-w-md">
          <button
            onClick={onViewListing}
            className="mt-3 px-4 py-2 text-sm text-[#1D5C5C] border border-[#1D5C5C] rounded-md hover:bg-[#1D5C5C] hover:text-white transition w-max"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingNotificationItem;
