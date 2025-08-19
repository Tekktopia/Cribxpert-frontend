import React from 'react';
// import ReviewCarousel from '../ReviewCarousel';

interface CustomerReview {
  text: string;
  author: string;
  rating: number;
  image?: string;
}

interface CustomerReviewsProps {
  reviews: CustomerReview[];
}

// Reusable Review Card Component
const ReviewCard: React.FC<{ review: CustomerReview; className?: string }> = ({
  review,
  className = '',
}) => (
  <div
    className={`rounded-lg p-4 sm:p-6 bg-white border border-[#E6E6E6] shadow-sm hover:shadow-md transition-shadow relative w-full ${className}`}
  >
    {/* Quote text */}
    <p className="text-[#999999] text-sm leading-relaxed mb-4">{review.text}</p>

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
        <div className="w-10 h-10 rounded-full bg-[#999999] flex-shrink-0">
          {review.image && (
            <img
              src={review.image}
              alt={review.author}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <p className="text-[#006073] text-sm sm:text-base font-medium">
          {review.author}
        </p>
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

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [slidesPerView, setSlidesPerView] = React.useState(3);

  // Responsive slides per view
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

  // Only show pagination if there are more reviews than can fit in one view
  const shouldShowPagination = reviews.length > slidesPerView;
  const totalSlides = shouldShowPagination
    ? Math.ceil(reviews.length / slidesPerView)
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
    <div className="mt-8 sm:mt-10">
      <h3 className="text-base sm:text-lg font-medium text-[#040404] mb-4">
        Customer Reviews
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
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  review={review}
                  className="h-full w-full"
                />
              ))}
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
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  review={review}
                  className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 max-w-[85vw]"
                />
              ))}
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
