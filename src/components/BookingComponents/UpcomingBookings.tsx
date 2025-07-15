import React from 'react';
import BookingsTable from './BookingsTable';
import { Booking } from '@/features/booking/bookingService';

interface UpcomingBookingsProps {
  bookings: Booking[];
}

function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  const now = new Date();
  const filtered = bookings.filter(
    (b) => b.status === 'Pending' && new Date(b.startDate) > now
  );
  return <BookingsTable bookings={filtered} />;
}

export default UpcomingBookings;
