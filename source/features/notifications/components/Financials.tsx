import React from 'react';
import NoNotification from './NoNotification';
import ListingNotificationItem from './ListingNotificationItem';

const Financials: React.FC = () => {
  // Simulated loading and error flags
  const isLoading = false;
  const error = null;

  // Hardcoded test notifications for financials
  const testNotifications = [
    {
      _id: 'f1',
      username: 'Diana',
      description: 'Your wallet has been updated successfully.',
      createdAt: '2025-09-08T10:30:00.000Z',
    },
    {
      _id: 'f2',
      username: 'Ethan',
      description: 'You received a payment to your wallet.',
      createdAt: '2025-09-07T14:15:00.000Z',
    },
    {
      _id: 'f3',
      username: 'Fiona',
      description: 'Monthly wallet report is now available.',
      createdAt: '2025-09-05T09:00:00.000Z',
    },
  ];

  // Utility: Calculate "days ago"
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
          buttonLabel="View wallet"
          onViewListing={() => {
            console.log('View financial item clicked:', notification._id);
          }}
        />
      ))}
    </div>
  );
};

export default Financials;
