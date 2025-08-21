import React from 'react';
import { NotificationComponentProps } from '@/features/notification';
import NoNotification from './NoNotification';
import ListingNotificationItem from './ListingNotificationItem';

type ListingsProps = {
  isLoading: boolean;
  error: string | null;
};

const Listings: React.FC<ListingsProps> = ({ isLoading, error }) => {
  // Hardcoded test data for demonstration
  const testNotifications = [
    {
      _id: '1',
      username: 'Alice',
      description: 'Your new apartment listing has been approved.',
      createdAt: '2025-08-19T12:00:00.000Z',
    },
    {
      _id: '2',
      username: 'Bob',
      description: 'Your listing has received a new inquiry.',
      createdAt: '2025-08-21T09:30:00.000Z',
    },
    {
      _id: '3',
      username: 'Charlie',
      description: 'Your listing was featured in this week’s newsletter.',
      createdAt: '2025-08-20T14:45:00.000Z',
    },
  ];

  // Calculate "days ago" string
  const getDaysAgo = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
  };

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

  if (testNotifications.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 my-9">
        <NoNotification />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-6">
      {testNotifications.map((notification) => (
        <ListingNotificationItem
          key={notification._id}
          username={notification.username}
          description={notification.description}
          daysAgo={getDaysAgo(notification.createdAt)}
          onViewListing={() => console.log('View listing clicked:', notification._id)}
        />
      ))}
    </div>
  );
};

export default Listings;
