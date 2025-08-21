import React from 'react';
import { NotificationComponentProps } from '@/features/notification';
import NoNotification from './NoNotification';
import ListingNotificationItem from './ListingNotificationItem';

const Listings: React.FC = () => {
  // Hardcoded test data
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

  // Utility to calculate days ago
  const getDaysAgo = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex flex-col gap-4 my-6">
      {testNotifications.map((notification) => (
        <ListingNotificationItem
          key={notification._id}
          username={notification.username}
          description={notification.description}
          daysAgo={getDaysAgo(notification.createdAt)}
          onViewListing={() => {
            console.log('View listing clicked:', notification._id);
          }}
        />
      ))}
    </div>
  );
};

export default Listings;