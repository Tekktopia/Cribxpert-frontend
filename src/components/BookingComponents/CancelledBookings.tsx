import React from 'react';

import BookingsTable from './BookingsTable';
import { cancelledBookingsData } from '@/utils/data';

const CancelledBookings = () => {
  return <BookingsTable bookings={cancelledBookingsData} />;
};

export default CancelledBookings;
