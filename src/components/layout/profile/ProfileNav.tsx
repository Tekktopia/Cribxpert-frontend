import ProfileLinks from './ProfileLinks';
import { Active } from '../../common/profile/types';

type Props = {
  active: Active;
  setActive: (value: Active) => void;
};

const ProfileNav = ({ active, setActive }: Props) => {
  // const flexBetween = " flex items-center justify-between";
  return (
    <nav>
      <div className="flex w-full py-3 gap-[10px] ">
        <div className="flex items-center justify-center py-2  px-4">
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
