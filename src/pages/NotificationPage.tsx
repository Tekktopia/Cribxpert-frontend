import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { ActiveNotification } from '@/types';
import { selectCurrentUser } from '@/features/auth/authSlice';
import {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/features/notification';
import All from '@/components/NotificationComponents/All';
import NotificationNav from '@/components/layout/notification/NotificationNav';
import Bookings from '@/components/NotificationComponents/Bookings';
import Payments from '@/components/NotificationComponents/Payments';
import Reviews from '@/components/NotificationComponents/Reviews';

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
    (notification) =>
      notification.type === 'booking' || notification.category === 'booking'
  );

  const paymentNotifications = notifications.filter(
    (notification) =>
      notification.type === 'payment' || notification.category === 'payment'
  );

  const reviewNotifications = notifications.filter(
    (notification) =>
      notification.type === 'review' || notification.category === 'review'
  );

  return (
    <div>
      {' '}
      <Header />
      <HeaderSpacer />
      <div className=" px-[30px] lg:px-[80px] container mx-auto">
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
      </div>
    </div>
  );
};

export default NotificationPage;
