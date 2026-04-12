export interface NearbyLocation {
  name: string;
  distance: string;
  isTransport: boolean;
}

export const NEARBY_LOCATIONS: NearbyLocation[] = [
  {
    name: "Trans Amusement Children's Museum",
    distance: '2 min walk',
    isTransport: false,
  },
  {
    name: 'Ventura Mall',
    distance: '10 min walk',
    isTransport: false,
  },
  {
    name: 'National Airport Station',
    distance: '24 min walk',
    isTransport: true,
  },
];
