import React from 'react';

import BookingsTable from './BookingsTable';
import { upcomingBookingsData } from '@/utils/data';

const UpcomingBookings = () => {
  return <BookingsTable bookings={upcomingBookingsData} />;
};

export default UpcomingBookings;
