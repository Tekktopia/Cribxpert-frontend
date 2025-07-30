import AllBookings from '@/components/BookingComponents/AllBookings';
import BookingsNav from '@/components/BookingComponents/BookingsNav';
import CancelledBookings from '@/components/BookingComponents/CancelledBookings';
import PastBookings from '@/components/BookingComponents/PastBookings';
import UpcomingBookings from '@/components/BookingComponents/UpcomingBookings';
import Spinner from '@/components/common/Spinner';
import { ActiveBooking } from '@/types';
import { useState } from 'react';
import { useGetBookingsByUserIdQuery } from '@/features/booking/bookingService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';

function BookingsPage() {
  const [active, setActive] = useState<ActiveBooking>(ActiveBooking.All);
  const currentUser = useSelector(selectCurrentUser);
  // TODO: Replace with real user ID from auth context or redux
  const userId = currentUser?._id;
  const {
    data: bookingsData,
    isLoading,
    error,
    refetch,
  } = useGetBookingsByUserIdQuery(userId || '', {
    skip: !userId,
  });

  // Check if we have a successful response (even if empty)
  const NoBookings =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any)?.data?.message === 'No bookings found for this user';

  // bookingsData is an array of { message, booking }
  const bookings = bookingsData?.bookings || [];

  // Handle retry functionality
  const handleRetry = () => {
    refetch();
  };

  // Get error message for display
  const getErrorMessage = () => {
    if (!error) return null;

    // Handle different error types
    if (typeof error === 'string') {
      return error;
    }

    // Handle RTK Query error object
    if (error && typeof error === 'object' && 'data' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = (error as any).data;
      if (errorData?.message) {
        return errorData.message;
      }
    }

    return 'Failed to load bookings. Please try again.';
  };

  return (
    <div className="h-full">
      <div className=" px-[30px] lg:px-[80px] container mt-20">
        <BookingsNav active={active} setActive={setActive} />
        {isLoading && (
          <div className="flex justify-center py-10 min-h-[calc(100vh-100px)] items-center">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <>
            {active === ActiveBooking.All && (
              <AllBookings
                bookings={bookings}
                error={NoBookings ? null : getErrorMessage()}
                onRetry={handleRetry}
              />
            )}
            {active === ActiveBooking.Upcoming && (
              <UpcomingBookings
                bookings={bookings}
                error={NoBookings ? null : getErrorMessage()}
                onRetry={handleRetry}
              />
            )}
            {active === ActiveBooking.Past && (
              <PastBookings
                bookings={bookings}
                error={NoBookings ? null : getErrorMessage()}
                onRetry={handleRetry}
              />
            )}
            {active === ActiveBooking.Cancelled && (
              <CancelledBookings
                bookings={bookings}
                error={NoBookings ? null : getErrorMessage()}
                onRetry={handleRetry}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingsPage;
