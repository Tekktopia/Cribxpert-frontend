import { ListingCardStepsProps } from '../ListingCardSteps';
// ⬇️ Export your step data here
export const stepData: ListingCardStepsProps[] = [
  {
    title: 'Property Type',
    description:
      'Select the type of property you’re listing. This helps guests understand what kind of space they will be looking for',
    image: '/icons/house.png',
  },
  {
    title: 'Property Details',
    description: 'Tell us about your space',
    image: '/icons/house.png',
  },
  {
    title: 'Property Location',
    description: 'Let guests know where to find you',
    image: '/images/step3.png',
  },
  {
    title: 'Amenities',
    description:
      'Select all the amenities available at your property. You must select at least one.',
    image: '/images/step4.png',
  },
  {
    title: 'Property Photos',
    description:
      'Upload at least 5 high quality photos of your property, include image of all major area such as living room, bedrooms, bathrooms, kitchen and exterior',
    image: '/images/step5.png',
  },
  {
    title: 'Property Description',
    description:
      'Write a detailed description of your property. Include unique features , nearby attractions,and anything that makes your place special. (Maximum 500 words',
    image: '/images/step6.png',
  },
  {
    title: 'Pricing & Availability',
    description: 'Set your rates and choose when your property is available',
    image: '/images/step7.png',
  },
  {
    title: 'House Rules',
    description:
      'Set clear house rules to help guests understand what is and isn’t allowed at your property',
    image: '/images/step8.png',
  },
];
