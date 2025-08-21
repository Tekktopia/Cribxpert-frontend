import React from 'react';
import { NotificationComponentProps } from '@/features/notification';
import NoNotification from './NoNotification';
import BookingNotificationItem from './BookingNotificationItem';  // Assuming this is a component
import { al } from 'node_modules/react-router/dist/development/context-DohQKLID.d.mts';

// Hardcoded test data for bookings
const testBookingNotifications = [
  {
    _id: 'b1',
    userId: 'user1',
    title: 'Booking Confirmed',
    description: 'Your booking at Hotel XYZ is confirmed.',
    category: 'booking',
    status: 'unread',
    alert: 'New Booking Request',
    createdAt: '2025-08-20T10:00:00.000Z',
    updatedAt: '2025-08-20T10:00:00.000Z',
    __v: 0,
  },
  {
    _id: 'b2',
    userId: 'user2',
    title: 'Booking Cancelled',
    description: 'Your booking at Resort ABC was cancelled.',
    category: 'booking',
    status: 'read',
    alert: 'New Booking Request',
    createdAt: '2025-08-19T14:30:00.000Z',
    updatedAt: '2025-08-19T14:30:00.000Z',
    __v: 0,
  },
];
const getDaysAgo = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
};

const Bookings: React.FC<NotificationComponentProps> = ({
  notifications,
  isLoading,
  error,
  onMarkAsRead,
}) => {
  const activeNotifications = notifications.length ? notifications : testBookingNotifications;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-[#999] text-[14px] sm:text-[16px]">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-red-500 text-[14px] sm:text-[16px]">Failed to load notifications</p>
      </div>
    );
  }

  if (activeNotifications.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 my-9">
        <NoNotification />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {activeNotifications.map((notification: any) => (
        <BookingNotificationItem
          key={notification._id}
          username={notification.userId}
          description={notification.description}
          daysAgo={getDaysAgo(notification.createdAt)}
          alert={notification.alert}
          onAccept={() => {
            onMarkAsRead(notification._id);
            // TODO: add accept logic here
            console.log('Accepted booking', notification._id);
          }}
          onDecline={() => {
            onMarkAsRead(notification._id);
            // TODO: add decline logic here
            console.log('Declined booking', notification._id);
          }}
        />
      ))}
    </div>
  );
};
export default Bookings;