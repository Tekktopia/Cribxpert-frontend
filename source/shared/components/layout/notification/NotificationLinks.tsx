import { ActiveNotification } from '@/types';
import { Link } from 'react-router';

type Props = {
  page: string;
  active: ActiveNotification;
  setActive: (value: ActiveNotification) => void;
};

const pageToEnum: Record<string, ActiveNotification> = {
  All: ActiveNotification.All,
  Bookings: ActiveNotification.Bookings,
  Payments: ActiveNotification.Payments,
  Reviews: ActiveNotification.Reviews,
  Listings: ActiveNotification.Listings,
  Financials: ActiveNotification.Financials,
};

const NotificationLinks = ({ page, active, setActive }: Props) => {
  const notificationType = pageToEnum[page];

  return (
    <Link
      to="#"
      className={`${
        active === notificationType
          ? ' border-b-[1.5px] border-b-[#1D5C5C] px-3 text-[#1D5C5C] transition-all duration-200'
          : ''
      } transition duration-100 hover:text-[#1D5C5C]/50`}
      onClick={() => setActive(notificationType)}
    >
      {page}
    </Link>
  );
};

export default NotificationLinks;
