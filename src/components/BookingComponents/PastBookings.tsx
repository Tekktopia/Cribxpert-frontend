import BookingsTable from './BookingsTable';
import { Booking } from '@/features/booking/bookingService';

interface PastBookingsProps {
  bookings: Booking[];
}

function PastBookings({ bookings }: PastBookingsProps) {
  const now = new Date();
  const filtered = bookings.filter((b) => new Date(b.endDate) < now);
  return <BookingsTable bookings={filtered} />;
}

export default PastBookings;
