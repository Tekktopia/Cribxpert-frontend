import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useDeleteReviewMutation } from '@/features/review/reviewService';
import useAlert from '@/hooks/useAlert';
import { Trash2 } from 'lucide-react';

interface CustomerReview {
  _id?: string;
  text: string;
  author: string;
  email?: string;
  rating: number;
  image?: string;
  userId?: string | { _id: string; fullName: string; email: string };
  listingId?: string;
}

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  listingId?: string; // Add listingId prop
  onReviewDeleted?: () => void; // Callback to refetch reviews after deletion
}

// Reusable Review Card Component
const ReviewCard: React.FC<{ 
  review: CustomerReview; 
  className?: string;
  isOwnReview?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
}> = ({
  review,
  className = '',
  isOwnReview = false,
  onDelete,
  isDeleting = false,
}) => (
  <div
    className={`p-6 bg-white border transition-all duration-500 relative w-full ${
      isOwnReview 
        ? 'border-primary bg-primary/5 shadow-premium' 
        : 'border-neutral-100 hover:border-neutral-200'
    } ${className}`}
  >
    {/* Top Right Actions - Delete Button and Badge */}
    {isOwnReview && (
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-2 z-10">
        {/* Delete Button for Own Reviews */}
        {onDelete && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-1.5 sm:p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50 flex-shrink-0"
            title="Delete your review"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
          </button>
        )}
        {/* Own Review Badge */}
        <span className="bg-[#006073] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium whitespace-nowrap">
          Your Review
        </span>
      </div>
    )}

    {/* Quote text - Add padding to prevent overlap with buttons */}
    <p className={`text-[#999999] text-sm leading-relaxed mb-4 ${
      isOwnReview ? 'pr-20 sm:pr-24' : 'pr-2'
    }`}>{review.text}</p>

    {/* Star rating */}
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < review.rating ? 'text-[#006073] fill-current' : 'text-[#E6E6E6]'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>

    {/* Author info */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* User initials in circle */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#006073] flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-sm sm:text-base font-semibold">
            {(() => {
              // Get initials from author name
              if (review.author && review.author.trim()) {
                const nameParts = review.author.trim().split(/\s+/);
                if (nameParts.length >= 2) {
                  // First letter of first name + first letter of last name
                  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
                } else if (nameParts.length === 1) {
                  // First two letters of single name
                  return nameParts[0].substring(0, 2).toUpperCase();
                }
              }
              // Fallback to first letter of email if name not available
              if (review.email && review.email.trim()) {
                return review.email[0].toUpperCase();
              }
              // Final fallback
              return '?';
            })()}
          </span>
        </div>
        <div className="flex flex-col">
          <p className={`text-sm sm:text-base font-medium ${
            isOwnReview ? 'text-[#006073]' : 'text-[#006073]'
          }`}>
            {review.author}
          </p>
          {review.email && (
            <p className="text-xs text-[#6F6F6F]">{review.email}</p>
          )}
        </div>
      </div>

      {/* Quote icon */}
      <div className="text-[#E6E6E6]">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
  </div>
);

// Reusable Navigation Button Component
const NavButton: React.FC<{
  direction: 'prev' | 'next';
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md';
}> = ({ direction, onClick, className = '', size = 'md' }) => {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const path = direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSize} text-[#006073]`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={path}
        />
      </svg>
    </button>
  );
};

