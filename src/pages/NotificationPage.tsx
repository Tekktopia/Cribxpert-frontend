import { useState } from 'react';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { ActiveNotification } from '@/types';
import All from '@/components/NotificationComponents/All';
import NotificationNav from '@/components/layout/notification/NotificationNav';
import Bookings from '@/components/NotificationComponents/Bookings';
import Payments from '@/components/NotificationComponents/Payments';
import Reviews from '@/components/NotificationComponents/Reviews';

const NotificationPage = () => {
  const [active, setActive] = useState<ActiveNotification>(
    ActiveNotification.All
  );
  return (
    <div>
      {' '}
      <Header />
      <HeaderSpacer/>
      <div className=" px-[30px] lg:px-[80px] container mx-auto">
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
