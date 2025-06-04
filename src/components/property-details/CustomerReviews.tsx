import React from 'react';
import ReviewCarousel from '../ReviewCarousel';

interface CustomerReview {
  text: string;
  author: string;
  image?: string;
}

interface CustomerReviewsProps {
  reviews: CustomerReview[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  // Determine total slides for different viewports
  const lgSlides = Math.ceil(reviews.length / 3);
  const mdSlides = Math.ceil(reviews.length / 2);
  const smSlides = reviews.length;

  return (
    <div className="mt-8 sm:mt-10">
      <h3 className="text-base sm:text-lg font-medium text-[#040404] mb-4">
        Customer Reviews
      </h3>{' '}
      {/* Review Cards Section with Carousel */}
      <div className="pb-4 relative">
        {/* Grid view for larger screens (3 reviews side by side on desktop) */}
        <div className="hidden lg:block relative">
          <div className="carousel-container overflow-hidden">
            <div
              id="reviews-carousel-lg"
              className="grid grid-cols-3 gap-4 transition-transform duration-300 ease-in-out"
            >
              {reviews.map((review, index) => (
                <div
                  key={`lg-${index}`}
                  className="rounded-lg p-4 border border-[#E6E6E6] shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <p className="text-[#999999] text-sm leading-relaxed">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
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
                </div>
              ))}
            </div>
          </div>

          {/* Carousel navigation for desktop */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <button
                id="prev-reviews-lg"
                className="p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B2B89]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                id="next-reviews-lg"
                className="p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B2B89]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <span id="current-slide-lg" className="text-sm text-[#6F6F6F]">
                1
              </span>
              <span className="text-sm text-[#6F6F6F] mx-1">/</span>
              <span id="total-slides-lg" className="text-sm text-[#6F6F6F]">
                {lgSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Grid view for medium screens (2 reviews side by side) */}
        <div className="hidden md:block lg:hidden relative">
          <div className="carousel-container overflow-hidden">
            <div
              id="reviews-carousel-md"
              className="grid grid-cols-2 gap-4 transition-transform duration-300 ease-in-out"
            >
              {reviews.map((review, index) => (
                <div
                  key={`md-${index}`}
                  className="rounded-lg p-4 border border-[#E6E6E6] shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <p className="text-[#999999] text-sm leading-relaxed">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#999999] flex-shrink-0">
                      {review.image && (
                        <img
                          src={review.image}
                          alt={review.author}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-[#8B2B89] text-sm sm:text-base font-medium">
                      {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel navigation for tablet */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <button
                id="prev-reviews-md"
                className="p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B2B89]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                id="next-reviews-md"
                className="p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B2B89]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <span id="current-slide-md" className="text-sm text-[#6F6F6F]">
                1
              </span>
              <span className="text-sm text-[#6F6F6F] mx-1">/</span>
              <span id="total-slides-md" className="text-sm text-[#6F6F6F]">
                {mdSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile carousel with navigation buttons */}
        <div className="md:hidden relative">
          <div className="overflow-x-auto scrollbar-hide relative">
            <div
              id="reviews-carousel-sm"
              className="flex flex-nowrap gap-4 min-w-full pb-2 transition-transform duration-300 ease-in-out"
            >
              {reviews.map((review, index) => (
                <div
                  key={`sm-${index}`}
                  className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 rounded-lg p-4 border border-[#E6E6E6] shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-[#999999] text-sm leading-relaxed">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#999999] flex-shrink-0">
                      {review.image && (
                        <img
                          src={review.image}
                          alt={review.author}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-[#8B2B89] text-sm sm:text-base font-medium">
                      {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls for mobile */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <button
                id="prev-reviews-sm"
                className="p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#8B2B89]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex gap-2">
                {[...Array(smSlides)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#8B2B89]' : 'bg-[#E6E6E6]'} carousel-dot`}
                  ></span>
                ))}
              </div>
              <button
                id="next-reviews-sm"
                className="p-2 rounded-full bg-[#F1F1F2] hover:bg-[#E6E6E6] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#8B2B89]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* View All Reviews Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 border border-[#8B2B89] text-[#8B2B89] rounded-md hover:bg-[#8B2B89] hover:text-white transition-colors">
            View All Reviews
          </button>
        </div>
      </div>
      {/* Initialize the carousel functionality */}
      <ReviewCarousel
        carouselId="lg"
        slidesPerView={3}
        totalSlides={reviews.length}
      />
      <ReviewCarousel
        carouselId="md"
        slidesPerView={2}
        totalSlides={reviews.length}
      />
      <ReviewCarousel
        carouselId="sm"
        slidesPerView={1}
        totalSlides={reviews.length}
      />
    </div>
  );
};

export default CustomerReviews;
