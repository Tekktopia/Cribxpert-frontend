import { IMAGES } from './imageConstants';

export interface RatingDistribution {
  stars: number;
  count: number;
  progressImage: string;
}

export const RATING_DISTRIBUTION: RatingDistribution[] = [
  {
    stars: 5,
    count: 923,
    progressImage: IMAGES.progressOne,
  },
  {
    stars: 4,
    count: 602,
    progressImage: IMAGES.progressTwo,
  },
  {
    stars: 3,
    count: 336,
    progressImage: IMAGES.progressThree,
  },
  {
    stars: 2,
    count: 216,
    progressImage: IMAGES.progressFour,
  },
  {
    stars: 1,
    count: 96,
    progressImage: IMAGES.progressFive,
  },
];
