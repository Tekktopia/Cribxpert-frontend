import { Active } from '@/types';
import ProfileLinks from './ProfileLinks';

type Props = {
  active: Active;
  setActive: (value: Active) => void;
};

const ProfileNav = ({ active, setActive }: Props) => {
  return (
    <nav>
      <div className="flex w-full py-3 lg:gap-[10px] text-[#999]">
        <div className="flex items-center justify-center py-2  lg:px-4 ">
          <ProfileLinks page="Profile" active={active} setActive={setActive} />
        </div>
        <div className="flex items-center justify-center py-2  px-4">
          <ProfileLinks
            page="Password Management"
            active={active}
            setActive={setActive}
          />
        </div>
        <div className="flex items-center justify-center py-2  px-4">
          <ProfileLinks
            page="Manage Payment"
            active={active}
            setActive={setActive}
          />
        </div>
        <div className="flex items-center justify-center py-2  px-4">
          <ProfileLinks
            page="Preferences"
            active={active}
            setActive={setActive}
          />
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
