import { useState } from 'react';
import ProfileNav from '@/shared/components/layout/profile/ProfileNav';
import Profile from '@/features/profile/components/Profile';
import Preference from '@/features/profile/components/Preference';
import Payment from '@/features/profile/components/Payment';
import Password from '@/features/profile/components/Password';
import { ActiveProfile } from '@/types';

const ProfilePage = () => {
  const [active, setActive] = useState<ActiveProfile>(ActiveProfile.Profile);
  return (
    <div>
      <div className="  mt-4 lg:mt-32 container mx-auto">
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
