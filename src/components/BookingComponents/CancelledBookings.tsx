import React from 'react';
import { BookingsType } from '@/types';
import beachside from '../../assets/images/beachside.jpg';
import cityview from '../../assets/images/cityview.jpg';
import downtown from '../../assets/images/downtown.jpg';
import StatusButton from './StatusButton';
import BookingsTable from './BookingsTable';

const bookingsData: Array<BookingsType> = [
  {
    id: '#100001',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: <StatusButton status="cancelled" />,
  },
  {
    id: '#100002',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: <StatusButton status="cancelled" />,
  },
  {
    id: '#100003',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: <StatusButton status="cancelled" />,
  },
  {
    id: '#100001',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: <StatusButton status="cancelled" />,
  },
  {
    id: '#100001',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: <StatusButton status="cancelled" />,
  },
  {
    id: '#100001',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: <StatusButton status="cancelled" />,
  },
];

const CancelledBookings = () => {
  return <BookingsTable bookings={bookingsData} />;
};

export default CancelledBookings;
