import React from 'react';

interface ReviewNotificationItemProps {
  username?: string;
  description?: string;
  daysAgo?: string;
  buttonLabel?: string;
  onViewListing?: () => void;
}

const ReviewNotificationItem: React.FC<ReviewNotificationItemProps> = ({
  username,
  description,
  daysAgo,
  buttonLabel = 'View Review',
  onViewListing,
}) => {
  return (
    <div className="flex items-start justify-between gap-4 p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[#1D5C5C] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
          {username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#313131]">
            {username || 'Anonymous'}
          </p>
          <p className="text-sm text-[#6F6F6F] line-clamp-2 mt-0.5">
            {description}
          </p>
          {daysAgo && (
            <p className="text-xs text-[#999] mt-1">{daysAgo}</p>
          )}
        </div>
      </div>
      {onViewListing && (
        <button
          onClick={onViewListing}
          className="text-xs font-medium text-[#1D5C5C] hover:underline whitespace-nowrap flex-shrink-0"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default ReviewNotificationItem;