import { ListingCardStepsProps } from '../ListingCardSteps';
// ⬇️ Export your step data here
export const stepData: ListingCardStepsProps[] = [
  {
    title: 'Property Type',
    description:
      'Select the type of property you’re listing. This helps guests understand what kind of space they will be looking for',
    image: '/other-icons/greenhouse.svg',
  },
  {
    title: 'Property Details',
    description: 'Tell us about your space',
    image: '/other-icons/greenhouse.svg',
  },
  {
    title: 'Property Location',
    description: 'Let guests know where to find you',
    image: '/other-icons/location-icon.svg',
  },
  {
    title: 'Amenities',
    description:
      'Select all the amenities available at your property. You must select at least one.',
    image: '/other-icons/amenities-icon.svg',
  },
  {
    title: 'Property Photos',
    description:
      'Upload at least 5 high quality photos of your property, include image of all major area such as living room, bedrooms, bathrooms, kitchen and exterior',
    image: '/other-icons/photo-icon.svg',
  },
  {
    title: 'Property Description',
    description:
      'Write a detailed description of your property. Include unique features , nearby attractions,and anything that makes your place special. (Maximum 500 words',
    image: '/other-icons/description-icon.svg',
  },
  {
    title: 'Pricing & Availability',
    description: 'Set your rates and choose when your property is available',
    image: '/other-icons/pricing-icon.svg',
  },
  {
    title: 'House Rules',
    description:
      'Set clear house rules to help guests understand what is and isn’t allowed at your property',
    image: '/other-icons/rules-icon.svg',
  },
];
