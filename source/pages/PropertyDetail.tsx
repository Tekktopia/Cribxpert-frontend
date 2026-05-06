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
import { calculatePricing } from '@/utils/pricingUtils';

// Import our new components
import PropertyGallery from '@/features/properties/components/PropertyGallery';
import PropertyHeader from '@/features/properties/components/PropertyHeader';
import PropertyDescription from '@/features/properties/components/PropertyDescription';
import HouseLayout from '@/features/properties/components/HouseLayout';
import PropertyRules, { Rule } from '@/features/properties/components/PropertyRules';
import PropertyPolicies from '@/features/properties/components/PropertyPolicies';
import PropertyRatings from '@/features/properties/components/PropertyRatings';
import CustomerReviews from '@/features/properties/components/CustomerReviews';
import LeaveReviewForm from '@/features/properties/components/LeaveReviewForm';
import SimilarProperties from '@/features/properties/components/SimilarProperties';
import useAlert from '@/hooks/useAlert';
import Footer from '@/shared/components/layout/Footer';

// Import mock data from utility files
import {
  CANCELLATION_PERIODS,
  DAMAGE_POLICY
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

    const cleaningFee = property.cleaningFee || 0;
    const securityDeposit = property.securityDeposit || 0;
    const { totalPrice } = calculatePricing({
      basePrice: property.basePrice,
      cleaningFee,
      securityDeposit,
      numberOfNights,
    });

    const bookingData = {
      propertyId: property._id,
      propertyName: property.name,
      startDate: formData.checkInDate,
      endDate: formData.checkOutDate,
      guests: formData.guests,
      totalPrice,
      userId: currentUser.id,
      propertyImages: property.listingImg.map((img) => img.fileUrl).filter(Boolean),
      basePrice: property.basePrice,
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
    // If listings are still loading, show a loading state instead of "not found"
    if (listings.length === 0) {
      return (
        <section className="max-w-screen-2xl mx-auto overflow-hidden min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="text-neutral-500 font-medium">Loading premium space...</p>
          </div>
        </section>
      );
    }

    return (
      <section className="max-w-screen-2xl mx-auto overflow-hidden min-h-[70vh] flex items-center justify-center">
        <p className="text-xl text-neutral-500">Property not found</p>
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
    
  const isOwner = currentUser?.id && listingOwnerId
    ? currentUser.id === listingOwnerId
    : false;



  return (
    <section className="w-full overflow-hidden bg-white min-h-screen">
      <div className="content-container pt-12 pb-24">
        {/* Navigation / Breadcrumbs */}
        <div className="flex justify-between items-center mb-12 py-4 border-y border-neutral-100">
          <div className="flex gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">
            <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/')}>Main</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/discover')}>Discover</span>
            <span>/</span>
            <span className="text-primary">Project Details</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <button className="flex items-center gap-2 hover:text-primary transition-colors group" onClick={() => navigate(-1)}>
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors group">
              Next <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Cinematic Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-tighter text-neutral-900 leading-none">
            {property.name.split(' ').length > 2 
              ? <>{property.name.split(' ').slice(0, 2).join(' ')} <span className="font-bold">№{property._id.slice(-2)}</span></>
              : <>{property.name} <span className="font-bold">№{property._id.slice(-2)}</span></>
            }
          </h1>
        </div>

        {/* Property Gallery Component - Hero Image */}
        <PropertyGallery images={propertyImages} propertyName={property.name} />

        {/* House Layout Component - Specs and Floor Plan */}
        <HouseLayout />

        <section className="py-12">
        <div className="flex flex-col lg:flex-row justify-around gap-6 lg:gap-8">
          <div className="w-full lg:w-3/5">
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-6 uppercase">
              The atmosphere <br/> <span className="font-medium">of a comfortable life</span>
            </h2>
            {/* Description Component */}
            <PropertyDescription description={property.description} />

            {/* Amenities Available Section */}
            <div className="mt-16">
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-8 border-b border-neutral-100 pb-4">
                Amenities & Features
              </h3>
              <AmenitiesSection />
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="sticky top-32">
              {isOwner ? (
                <div className="w-full bg-white border border-neutral-100 p-8 text-center shadow-sm">
                  <div className="py-4">
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">
                      Host Controls
                    </p>
                    <p className="text-neutral-500 text-sm">
                      You are viewing your own luxury listing.
                    </p>
                  </div>
                </div>
              ) : isExpired ? (
                <div className="w-full bg-white border border-neutral-100 p-8 text-center shadow-sm">
                  <div className="py-4">
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">
                      Archived Listing
                    </p>
                    <p className="text-neutral-500 text-sm">
                      This premium space is currently unavailable.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="shadow-2xl shadow-neutral-100">
                  <BookingForm
                    property={property}
                    onBookingSubmit={handleBookingSubmit}
                    isLoggedIn={currentUser !== null}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Extra Visual Section: "Notice every detail" */}
        <div className="mt-16 pt-16 border-t border-neutral-100">
          <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-8 uppercase">
            Notice <span className="font-medium">every detail</span>
          </h2>
          <div className="aspect-video relative overflow-hidden bg-neutral-100 group cursor-pointer">
            <img 
              src={propertyImages[1] || propertyImages[0]} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Feature details"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-neutral-100">
          <PropertyHeader />
        </div>
        {/* House Rules Component */}
        <PropertyRules rules={mappedRules} /> {/* Policies Component */}
        <PropertyPolicies
          damagePolicy={DAMAGE_POLICY}
          cancellationPeriods={CANCELLATION_PERIODS}
        />
        {/* Ratings and Reviews Section */}
        <div className="py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-12 uppercase">
                Verified <span className="font-bold">Ratings</span>
                {calculateRatings.totalRatings > 0 && (
                  <span className="text-neutral-300 font-light ml-4 normal-case tracking-normal">
                    ({calculateRatings.totalRatings} Reviews)
                  </span>
                )}
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
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};
export default PropertyDetail;