// Reusable Carousel Navigation Component
const CarouselNavigation: React.FC<{
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  variant?: 'desktop' | 'mobile';
}> = ({ currentSlide, totalSlides, onPrev, onNext, variant = 'desktop' }) => {
  if (variant === 'mobile') {
    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="flex items-center gap-2">
          <NavButton direction="prev" onClick={onPrev} size="sm" />
          <div className="flex gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-[#006073]' : 'bg-[#E6E6E6]'} carousel-dot`}
              />
            ))}
          </div>
          <NavButton direction="next" onClick={onNext} size="sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex gap-2 items-center">
        <NavButton direction="prev" onClick={onPrev} />
        <NavButton direction="next" onClick={onNext} />
      </div>
      <div className="flex items-center">
        <span className="text-sm text-[#6F6F6F]">{currentSlide + 1}</span>
        <span className="text-sm text-[#6F6F6F] mx-1">/</span>
        <span className="text-sm text-[#6F6F6F]">{totalSlides}</span>
      </div>
    </div>
  );
};

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, listingId, onReviewDeleted }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const showAlert = useAlert();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [slidesPerView, setSlidesPerView] = React.useState(3);
  // Track deleted review IDs to filter them out optimistically
  const [deletedReviewIds, setDeletedReviewIds] = React.useState<Set<string>>(new Set());

  // Responsive slides per view - MUST be called before any early returns
  React.useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        // lg
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        // md
        setSlidesPerView(2);
      } else {
        // sm
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Clear deleted IDs when reviews are refetched and the deleted review is confirmed gone
  React.useEffect(() => {
    setDeletedReviewIds(prev => {
      const newSet = new Set<string>();
      // Only keep IDs that are not in the current reviews (confirmed deleted)
      prev.forEach(id => {
        if (!reviews.some(r => r._id === id)) {
          // This review is confirmed deleted, keep it filtered
          newSet.add(id);
        }
        // If review is back in the list, don't add it to newSet (effectively removes it)
      });
      return newSet;
    });
  }, [reviews]);

  // Handle delete review
  const handleDeleteReview = async (reviewId: string) => {
    // Use listingId from props, fallback to review.listingId
    const effectiveListingId = listingId || reviews.find(r => r._id === reviewId)?.listingId;
    
    if (!effectiveListingId) {
      showAlert({
        title: 'Error',
        text: 'Listing ID is required',
        icon: 'error',
      });
      return;
    }

    // Optimistically remove the review from UI immediately
    setDeletedReviewIds(prev => new Set(prev).add(reviewId));

    try {
      // Delete the review
      await deleteReview({ reviewId, listingId: effectiveListingId }).unwrap();
      
      // Explicitly refetch reviews after successful deletion to ensure UI updates
      if (onReviewDeleted) {
        try {
          await onReviewDeleted();
          // The useEffect will handle clearing deletedReviewIds based on refetched data
        } catch (refetchError) {
          console.error('Error refetching reviews:', refetchError);
          // If refetch fails, remove from deleted set so review shows again
          setDeletedReviewIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(reviewId);
            return newSet;
          });
        }
      }
      
      showAlert({
        title: 'Success',
        text: 'Review deleted successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      // Remove from deleted set on error so it shows again
      setDeletedReviewIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
      showAlert({
        title: 'Error',
        text: 'Failed to delete review. Please try again.',
        icon: 'error',
      });
    }
  };

  // Filter out deleted reviews and sort: user's own reviews first
  const sortedReviews = React.useMemo(() => {
    // First, filter out any reviews that have been deleted
    const activeReviews = reviews.filter(review => 
      review._id && !deletedReviewIds.has(review._id)
    );
    
    if (!currentUser?.id) return activeReviews;
    
    const userReviews = activeReviews.filter((review) => {
      const reviewUserId = typeof review.userId === 'object' && review.userId !== null
        ? (review.userId as { _id?: string })._id
        : review.userId;
      return reviewUserId && reviewUserId === currentUser.id;
    });
    const otherReviews = activeReviews.filter((review) => {
      const reviewUserId = typeof review.userId === 'object' && review.userId !== null
        ? (review.userId as { _id?: string })._id
        : review.userId;
      return !reviewUserId || reviewUserId !== currentUser.id;
    });
    
    return [...userReviews, ...otherReviews];
  }, [reviews, currentUser?.id, deletedReviewIds]);

  // Empty state
  if (sortedReviews.length === 0) {
    return (
      <div className="mt-8 sm:mt-10">
        <h3 className="text-base sm:text-lg font-medium text-[#040404] mb-4">
          Customer Reviews
        </h3>
        <div className="bg-white border border-[#E6E6E6] rounded-lg p-8 sm:p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-[#E6E6E6] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h4 className="text-lg font-medium text-[#040404] mb-2">
            No reviews yet
          </h4>
          <p className="text-sm text-[#6F6F6F] max-w-md mx-auto">
            Be the first to share your experience! Leave a review and help others make informed decisions.
          </p>
        </div>
      </div>
    );
  }

  // Only show pagination if there are more reviews than can fit in one view
  const shouldShowPagination = sortedReviews.length > slidesPerView;
  const totalSlides = shouldShowPagination
    ? Math.ceil(sortedReviews.length / slidesPerView)
    : 1;
  const maxSlide = totalSlides - 1;

  const handlePrev = () => {
    if (!shouldShowPagination) return;
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const handleNext = () => {
    if (!shouldShowPagination) return;
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  // Calculate which reviews to show based on current slide
  // const visibleReviews = reviews.slice(
  //   currentSlide * slidesPerView,
  //   (currentSlide + 1) * slidesPerView
  // );

  return (
    <div className="mt-12 sm:mt-16">
      <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 mb-8 border-b border-neutral-100 pb-4">
        Guest Impressions
      </h3>

      <div className="pb-4 relative">
        {/* Desktop/Tablet Grid Layout */}
        <div className="hidden md:block">
          <div className="carousel-container overflow-hidden">
            <div
              id="reviews-carousel"
              className="grid gap-4 transition-transform duration-300 ease-in-out"
              style={{
                gridTemplateColumns: `repeat(${slidesPerView}, 1fr)`,
                transform: shouldShowPagination
                  ? `translateX(-${currentSlide * 100}%)`
                  : 'translateX(0)',
              }}
            >
              {sortedReviews.map((review, index) => {
                const reviewUserId = typeof review.userId === 'object' && review.userId !== null
                  ? (review.userId as { _id?: string })._id
                  : review.userId;
                const isOwnReview: boolean = Boolean(currentUser?.id && reviewUserId === currentUser.id);
                return (
                  <ReviewCard
                    key={review._id || index}
                    review={review}
                    className="h-full w-full"
                    isOwnReview={isOwnReview}
                    onDelete={isOwnReview && review._id 
                      ? () => handleDeleteReview(review._id!)
                      : undefined}
                    isDeleting={isDeleting}
                  />
                );
              })}
            </div>
          </div>
          {shouldShowPagination && (
            <CarouselNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrev={handlePrev}
              onNext={handleNext}
              variant="desktop"
            />
          )}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-x-auto scrollbar-hide relative">
            <div
              id="reviews-carousel-mobile"
              className="flex flex-nowrap gap-4 min-w-full pb-2 transition-transform duration-300 ease-in-out"
              style={{
                transform: shouldShowPagination
                  ? `translateX(-${currentSlide * 100}%)`
                  : 'translateX(0)',
              }}
            >
              {sortedReviews.map((review, index) => {
                const reviewUserId = typeof review.userId === 'object' && review.userId !== null
                  ? (review.userId as { _id?: string })._id
                  : review.userId;
                const isOwnReview: boolean = Boolean(currentUser?.id && reviewUserId === currentUser.id);
                return (
                  <ReviewCard
                    key={review._id || index}
                    review={review}
                    className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 max-w-[85vw]"
                    isOwnReview={isOwnReview}
                    onDelete={isOwnReview && review._id 
                      ? () => handleDeleteReview(review._id!)
                      : undefined}
                    isDeleting={isDeleting}
                  />
                );
              })}
            </div>
          </div>
          {shouldShowPagination && (
            <CarouselNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrev={handlePrev}
              onNext={handleNext}
              variant="mobile"
            />
          )}
        </div>

        {/* View All Reviews Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 border border-[#006073] text-[#006073] rounded-md hover:bg-[#006073] hover:text-white transition-colors">
            View All Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
