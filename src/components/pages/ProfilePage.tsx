import { Active } from '../common/profile/types';
import Header from '../layout/Header';
import ProfileNav from '../layout/profile/ProfileNav';
import { useState } from 'react';
import Profile from '../profileComponents/Profile';
import Preference from '../profileComponents/Preference';
import Payment from '../profileComponents/Payment';
import Password from '../profileComponents/Password';

const ProfilePage = () => {
  const [active, setActive] = useState<Active>(Active.Profile);
  return (
    <div>
      {' '}
      <Header />
      <div className="px-[80px]">
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
