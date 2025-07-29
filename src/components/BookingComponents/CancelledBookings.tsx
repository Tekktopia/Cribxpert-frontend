import BookingsTable from './BookingsTable';
import { Booking } from '@/features/booking/bookingService';

interface CancelledBookingsProps {
  bookings: Booking[];
  error?: string | null;
  onRetry?: () => void;
}

function CancelledBookings({ bookings, error, onRetry }: CancelledBookingsProps) {
  const filtered = bookings.filter((b) => b.status === 'Cancelled');
  return <BookingsTable bookings={filtered} error={error} onRetry={onRetry} />;
}

export default CancelledBookings;
