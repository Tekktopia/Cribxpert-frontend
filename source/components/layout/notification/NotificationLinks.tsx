import { ActiveNotification } from '@/types';
import { Link } from 'react-router';

type Props = {
  page: string;
  active: ActiveNotification;
  setActive: (value: ActiveNotification) => void;
};

const NotificationLinks = ({ page, active, setActive }: Props) => {
  const lowerCasePage = page
    .toLowerCase()
    .replace(' ', '-') as ActiveNotification;
  return (
    <Link
      to={`#`}
      className={`${
        active === lowerCasePage
          ? ' border-b-[1.5px] border-b-[#1D5C5C] px-3 text-[#1D5C5C] transition-all duration-200'
          : ''
      } transition duration-100 hover:text-[#1D5C5C]/50 `}
      onClick={() => setActive(lowerCasePage)}
    >
      {page}
    </Link>
  );
};

export default NotificationLinks;
