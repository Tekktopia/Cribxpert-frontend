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

// Import mock data from utility files
import {
  IMAGES,
  BEDROOMS,
  NEARBY_LOCATIONS,
  HOUSE_RULES,
  CANCELLATION_PERIODS,
  RATING_DISTRIBUTION,
  CUSTOMER_REVIEWS,
  PROPERTY_DESCRIPTION,
  DAMAGE_POLICY,
  IMPORTANT_INFO,
} from '@/utils/mockData';

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
            <AmenitiesSection /> {/* Location Component */}
            <PropertyLocation
              mapImage={IMAGES.map}
              address="Federal Capital Territory Gombe"
              nearbyLocations={NEARBY_LOCATIONS}
              icons={{
                location: IMAGES.location,
                transport: IMAGES.airportStation,
                arrowRight: IMAGES.arrowright,
              }}
            />
            {/* Bedrooms Component */} <PropertyBedrooms bedrooms={BEDROOMS} />
            {/* Description Component */}
            <PropertyDescription description={PROPERTY_DESCRIPTION} />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="sticky top-[80px]">
              <BookingForm />
            </div>
          </div>
        </div>{' '}
        {/* House Rules Component */}
        <PropertyRules rules={HOUSE_RULES} /> {/* Policies Component */}
        <PropertyPolicies
          damagePolicy={DAMAGE_POLICY}
          cancellationPeriods={CANCELLATION_PERIODS}
          importantInfo={IMPORTANT_INFO}
        />
        {/* Ratings and Reviews Section */}
        <div className="py-6 sm:py-8 px-4 md:px-10">
          {' '}
          {/* Ratings Component */}
          <PropertyRatings
            rating={4}
            totalRatings={1394}
            ratingDistribution={RATING_DISTRIBUTION}
          />
          {/* Customer Reviews Component */}
          <CustomerReviews reviews={CUSTOMER_REVIEWS} />
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
