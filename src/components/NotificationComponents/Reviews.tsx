import React from 'react';
import { NotificationComponentProps } from '@/features/notification';
import { NotificationList } from './NotificationUtils';
import NoNotification from './NoNotification';

const Reviews: React.FC<NotificationComponentProps> = ({
  notifications,
  isLoading,
  error,
  onMarkAsRead,
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-[#999] text-[14px] sm:text-[16px]">
          Loading notifications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-red-500 text-[14px] sm:text-[16px]">
          Failed to load notifications
        </p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 my-9">
        <div>
          <NoNotification />
        </div>
      </div>
    );
  }

  return (
    <NotificationList
      notifications={notifications}
      isLoading={isLoading}
      error={error}
      onMarkAsRead={onMarkAsRead}
      emptyMessage="No review notifications"
    />
  );
};

export default Reviews;
