import React from 'react';
type ReviewNotificationItemProps = {
  username: string;
  description: string;
  daysAgo: string;
  onViewListing: () => void;
  buttonLabel?: string;
};

const ReviewNotificationItem: React.FC<ReviewNotificationItemProps> = ({
  username,
  description,
  daysAgo,
  onViewListing,
  buttonLabel = 'view Review', 
}) => {
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="flex gap-4 p-4 border-b rounded-md w-full max-w-full">
      {/* Avatar */}
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#F1E6F1] text-neutral text-xl font-bold">
        {firstLetter}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-neutral text-base">{description}</p>
        <span className="text-neutralLight text-sm mt-1">{daysAgo}</span>
        <div className="max-w-md">
          <button
            onClick={onViewListing}
            className="mt-3 px-4 py-2 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition w-max"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewNotificationItem;
