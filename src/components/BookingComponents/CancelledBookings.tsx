import React from 'react';
import BookingsTable from './BookingsTable';
import { Booking } from '@/features/booking/bookingService';

interface CancelledBookingsProps {
  bookings: Booking[];
}

function CancelledBookings({ bookings }: CancelledBookingsProps) {
  const filtered = bookings.filter((b) => b.status === 'Cancelled');
  return <BookingsTable bookings={filtered} />;
}

export default CancelledBookings;
