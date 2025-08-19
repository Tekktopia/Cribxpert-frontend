import React from 'react';
import { ellipseGray } from '@/assets';
import { Notification } from '@/features/notification';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getNotificationIcon, formatTimeAgo } from './notificationHelpers';
import NoNotification from './NoNotification';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  return (
    <div
      className={`w-full flex gap-3 sm:gap-[19px]`}
      onClick={() =>
        notification.status === 'unread' && onMarkAsRead(notification._id)
      }
    >
      <div className="flex-shrink-0 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1]">
        <p className="text-[24px] sm:text-[31px] font-semibold text-[#6F6F6F]">
          {getNotificationIcon(notification.category || '')}
        </p>
      </div>
      <div className="flex-1 flex items-start justify-center gap-2 sm:gap-[15px] flex-col">
        <p
          className={`text-[14px] sm:text-[16px] font-semibold line-clamp-2 ${notification.status === 'unread' ? 'text-[#313131]' : 'text-[#6F6F6F]'}`}
        >
          {notification.title}
        </p>
        <p className="text-[#999] text-[12px] sm:text-[14px] mb-2">
          {notification.description}
        </p>
        <div className="text-[#999] text-[12px] sm:text-[14px] font-normal flex flex-wrap gap-2">
          <p>{formatTimeAgo(notification.createdAt)}</p>
          <img src={ellipseGray} alt="circle" className="hidden sm:inline" />
          <span className="inline sm:hidden">•</span>
          <p className="capitalize">{notification.category}</p>
        </div>
        {notification.status !== 'read' && (
          <div className="flex w-2 h-2 bg-[#1D5C5C] rounded-full"></div>
        )}
      </div>
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  onMarkAsRead: (notificationId: string) => void;
  emptyMessage?: string;
}

export const NotificationList: React.FC<NotificationListProps> = ({
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
    <div className="w-full flex flex-col gap-4 sm:gap-6 items-start my-6 sm:my-9">
      {notifications.map((notification, index) => (
        <React.Fragment key={notification._id}>
          <NotificationItem
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
          {index < notifications.length - 1 && <hr className="w-full my-1" />}
        </React.Fragment>
      ))}
    </div>
  );
};
