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
import ReviewsTest from '@/features/review/components/ReviewsTest';
import Listings from '@/features/notifications/components/Listings';
import Financials from '@/features/notifications/components/Financials';
import NoNotification from '@/features/notifications/components/NoNotification';
const NotificationPage = () => {
  const [active, setActive] = useState<ActiveNotification>(ActiveNotification.All);

  const currentUser = useSelector(selectCurrentUser);
  const { data: notificationsData, isLoading, error } = useGetUserNotificationsQuery(
    currentUser?.id || '',
    { skip: !currentUser?.id }
  );
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId).unwrap();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const notifications = notificationsData?.notifications || [];

  // Categorize notifications
  const bookingNotifications = notifications.filter(n => n.category === 'booking');
  const paymentNotifications = notifications.filter(n => n.category === 'payment');
  const reviewNotifications = notifications.filter(n => n.category === 'review');
  const listingNotifications = notifications.filter(n => n.category === 'listing');
  const financialNotifications = notifications.filter(n => n.category === 'financial');
  
  // Extract unique listing IDs from review notifications for dynamic fetching
  const reviewListingIds = Array.from(new Set(reviewNotifications.map(r => r.listing)));
  console.log("reviewListingIds:", reviewListingIds)
  
  return (
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
  <>
    {reviewNotifications.length > 0 ? (
      reviewNotifications.map((notification) => (
        <ReviewsTest
          key={notification._id}
          listingId={notification.listing} // <-- use listing id from the notification
        />
      ))
    ) : (
      <NoNotification />
    )}
  </>
)}

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
  );
};

export default NotificationPage;
