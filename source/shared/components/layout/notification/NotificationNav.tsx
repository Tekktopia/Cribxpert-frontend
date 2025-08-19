import { ActiveNotification } from '@/types';
import NotificationLinks from './NotificationLinks';
import { slider } from '@/assets';

type Props = {
  active: ActiveNotification;
  setActive: (value: ActiveNotification) => void;
};

const NotificationNav = ({ active, setActive }: Props) => {
  return (
    <nav>
      <div className="flex justify-between items-center">
        <div className="flex w-full py-3 lg:gap-[10px] text-[#999] text-[12px]  sm:text-[16px] lg:text-[18px]">
          <div className="flex items-center justify-center py-2  lg:px-4 ">
            <NotificationLinks
              page="All"
              active={active}
              setActive={setActive}
            />
          </div>
          <div className="flex items-center justify-center py-2  px-4">
            <NotificationLinks
              page="Bookings"
              active={active}
              setActive={setActive}
            />
          </div>
          <div className="flex items-center justify-center py-2  px-4">
            <NotificationLinks
              page="Payments"
              active={active}
              setActive={setActive}
            />
          </div>
          <div className="flex items-center justify-center py-2  px-4">
            <NotificationLinks
              page="Reviews"
              active={active}
              setActive={setActive}
            />
          </div>
        </div>
        <div>
          <button className="text-[#6F6F6F] flex py-[10px] lg:px-[14px] justify-center items-center gap-2 rounded-xl lg:border border-[#999] h-[36px]">
            <img src={slider} alt="slider-icon" />
            <p className="lg:block hidden text-[14px]">Filters</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NotificationNav;
