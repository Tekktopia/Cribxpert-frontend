import { IMAGES } from './imageConstants';

export interface HouseRule {
  icon: string;
  title: string;
  description: string;
}

export const HOUSE_RULES: HouseRule[] = [
  {
    icon: IMAGES.carIcon,
    title: 'Check In',
    description: 'Check in after 3:00PM',
  },
  {
    icon: IMAGES.carIcon,
    title: 'Pets',
    description: 'No pets allowed',
  },
  {
    icon: IMAGES.carIcon,
    title: 'Age',
    description: 'Minimum age to rent: 18',
  },
  {
    icon: IMAGES.carIcon,
    title: 'Check Out',
    description: 'Check out before 11:00AM',
  },
  {
    icon: IMAGES.carIcon,
    title: 'Smoking',
    description: 'No smoking allowed',
  },
  {
    icon: IMAGES.carIcon,
    title: 'Parties',
    description: 'No parties or events',
  },
];
