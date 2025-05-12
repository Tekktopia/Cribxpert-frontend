import { useState } from 'react';
import Header from '@/components/layout/Header';
import { ActiveNotification } from '@/types';
import All from './NotificationComponents/All';
import NotificationNav from '../layout/notification/NotificationNav';
import Bookings from './NotificationComponents/Bookings';
import Payments from './NotificationComponents/Payments';
import Reviews from './NotificationComponents/Reviews';

const NotificationPage = () => {
  const [active, setActive] = useState<ActiveNotification>(
    ActiveNotification.All
  );
  return (
    <div>
      {' '}
      <Header />
      <div className=" px-[30px] lg:px-[80px]">
        <h1 className="pt-[43px] text-[20px] text-[#040404]">Notifications</h1>
        <NotificationNav active={active} setActive={setActive} />
        {active === ActiveNotification.All && <All />}
        {active === ActiveNotification.Bookings && <Bookings />}
        {active === ActiveNotification.Payments && <Payments />}
        {active === ActiveNotification.Reviews && <Reviews />}
      </div>
    </div>
  );
};

export default NotificationPage;
