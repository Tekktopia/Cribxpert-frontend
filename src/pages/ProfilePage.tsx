import { useState } from 'react';
import Header from '@/components/layout/Header';
import ProfileNav from '@/components/layout/profile/ProfileNav';
import Profile from '@/components/profileComponents/Profile';
import Preference from '@/components/profileComponents/Preference';
import Payment from '@/components/profileComponents/Payment';
import Password from '@/components/profileComponents/Password';
import { Active } from '@/types';

const ProfilePage = () => {
  const [active, setActive] = useState<Active>(Active.Profile);
  return (
    <div>
      {' '}
      <Header />
      <div className=" px-[30px] lg:px-[80px]">
        <ProfileNav active={active} setActive={setActive} />
        {active === Active.Profile && (
          <Profile
            initialFirstName=""
            initialLastName=""
            initialEmail=""
            initialPhone=""
          />
        )}
        {active === Active.PasswordManagement && <Password />}
        {active === Active.ManagePayment && <Payment />}
        {active === Active.Preferences && (
          <Preference
            initialNotifications={true}
            initialUpdates={false}
            initialMessages={false}
            initialDiscounts={false}
            initialAuthentication={true}
            initialLanguage="English"
            initialCurrency="USD"
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
