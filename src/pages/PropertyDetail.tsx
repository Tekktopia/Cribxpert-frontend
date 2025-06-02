import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AmenitiesSection from '@/components/AmenitiesSection';
import BookingForm from '@/components/BookingForm';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { PropertyListingProps } from '@/types';

// Import our new components
import PropertyGallery from '@/components/property-details/PropertyGallery';
import PropertyHeader from '@/components/property-details/PropertyHeader';
import PropertyOverview from '@/components/property-details/PropertyOverview';
import PropertyLocation from '@/components/property-details/PropertyLocation';
import PropertyBedrooms from '@/components/property-details/PropertyBedrooms';
import PropertyDescription from '@/components/property-details/PropertyDescription';
import PropertyRules from '@/components/property-details/PropertyRules';
import PropertyPolicies from '@/components/property-details/PropertyPolicies';
import PropertyRatings from '@/components/property-details/PropertyRatings';
import CustomerReviews from '@/components/property-details/CustomerReviews';
import SimilarProperties from '@/components/property-details/SimilarProperties';

// Use constant paths instead of imports
const IMAGES = {
  // Icons
  bedroom: '/icons/bedroom.png',
  guest: '/icons/guest.png',
  house: '/icons/house.png',
  iconStarLight: '/icons/Icon-star-light.png',
  progressOne: '/icons/progressFirsr.png',
  progressTwo: '/icons/progressTwo.png',
  progressThree: '/icons/progressThree.png',
  progressFour: '/icons/progressFour.png',
  progressFive: '/icons/progressFive.png',
  star: '/icons/star.png',
  bathroom: '/icons/bathroom.png',
  share: '/icons/share.png',
  airportStation: '/icons/airport-station.png',
  arrowright: '/icons/arrow-right.png',
  carIcon: '/icons/Car-icon.png',
  location: '/icons/location.png',

  // Gallery images
  GalleryOne: '/images/galleryOne.jpeg',
  GalleryTwo: '/images/GallerTwo.jpeg',
  GalleryThree: '/images/GalleryThree.jpeg',
  GalleryFour: '/images/GalleryFour.jpeg',
  GalleryFive: '/images/GalleryFive.png',

  // Other images
  kingBed: '/images/kingBed.png',
  doubleBed: '/images/doubleBed.png',
  map: '/images/map.png',
};

// Helper function to convert property name to URL slug
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

