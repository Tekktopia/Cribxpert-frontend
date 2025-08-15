import BookingsTable from './BookingsTable';
import { Booking } from '@/features/bookings/bookingService';

interface PastBookingsProps {
  bookings: Booking[];
  error?: string | null;
  onRetry?: () => void;
}

function PastBookings({ bookings, error, onRetry }: PastBookingsProps) {
  const now = new Date();
  const filtered = bookings.filter((b) => new Date(b.endDate) < now);
  return <BookingsTable bookings={filtered} error={error} onRetry={onRetry} />;
}

export default PastBookings;
