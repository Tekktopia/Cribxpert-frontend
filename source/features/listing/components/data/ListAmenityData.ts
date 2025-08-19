import { Amenity } from '../ListAmenity';

export const AmenityData: Omit<Amenity, 'checked' | 'onChange'>[] = [
  {
    inputProps: { id: 'wifi', name: 'wifi' },
    icon: '/icons/wifi.png',
    description: 'Wi-Fi',
  },
  {
    inputProps: { id: 'kitchen', name: 'kitchen' },
    icon: '/icons/kitchen.png',
    description: 'Kitchen',
  },
  {
    inputProps: { id: 'airConditioning', name: 'airConditioning' },
    icon: '/icons/airConditioning.png',
    description: 'Air-Conditioning',
  },
  {
    inputProps: { id: 'washer', name: 'washer' },
    icon: '/icons/washer.png',
    description: 'Washer',
  },
  {
    inputProps: { id: 'gym', name: 'gym' },
    icon: '/icons/gym.png',
    description: 'Gym',
  },
  {
    inputProps: { id: 'workspace', name: 'workspace' },
    icon: '/icons/workspace.png',
    description: 'Workspace',
  },
  {
    inputProps: { id: 'firstAidKit', name: 'firstAidKit' },
    icon: '/icons/firstAidKit.png',
    description: 'First Aid Kit',
  },
  {
    inputProps: { id: 'parking', name: 'parking' },
    icon: '/icons/parking.png',
    description: 'Parking',
  },
  {
    inputProps: { id: 'tv', name: 'tv' },
    icon: '/icons/tv.png',
    description: 'TV',
  },
  {
    inputProps: { id: 'heating', name: 'heating' },
    icon: '/icons/heating.png',
    description: 'Heating',
  },
  {
    inputProps: { id: 'dryer', name: 'dryer' },
    icon: '/icons/dryer.png',
    description: 'Dryer',
  },
  {
    inputProps: { id: 'hotTub', name: 'hotTub' },
    icon: '/icons/hotTub.png',
    description: 'Hot-Tub',
  },
  {
    inputProps: { id: 'breakfast', name: 'breakfast' },
    icon: '/icons/breakfast.png',
    description: 'Breakfast',
  },
  {
    inputProps: { id: 'fireExtinguisher', name: 'fireExtinguisher' },
    icon: '/icons/fireExtinguisher.png',
    description: 'Fire-Extinguisher',
  },
  {
    inputProps: { id: 'smokeAlarm', name: 'smokeAlarm' },
    icon: '/icons/smokeAlarm.png',
    description: 'Smoke Alarm',
  },
  {
    inputProps: { id: 'pool', name: 'pool' },
    icon: '/icons/pool.png',
    description: 'Pool',
  },
];
