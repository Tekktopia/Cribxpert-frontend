import AllBookings from '@/features/bookings/components/AllBookings';
import BookingsNav from '@/features/bookings/components/BookingsNav';
import CancelledBookings from '@/features/bookings/components/CancelledBookings';
import PastBookings from '@/features/bookings/components/PastBookings';
import UpcomingBookings from '@/features/bookings/components/UpcomingBookings';
import Spinner from '@/shared/components/Spinner';
import Footer from '@/shared/components/layout/Footer';
import { ActiveBooking } from '@/types';
import { useState } from 'react';
import { useGetBookingsByUserIdQuery } from '@/features/bookings/bookingService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useBookingUpdates } from '@/hooks/useBookingUpdates';

function BookingsPage() {
  const [active, setActive] = useState<ActiveBooking>(ActiveBooking.All);
  const currentUser = useSelector(selectCurrentUser);
  
  // Enable real-time booking updates
  useBookingUpdates();
  
  const userId = currentUser?.id;
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content - flex-1 pushes footer down */}
      <div className="flex-1">
        <div className="px-[30px] lg:px-[80px] container mx-auto mt-12 pb-8">
          <BookingsNav active={active} setActive={setActive} />
          
          {isLoading && (
            <div className="flex justify-center py-10 min-h-[calc(100vh-200px)] items-center">
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
      
      {/* Footer - Full width and stays at bottom */}
      <Footer />
    </div>
  );
}

export default BookingsPage;