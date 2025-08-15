import { ActiveProfile } from '@/types';
import { Link } from 'react-router';

// import { Link } from "react-router-dom"

type Props = {
  page: string;
  active: ActiveProfile;
  setActive: (value: ActiveProfile) => void;
};
//  to={`${lowerCasePage}`}

const ProfileLinks = ({ page, active, setActive }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(' ', '-') as ActiveProfile;
  return (
    <Link
      to={`#`}
      className={`${
        active === lowerCasePage
          ? ' border-b-2 border-b-[#1D5C5C] text-[#1D5C5C] transition-colors duration-100'
          : ''
      } transition duration-100 hover:text-[#1D5C5C]/50 `}
      onClick={() => setActive(lowerCasePage)}
    >
      {page}
    </Link>
  );
};

export default ProfileLinks;
