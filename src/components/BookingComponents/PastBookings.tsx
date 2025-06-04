import React from 'react';

import BookingsTable from './BookingsTable';
import { completedBookingsData } from '@/utils/data';

const PastBookings = () => {
  return <BookingsTable bookings={completedBookingsData} />;
};

export default PastBookings;
