import BookingsTable from './BookingsTable';
import { Booking } from '@/features/bookings/bookingService';

interface AllBookingsProps {
  bookings: Booking[];
  error?: string | null;
  onRetry?: () => void;
}

function AllBookings({ bookings, error, onRetry }: AllBookingsProps) {
  return <BookingsTable bookings={bookings} error={error} onRetry={onRetry} />;
}

export default AllBookings;
