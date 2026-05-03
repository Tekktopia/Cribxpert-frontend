import { ActiveBooking } from '@/types';
import { Link } from 'react-router';

type Props = {
  page: ActiveBooking;
  label: string;
  active: ActiveBooking;
  setActive: (value: ActiveBooking) => void;
};

const BookingsLinks = ({ page, label, active, setActive }: Props) => {
  // const lowerCasePage = page.toLowerCase().replace(' ', '-') as ActiveBooking;
  return (
    <Link
      to={`#`}
      className={`${
        active === page
          ? ' border-b-[1.5px] border-b-primary px-3 text-primary transition-all duration-200'
          : ''
      } transition duration-100 hover:text-primary/50 `}
      onClick={() => setActive(page)}
    >
      {label}
    </Link>
  );
};

export default BookingsLinks;
