import { useState } from 'react';
import Header from '@/components/layout/Header';
import ProfileNav from '@/components/layout/profile/ProfileNav';
import Profile from '@/components/profileComponents/Profile';
import Preference from '@/components/profileComponents/Preference';
import Payment from '@/components/profileComponents/Payment';
import Password from '@/components/profileComponents/Password';
import { ActiveProfile } from '@/types';

const ProfilePage = () => {
  const [active, setActive] = useState<ActiveProfile>(ActiveProfile.Profile);
  return (
    <div>
      {' '}
      <Header />
      <div className=" px-[30px] lg:px-[80px] container mx-auto">
        <ProfileNav active={active} setActive={setActive} />
        {active === ActiveProfile.Profile && (
          <Profile
            initialFirstName=""
            initialLastName=""
            initialEmail=""
            initialPhone=""
          />
        )}
        {active === ActiveProfile.PasswordManagement && <Password />}
        {active === ActiveProfile.ManagePayment && <Payment />}
        {active === ActiveProfile.Preferences && (
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
