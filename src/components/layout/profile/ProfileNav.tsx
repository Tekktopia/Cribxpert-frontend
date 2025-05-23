import { ActiveProfile } from '@/types';
import ProfileLinks from './ProfileLinks';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type Props = {
  active: ActiveProfile;
  setActive: (value: ActiveProfile) => void;
};

const ProfileNav = ({ active, setActive }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav>
      <div className="flex justify-between items-center">
        <div className=" hidden lg:flex w-full py-3 lg:gap-[10px] text-[#999] text-[10px]  sm:text-[14px] lg:text-[18px] ">
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
        <div className="lg:hidden gap-3 w-full text-[#730071]  flex items-center justify-between py-2  px-4">
          <div className="font-bold text-[18px]">
            <h1>PROFILE</h1>
          </div>
          <button onClick={toggleNavbar}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed right-0 z-20 p-12  border-neutral-900 w-full flex flex-col justify-center items-center lg:hidden text-center backdrop-blur-lg ">
          <div className=" px-4 mx-auto relative text-sm">
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
        </div>
      )}
    </nav>
  );
};

export default ProfileNav;
