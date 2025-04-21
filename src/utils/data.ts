import allShortLet from '@/assets/icons/all-shorlet.png';
import otherFilterIcon from '@/assets/icons/otherFilterIcon.png';
import propertyImage from '@/assets/images/property-image.jpeg';
import { PropertyListingProps } from '@/types';

const SAMPLE_DATA: PropertyListingProps[] = [
  {
    id:1,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.76,
    price: 620,
    description: '3 bedroom apartment ',
  },
  {
    id:2,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-a',
    location: 'Federal Capital Territory Gombe',
    rating: 4.85,
    description: '3 bedroom apartment ',
    price: 750,
  },
  {
    id:3,
    image: propertyImage,

    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.92,

    price: 900,
    description: '3 bedroom apartment ',
  },
  {
    id:4,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.78,

    price: 680,

    description: '3 bedroom apartment ',
  },
  {
    id:5,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.88,
    description: '3 bedroom apartment',
    price: 1200,
  },
  {
    id:6,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.95,
    description: '3 bedroom apartment ',
    price: 2500,
  },
  {
    id:7,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.81,
    description: '3 bedroom apartment ',
    price: 1500,
  },
  {
    id:8,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.89,
    description: '3 bedroom apartment ',
    price: 850,
  },
  {
    id:9,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.83,

    price: 720,
    description: '3 bedroom apartment ',
  },
  {
    id:10,
    image: propertyImage,
    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.9,
    description: '3 bedroom apartment ',
    price: 780,
  },
  {
    id:11,
    image: propertyImage,

    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.92,

    price: 900,
    description: '3 bedroom apartment ',
  },
  {
    id:12,
    image: propertyImage,

    propertyName: 'Makinwaa’s Cottage - Newly Remodeled-',
    location: 'Federal Capital Territory Gombe',
    rating: 4.92,

    price: 900,
    description: '3 bedroom apartment ',
  },
];

const Filter = [
  {
    name: 'All Short-let',
    image: allShortLet,
  },
  {
    name: 'House',
    image: otherFilterIcon,
  },
  {
    name: 'Apartment',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Cottage',
    image: otherFilterIcon,
  },
  {
    name: 'Cabin',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
];

export { SAMPLE_DATA, Filter };
