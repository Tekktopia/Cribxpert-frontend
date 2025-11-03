import React from 'react';
import { NotificationComponentProps } from '@/features/notification';
import { NotificationList } from './NotificationUtils';
import NoNotification from './NoNotification';
import ReviewNotificationItem from './ReviewNotificationItem';

const Reviews: React.FC = () => {
  // Simulated loading and error states
  const isLoading = false;
  const error = null;

  // Hardcoded review notifications
  const testNotifications = [
    {
      _id: 'r1',
      username: 'Liam',
      description: 'You received a 5-star review on your recent stay.',
      createdAt: '2025-09-08T10:00:00.000Z',
    },
    {
      _id: 'r2',
      username: 'Sophia',
      description: 'A guest left a comment on your profile.',
      createdAt: '2025-09-07T15:45:00.000Z',
    },
    {
      _id: 'r3',
      username: 'Noah',
      description: 'You have a new review awaiting your response.',
      createdAt: '2025-09-06T08:20:00.000Z',
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
        <ReviewNotificationItem
          key={notification._id}
          username={notification.username}
          description={notification.description}
          daysAgo={getDaysAgo(notification.createdAt)}
          buttonLabel="View Review"
          onViewListing={() => {
            console.log('View review clicked:', notification._id);
          }}
        />
      ))}
    </div>
  );
};

export default Reviews;
