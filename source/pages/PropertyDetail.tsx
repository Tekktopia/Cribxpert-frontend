import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import AmenitiesSection from '@/features/properties/components/AmenitiesSection';
import BookingForm from '@/features/bookings/components/BookingForm';
import { PropertyListing } from '@/types';
import { selectAllListings } from '@/features/properties/listingSlice';
import { useDispatch } from 'react-redux';
import { setCurrentListing } from '@/features/properties';
import { selectCurrentUser } from '@/features/auth/authSlice';
import {
  useCreateReviewMutation,
  useGetReviewsByListingIdQuery,
} from '@/features/review/reviewService';

// Import our new components
import PropertyGallery from '@/features/properties/components/PropertyGallery';
import PropertyHeader from '@/features/properties/components/PropertyHeader';
import PropertyOverview from '@/features/properties/components/PropertyOverview';
import PropertyDescription from '@/features/properties/components/PropertyDescription';
import PropertyRules, { Rule } from '@/features/properties/components/PropertyRules';
import PropertyPolicies from '@/features/properties/components/PropertyPolicies';
import PropertyRatings from '@/features/properties/components/PropertyRatings';
import CustomerReviews from '@/features/properties/components/CustomerReviews';
import LeaveReviewForm from '@/features/properties/components/LeaveReviewForm';
import SimilarProperties from '@/features/properties/components/SimilarProperties';
import useAlert from '@/hooks/useAlert';

