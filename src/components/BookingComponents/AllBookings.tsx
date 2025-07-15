import BookingsTable from './BookingsTable';
import { Booking } from '@/features/booking/bookingService';

interface AllBookingsProps {
  bookings: Booking[];
}

function AllBookings({ bookings }: AllBookingsProps) {
  return <BookingsTable bookings={bookings} />;
}

export default AllBookings;
