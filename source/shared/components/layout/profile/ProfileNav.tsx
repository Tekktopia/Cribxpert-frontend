import { ActiveProfile } from '@/types';
import ProfileLinks from './ProfileLinks';

type Props = {
  active: ActiveProfile;
  setActive: (value: ActiveProfile) => void;
};

const ProfileNav = ({ active, setActive }: Props) => {

  return (
    <nav>
      <div className="flex justify-between items-center">
        <div className=" justify-center hidden lg:flex w-full py-3 lg:gap-[10px] text-[#999] text-[10px]  sm:text-[14px] lg:text-[18px] ">
          <div className={` items-center justify-center py-2  lg:px-4 `}>
            <ProfileLinks
              page="Profile"
              active={active}
              setActive={setActive}
            />
          </div>
          <div className={`  items-center justify-center py-2  lg:px-4 `}>
            <ProfileLinks
              page="Password Management"
              active={active}
              setActive={setActive}
            />
          </div>
          <div className={`  items-center justify-center py-2  lg:px-4 `}>
            <ProfileLinks
              page="Manage Payment"
              active={active}
              setActive={setActive}
            />
          </div>
          <div className={`  items-center justify-center py-2  lg:px-4 `}>
            <ProfileLinks
              page="Preferences"
              active={active}
              setActive={setActive}
            />
          </div>
        </div>
        <div className="lg:hidden w-full text-[#1D5C5C] px-4 pt-0 pb-2">
          <div className="font-bold text-[18px] mb-3">
            <h1>PROFILE</h1>
          </div>
          <div className="flex gap-x-4 text-[#999] text-[10px] overflow-x-auto">
            <ProfileLinks page="Profile" active={active} setActive={setActive} />
            <ProfileLinks page="Password Management" active={active} setActive={setActive} />
            <ProfileLinks page="Manage Payment" active={active} setActive={setActive} />
            <ProfileLinks page="Preferences" active={active} setActive={setActive} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