// Import mock data from utility files
import {
  CANCELLATION_PERIODS,
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
  const showAlert = useAlert();
  // Fetch listings from the store
  const rawListings = useSelector(selectAllListings);

  const listings = useMemo(() => rawListings || [], [rawListings]);

  // Find the property that matches the URL parameter
  const property = listings.find(
    (item: PropertyListing) => createSlug(item.name) === name
  );

  const dispatch = useDispatch();

  // Get current user for booking
  const currentUser = useSelector(selectCurrentUser);

  // Add review mutations and queries
  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation();
  const { data: apiReviews, refetch: refetchReviews } = useGetReviewsByListingIdQuery(
    property?._id || '',
    {
      skip: !property?._id,
      // Ensure the query refetches when tags are invalidated
      refetchOnMountOrArgChange: true,
    }
  );

  // Transform API reviews to match CustomerReviews component format
  const transformedReviews = useMemo(() => {
    // Only use API reviews, never fall back to dummy data
    if (!apiReviews?.reviews || !Array.isArray(apiReviews.reviews)) {
      return [];
    }

    return apiReviews.reviews.map((review) => {
      // Extract user info from populated userId
      let authorName = 'Anonymous';
      let authorEmail = '';
      let userIdString = '';

      if (review.userId) {
        if (typeof review.userId === 'object' && review.userId !== null) {
          // userId is populated (object with fullName and email)
          authorName = (review.userId as { fullName?: string }).fullName || 'Anonymous';
          authorEmail = (review.userId as { email?: string }).email || '';
          userIdString = (review.userId as { _id?: string })._id || '';
        } else if (typeof review.userId === 'string') {
          // userId is just an ID string
          userIdString = review.userId;
        }
      }

      return {
        _id: review._id,
        text: review.review,
        author: authorName,
        email: authorEmail,
        rating: review.rating,
        userId: userIdString || review.userId,
        listingId: property?._id,
        image: undefined, // API doesn't provide images yet
      };
    });
  }, [apiReviews, property?._id]);

  // Handle booking submission
  const handleBookingSubmit = (formData: {
    checkInDate: Date;
    checkOutDate: Date;
    guests: number;
  }) => {
    if (!property || !currentUser) return;

    const numberOfNights = Math.ceil(
      (formData.checkOutDate.getTime() - formData.checkInDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    const basePrice = numberOfNights * property.basePrice;
    const cleaningFee = property.cleaningFee || 0;
    const securityDeposit = property.securityDeposit || 0;
    const serviceFee = Math.round((basePrice + cleaningFee + securityDeposit) * 0.075);
    const totalPrice = basePrice + cleaningFee + securityDeposit + serviceFee;

    const bookingData = {
      propertyId: property._id,
      propertyName: property.name,
      startDate: formData.checkInDate,
      endDate: formData.checkOutDate,
      guests: formData.guests,
      totalPrice,
      userId: currentUser._id,
      propertyImages: property.listingImg.map((img) => img.fileUrl).filter(Boolean),
      basePrice,
      cleaningFee,
      securityDeposit,
      maxGuests: property.guestNo,
    };

    navigate('/book-now', { state: bookingData });
  };

  // Handle review submission
  const handleReviewSubmit = async (reviewData: {
    rating: number;
    review: string;
  }) => {
    if (!property || !currentUser) {
      showAlert({
        title: 'Please log in to leave a review',
        icon: 'error',
      });
      return;
    }

    try {
      const reviewPayload = {
        rating: reviewData.rating,
        review: reviewData.review,
        listing: property._id,
      };

      await createReview(reviewPayload).unwrap();
      showAlert({
        title: 'Review submitted successfully!',
        icon: 'success',
      });
    } catch (error) {
      console.error('Review submission failed:', error);
      showAlert({
        title: 'Failed to submit review. Please try again.',
        icon: 'error',
      });
    }
  };

  // Calculate ratings from reviews
  const calculateRatings = useMemo(() => {
    if (!apiReviews?.reviews || apiReviews.reviews.length === 0) {
      return {
        averageRating: 0,
        totalRatings: 0,
        distribution: [0, 0, 0, 0, 0],
      };
    }

    const reviews = apiReviews.reviews;
    const totalRatings = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = parseFloat((sum / totalRatings).toFixed(1));

    // Calculate distribution
    const distribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[5 - review.rating]++;
      }
    });

    return {
      averageRating,
      totalRatings,
      distribution,
    };
  }, [apiReviews]);

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

  // Get similar properties (same category, excluding current one)
  const similarProperties = useMemo(() => {
    if (!property) return listings.slice(0, 3);

    // Get current property's type ID for comparison
    const currentPropertyTypeId = typeof property.propertyType === 'object' && 'name' in property.propertyType
      ? (property.propertyType as { _id: string })._id
      : (typeof property.propertyType === 'string' ? property.propertyType : '');

    // Filter listings by same property type, excluding current property
    const sameCategoryProperties = listings.filter((item: PropertyListing) => {
      if (item._id === property._id) return false; // Exclude current property

      // Get item's property type ID
      const itemPropertyTypeId = typeof item.propertyType === 'object' && 'name' in item.propertyType
        ? (item.propertyType as { _id: string })._id
        : (typeof item.propertyType === 'string' ? item.propertyType : '');

      // Compare property type IDs
      return itemPropertyTypeId === currentPropertyTypeId && itemPropertyTypeId !== '';
    });

    // Return up to 3 similar properties, or fallback to any properties if none match
    return sameCategoryProperties.length > 0
      ? sameCategoryProperties.slice(0, 3)
      : listings.filter((item: PropertyListing) => item._id !== property._id).slice(0, 3);
  }, [property, listings]);

  // Show loading or not found message if no property
  if (!property) {
    return (
      <section className="max-w-screen-xl mx-auto overflow-hidden">
        <div className="flex justify-center items-center h-[60vh] mt-[130px]">
          <p className="text-xl text-gray-500">Property not found</p>
        </div>
      </section>
    );
  }
  // Prepare data for our components
  const propertyImages = property.listingImg.map((img) => img.fileUrl);

  type HouseRule =
    | string
    | {
      _id?: string;
      name: string;
      icon?: string | { fileUrl: string;[key: string]: unknown };
      description?: string;
    };

  const mappedRules: Rule[] = (property.houseRules || []).map((rule: HouseRule) => {
    if (typeof rule === 'string') {
      return {
        icon: '/icons/bell.svg', // fallback icon
        title: rule,             // string rule
        description: '',         // optional
      };
    } else {
      // Handle icon as object with fileUrl or as string
      const iconUrl = typeof rule.icon === 'object' && rule.icon?.fileUrl
        ? rule.icon.fileUrl
        : (typeof rule.icon === 'string' ? rule.icon : '/icons/bell.svg');

      return {
        icon: iconUrl,
        title: rule.name,
        description: rule.description || '',
      };
    }
  });

  // Add this helper above the return
  const listingOwnerId = property.userId
    ? typeof property.userId === 'object'
      ? property.userId._id
      : property.userId
    : null;

    const isExpired = property.avaliableUntil
    ? new Date() > new Date(property.avaliableUntil)
    : false;
    
  const isOwner = currentUser?._id && listingOwnerId
    ? currentUser._id === listingOwnerId
    : false;



  return (
    <section className="max-w-screen-xl mx-auto overflow-hidden">
      {/* Property Gallery Component */}
      <PropertyGallery images={propertyImages} propertyName={property.name} />
      {/* Property Header Component */}
      <PropertyHeader />
      {/* Property Overview Component */}
      <PropertyOverview />
      <section className="py-4 sm:py-6 px-4 sm:px-10">
        <div className="flex flex-col lg:flex-row justify-around gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2">
            {/* Description Component */}
            <PropertyDescription description={property.description} />

            {/* Amenities Available Section */}
            <div className="mt-2 sm:mt-4">
              <h3 className="text-[#050505] font-[500] text-lg sm:text-xl mb-4 sm:mb-5">
                Amenities Available
              </h3>
              <AmenitiesSection />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="">
              {isOwner ? (
                <div className="w-full max-w-[480px] lg:ml-auto bg-white border border-[#E6E6E6] rounded-lg p-5 text-center">
                  <div className="py-8">
                    <p className="text-[#1D5C5C] font-semibold text-[16px] mb-2">
                      This is your listing
                    </p>
                    <p className="text-[#6F6F6F] text-[14px]">
                      You cannot book your own property.
                    </p>
                  </div>
                </div>
              ) : isExpired ? (
                <div className="w-full max-w-[480px] lg:ml-auto bg-white border border-[#E6E6E6] rounded-lg p-5 text-center">
                  <div className="py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#999] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-[#313131] font-semibold text-[16px] mb-2">
                      No Longer Available
                    </p>
                    <p className="text-[#6F6F6F] text-[14px]">
                      This listing's availability period has ended and can no longer be booked.
                    </p>
                  </div>
                </div>
              ) : (
                <BookingForm
                  property={property}
                  onBookingSubmit={handleBookingSubmit}
                  isLoggedIn={currentUser !== null}
                />
              )}
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
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-1/2">
              <h2 className="text-lg sm:text-[20px] text-[#040404] font-[500] mb-4 sm:mb-6">
                Verified Ratings {calculateRatings.totalRatings > 0 && `(${calculateRatings.totalRatings})`}
              </h2>
              {/* Ratings Component */}
              <PropertyRatings
                rating={calculateRatings.averageRating}
                totalRatings={calculateRatings.totalRatings}
                ratingDistribution={calculateRatings.distribution}
              />
            </div>

            <div className="w-full lg:w-1/2">
              {/* Leave a Review Form */}
              <LeaveReviewForm
                onSubmit={handleReviewSubmit}
                isSubmitting={isCreatingReview}
              />
            </div>
          </div>

          {/* Customer Reviews Component */}
          <div className="mt-6 sm:mt-8">
            <CustomerReviews
              reviews={transformedReviews}
              listingId={property._id}
              onReviewDeleted={async () => {
                // Force refetch the reviews query
                await refetchReviews();
              }}
            />
          </div>
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
