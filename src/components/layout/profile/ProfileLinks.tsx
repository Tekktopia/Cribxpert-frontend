import { Active } from '@/types';
import { Link } from 'react-router';

// import { Link } from "react-router-dom"

type Props = {
  page: string;
  active: Active;
  setActive: (value: Active) => void;
};
//  to={`${lowerCasePage}`}

const ProfileLinks = ({ page, active, setActive }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(' ', '-') as Active;
  return (
    <Link
      to={`#`}
      className={`${
        active === lowerCasePage
          ? ' border-b-2 border-b-[#730071] text-[#730071] transition-colors duration-100'
          : ''
      } transition duration-100 hover:text-[#730071]/50 `}
      onClick={() => setActive(lowerCasePage)}
    >
      {page}
    </Link>
  );
};

export default ProfileLinks;
