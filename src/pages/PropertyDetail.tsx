import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import AmenitiesSection from '@/components/AmenitiesSection';
import BookingForm from '@/components/BookingForm';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { PropertyListing } from '@/types';
import { selectAllListings } from '@/features/listing/listingSlice';
import { useDispatch } from 'react-redux';
import { setCurrentListing } from '@/features/listing';

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
  CANCELLATION_PERIODS,
  RATING_DISTRIBUTION,
  CUSTOMER_REVIEWS,
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

const PropertyDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  // Fetch listings from the store
  const rawListings = useSelector(selectAllListings);

  const listings = useMemo(() => rawListings || [], [rawListings]);

  // Find the property that matches the URL parameter
  const property = listings.find(
    (item: PropertyListing) => createSlug(item.name) === name
  );

  const dispatch = useDispatch();

  // Log the selected property to the console
  useEffect(() => {
    if (listings.length === 0) return; // Wait for listings to load
    if (property) {
      dispatch(setCurrentListing(property));
      // console.log('Selected property:', property);
    } else {
      navigate('/404', { replace: true });
    }
  }, [dispatch, navigate, property, listings]);

  // Get similar properties (excluding current one)
  const similarProperties = property
    ? listings
        .filter((item: PropertyListing) => item._id !== property._id)
        .slice(0, 3)
    : listings.slice(0, 3);

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
  const propertyImages = property.listingImg.map((img) => img.fileUrl);

  const mappedRules = (property.houseRules || []).map((rule) => ({
    icon: '/icons/bell.svg', // Assuming a default icon, replace with actual icon if available
    title: rule,
    description: '',
  }));

  return (
    <section className="max-w-screen-xl mx-auto overflow-hidden">
      <Header /> <HeaderSpacer />
      {/* Property Gallery Component */}
      <PropertyGallery images={propertyImages} propertyName={property.name} />
      {/* Property Header Component */}
      <PropertyHeader />
      {/* Property Overview Component */}
      <PropertyOverview />
      <section className="py-4 sm:py-6 px-4 sm:px-10">
        <div className="flex flex-col lg:flex-row justify-around gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2">
            {/* Amenities Section */}
            <AmenitiesSection />

            {/* Location Component */}
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

            <PropertyBedrooms bedrooms={BEDROOMS} />
            {/* Description Component */}
            <PropertyDescription description={property.description} />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="sticky top-[80px]">
              <BookingForm property={property} />
            </div>
          </div>
        </div>{' '}
        {/* House Rules Component */}
        <PropertyRules rules={mappedRules} /> {/* Policies Component */}
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
          propertyName={property.name}
          similarProperties={similarProperties}
        />
      </section>
    </section>
  );
};
export default PropertyDetail;
