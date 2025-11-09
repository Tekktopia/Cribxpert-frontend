import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ActiveNotification } from '@/types';
import { selectCurrentUser } from '@/features/auth/authSlice';
import {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/features/notifications';
import All from '@/features/notifications/components/All';
import NotificationNav from '@/shared/components/layout/notification/NotificationNav';
import Bookings from '@/features/notifications/components/Bookings';
import Payments from '@/features/notifications/components/Payments';
import Reviews from '@/features/review/components/Reviews';
import Listings from '@/features/notifications/components/Listings';
import Financials from '@/features/notifications/components/Financials';
const NotificationPage = () => {
  const [active, setActive] = useState<ActiveNotification>(
    ActiveNotification.All
  );

  const currentUser = useSelector(selectCurrentUser);
  const {
    data: notificationsData,
    isLoading,
    error,
  } = useGetUserNotificationsQuery(currentUser?._id || '', {
    skip: !currentUser?._id,
  });
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId).unwrap();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const notifications = notificationsData?.notifications || [];

  // Filter notifications by type
  const bookingNotifications = notifications.filter(
    (notification) => notification.category === 'booking'
  );

  const paymentNotifications = notifications.filter(
    (notification) => notification.category === 'payment'
  );

  const reviewNotifications = notifications.filter(
    (notification) => notification.category === 'review'
  );

  // Add filters for listings and financials
  const listingNotifications = notifications.filter(
    (notification) => notification.category === 'listing'
  );

  const financialNotifications = notifications.filter(
    (notification) => notification.category === 'financial'
  );

  return (
    <div>
      <div className="px-[30px] lg:px-[80px] container mx-auto">
        <h1 className="pt-[43px] text-[20px] text-[#040404]">Notifications</h1>
        <NotificationNav active={active} setActive={setActive} />

        {active === ActiveNotification.All && (
          <All
            notifications={notifications}
            isLoading={isLoading}
            error={error}
            onMarkAsRead={handleMarkAsRead}
          />
        )}

        {active === ActiveNotification.Bookings && (
          <Bookings
            notifications={bookingNotifications}
            isLoading={isLoading}
            error={error}
            onMarkAsRead={handleMarkAsRead}
          />
        )}

        {active === ActiveNotification.Payments && (
          <Payments
            notifications={paymentNotifications}
            isLoading={isLoading}
            error={error}
            onMarkAsRead={handleMarkAsRead}
          />
        )}

        {active === ActiveNotification.Reviews && (
          <Reviews
            notifications={reviewNotifications}
            isLoading={isLoading}
            error={error}
            onMarkAsRead={handleMarkAsRead}
          />
        )}

        {/* New tabs for Listings and Financials */}

        {active === ActiveNotification.Listings && (
          <Listings
            notifications={listingNotifications}
            isLoading={isLoading}
            error={error}
            onMarkAsRead={handleMarkAsRead}
          />
        )}

        {active === ActiveNotification.Financials && (
          <Financials
            notifications={financialNotifications}
            isLoading={isLoading}
            error={error}
            onMarkAsRead={handleMarkAsRead}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
