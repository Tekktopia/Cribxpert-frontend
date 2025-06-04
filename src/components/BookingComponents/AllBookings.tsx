import React from 'react';

import BookingsTable from './BookingsTable';
import { bookingsData } from '@/utils/data';

function AllBookings() {
  return <BookingsTable bookings={bookingsData} />;
}

export default AllBookings;
