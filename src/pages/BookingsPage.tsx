import AllBookings from '@/components/BookingComponents/AllBookings';
import BookingsNav from '@/components/BookingComponents/BookingsNav';
import CancelledBookings from '@/components/BookingComponents/CancelledBookings';
import PastBookings from '@/components/BookingComponents/PastBookings';
import UpcomingBookings from '@/components/BookingComponents/UpcomingBookings';
import Header, { HeaderSpacer } from '@/components/layout/Header';
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
  } = useGetBookingsByUserIdQuery(userId || '');

  // bookingsData is an array of { message, booking }
  const bookings = bookingsData ? bookingsData.bookings : [];

  return (
    <div className="h-full">
      <Header />
      <HeaderSpacer />
      <div className=" px-[30px] lg:px-[80px] container mt-20">
        <BookingsNav active={active} setActive={setActive} />
        {isLoading && (
          <div className="flex justify-center py-10 min-h-[calc(100vh-100px)] items-center">
            <Spinner />
          </div>
        )}
        {error && (
          <div className="flex justify-center py-10 text-red-500">
            Error loading bookings.
          </div>
        )}
        {!isLoading && !error && (
          <>
            {active === ActiveBooking.All && (
              <AllBookings bookings={bookings} />
            )}
            {active === ActiveBooking.Upcoming && (
              <UpcomingBookings bookings={bookings} />
            )}
            {active === ActiveBooking.Past && (
              <PastBookings bookings={bookings} />
            )}
            {active === ActiveBooking.Cancelled && (
              <CancelledBookings bookings={bookings} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingsPage;
