import BookingsTable from './BookingsTable';
import { Booking } from '@/features/bookings/bookingService';

interface UpcomingBookingsProps {
  bookings: Booking[];
  error?: string | null;
  onRetry?: () => void;
}

function UpcomingBookings({ bookings, error, onRetry }: UpcomingBookingsProps) {
  const now = new Date();
  const filtered = bookings.filter(
    (b) => b.status === 'Pending' && new Date(b.startDate) > now
  );
  return <BookingsTable bookings={filtered} error={error} onRetry={onRetry} />;
}

export default UpcomingBookings;
