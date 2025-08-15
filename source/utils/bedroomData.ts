import { IMAGES } from './imageConstants';

export interface Bedroom {
  image: string;
  name: string;
  amenities: string;
}

export const BEDROOMS: Bedroom[] = [
  {
    image: IMAGES.kingBed,
    name: 'Bedroom 1 - 1 King Bed',
    amenities: 'Soap · Towels provided · Toilet · Hair dryer',
  },
  {
    image: IMAGES.doubleBed,
    name: 'Bedroom 2 - 1 Double Bed',
    amenities: 'Soap · Towels provided · Toilet · Hair dryer',
  },
];
