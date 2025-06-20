import AllBookings from '@/components/BookingComponents/AllBookings';
import BookingsNav from '@/components/BookingComponents/BookingsNav';
import CancelledBookings from '@/components/BookingComponents/CancelledBookings';
import PastBookings from '@/components/BookingComponents/PastBookings';
import UpcomingBookings from '@/components/BookingComponents/UpcomingBookings';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { ActiveBooking } from '@/types';
import { useState } from 'react';
import { useLocation } from 'react-router';

function BookingsPage() {
  const [active, setActive] = useState<ActiveBooking>(ActiveBooking.All);
  const location = useLocation();
  const { propertyId, startDate, endDate, guests, totalPrice, propertyName } =
    location.state || {};

  console.log(
    'BookingsPage location state:',
    propertyId,
    startDate,
    endDate,
    guests,
    totalPrice,
    propertyName
  );
  
  return (
    <div>
      {' '}
      <Header />
      <HeaderSpacer />
      <div className=" px-[30px] lg:px-[80px] container mt-20 ">
        <BookingsNav active={active} setActive={setActive} />
        {active === ActiveBooking.All && <AllBookings />}
        {active === ActiveBooking.Upcoming && <UpcomingBookings />}
        {active === ActiveBooking.Past && <PastBookings />}
        {active === ActiveBooking.Cancelled && <CancelledBookings />}
      </div>
    </div>
  );
}

export default BookingsPage;