const PropertyDetail = ({
  listings = [],
}: {
  listings?: PropertyListingProps[];
}) => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  // Find the property that matches the URL parameter
  const property = listings.find(
    (item) => createSlug(item.propertyName) === name
  );

  // Get similar properties (excluding current one)
  const similarProperties = property
    ? listings.filter((item) => item.id !== property.id).slice(0, 3)
    : listings.slice(0, 3);

  useEffect(() => {
    // If property is not found, we could redirect to 404 or home
    if (!property && listings.length > 0) {
      navigate('/404', { replace: true });
    }
  }, [property, navigate, listings]);

  // Show loading or not found message if no property
  if (!property) {
    return (
      <section className="max-w-screen-xl mx-auto overflow-hidden">
        <Header />
        <div className="flex justify-center items-center h-[60vh] mt-[130px]">
          <p className="text-xl text-gray-500">Property not found</p>
        </div>
      </section>
    );
  }

  // Prepare data for our components
  const propertyImages = property.images?.length
    ? property.images
    : [property.image];

  // Prepare bedroom data
  const bedrooms = [
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

  // Prepare nearby locations data
  const nearbyLocations = [
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

  // Prepare house rules data
  const houseRules = [
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

  // Prepare cancellation policies
  const cancellationPeriods = [
    {
      deadline: 'Before Jan 17',
      refundType: 'FULL REFUND',
      description:
        "Cancel your reservation before Jan 17 at 11:59 PM, and you'll get a full refund. Times are based on the property's local time.",
    },
    {
      deadline: 'Before Jan 24',
      refundType: 'PARTIAL REFUND',
      description:
        "If you cancel your reservation before Jan 24 at 11:59 PM, you'll get a refund of 50% of the amount paid (minus the service fee). Times are based on the property's local time.",
    },
    {
      deadline: 'After Jan 24',
      refundType: 'NO REFUND',
      description: "After that, you won't get a refund.",
    },
  ];

  // Prepare ratings distribution
  const ratingDistribution = [
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

  // Prepare customer reviews
  const customerReviews = [
    {
      text: 'We offer unparalleled transparency in revenue collection processes. With detailed and real-time reporting, every transaction is documented and accessible.',
      author: 'Amori Ademakinwa',
    },
    {
      text: 'The property exceeded all expectations. Clean, spacious, and beautifully decorated. The host was very responsive and made our stay comfortable. Will definitely return next time.',
      author: 'John Thompson',
    },
    {
      text: 'Amazing location with great amenities nearby. The check-in process was smooth and the place was immaculate. Perfect for our family vacation.',
      author: 'Sarah Parker',
    },
    {
      text: 'The apartment was exactly as described, even better. Very comfortable and the location was perfect for exploring the city. The host provided excellent recommendations for local restaurants.',
      author: 'Michael Johnson',
    },
    {
      text: 'We had a wonderful stay at this property. The kitchen was well-equipped, the beds were comfortable, and the living area was spacious. Would highly recommend for families or groups.',
      author: 'Lisa Williams',
    },
    {
      text: 'Great value for money! The property was clean, spacious, and had all the amenities we needed. The host was very accommodating and responded quickly to our questions.',
      author: 'David Brown',
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto overflow-hidden">
      <Header /> <HeaderSpacer />
      {/* Property Gallery Component */}
      <PropertyGallery
        images={propertyImages}
        propertyName={property.propertyName}
      />
      {/* Property Header Component */}
      <PropertyHeader
        propertyName={property.propertyName}
        description={property.description}
        rating={property.rating}
        totalRatings={115}
        shareIconUrl={IMAGES.share}
      />
      {/* Property Overview Component */}
      <PropertyOverview
        bedrooms={3}
        bathrooms={3}
        guests={6}
        area="100 sq ft"
        icons={{
          bedroom: IMAGES.bedroom,
          bathroom: IMAGES.bathroom,
          guest: IMAGES.guest,
          house: IMAGES.house,
        }}
      />{' '}
      <section className="py-4 sm:py-6 px-4 sm:px-10">
        <div className="flex flex-col lg:flex-row justify-around gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2">
            {/* Amenities Section */}
            <AmenitiesSection />

            {/* Location Component */}
            <PropertyLocation
              mapImage={IMAGES.map}
              address="Federal Capital Territory Gombe"
              nearbyLocations={nearbyLocations}
              icons={{
                location: IMAGES.location,
                transport: IMAGES.airportStation,
                arrowRight: IMAGES.arrowright,
              }}
            />

            {/* Bedrooms Component */}
            <PropertyBedrooms bedrooms={bedrooms} />

            {/* Description Component */}
            <PropertyDescription description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In est nisl, dictum at ante nec, rutrum finibus odio. Pellentesque pulvinar, justo venenatis pulvinar feugiat, tortor nunc cursus elit, sit amet porttitor turpis ante a lacus. Sed blandit lectus odio. Vestibulum consequat a ante vel pulvinar. Mauris efficitur eros convallis nisi venenatis, vel aliquam leo interdum. Proin vel dapibus ipsum. Nulla vel urna id erat pretium rhoncus. Morbi maximus tellus a urna commodo, at pharetra mauris cursus. In hac habitasse platea dictumst. Nunc odio nisi, dignissim sed mauris ac, accumsan finibus nisl. Nullam aliquam at neque a lacinia. Ut euismod mi in metus pharetra pellentesque. Nullam in diam consectetur, vulputate metus non, volutpat elit" />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="sticky top-[80px]">
              <BookingForm />
            </div>
          </div>
        </div>

        {/* House Rules Component */}
        <PropertyRules rules={houseRules} />

        {/* Policies Component */}
        <PropertyPolicies
          damagePolicy="You will be responsible for any damage to the rental property caused by you or your party during your stay, including but not limited to broken items, stains, or structural harm. Please report any accidents or damages immediately to ensure prompt resolution."
          cancellationPeriods={cancellationPeriods}
          importantInfo="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        />

        {/* Ratings and Reviews Section */}
        <div className="py-6 sm:py-8 px-4 md:px-10">
          {/* Ratings Component */}
          <PropertyRatings
            rating={4}
            totalRatings={1394}
            ratingDistribution={ratingDistribution}
          />

          {/* Customer Reviews Component */}
          <CustomerReviews reviews={customerReviews} />
        </div>

        {/* Similar Properties Component */}
        <SimilarProperties
          propertyName={property.propertyName}
          similarProperties={similarProperties}
        />
      </section>
    </section>
  );
};
export default PropertyDetail;
