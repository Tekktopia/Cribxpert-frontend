import React from 'react';
import { NotificationComponentProps } from '@/features/notifications';
import { NotificationList } from './NotificationUtils';

const All: React.FC<NotificationComponentProps> = ({
  notifications,
  isLoading,
  error,
  onMarkAsRead,
}) => {
  return (
    <NotificationList
      notifications={notifications}
      isLoading={isLoading}
      error={error}
      onMarkAsRead={onMarkAsRead}
    />
  );
};

export default All;
