import React from 'react';

interface PropertyRatingsProps {
  rating: number;
  totalRatings: number;
  ratingDistribution: number[]; // [5-star count, 4-star count, 3-star count, 2-star count, 1-star count]
}

const PropertyRatings: React.FC<PropertyRatingsProps> = ({
  rating,
  totalRatings,
  ratingDistribution,
}) => {
  // Empty state when no ratings
  if (totalRatings === 0) {
    return (
      <div className="w-full bg-[#F1F1F2] rounded-md p-6 sm:p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-[#999999] mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
        <h3 className="text-base sm:text-lg font-medium text-[#040404] mb-2">
          No ratings available
        </h3>
        <p className="text-sm text-[#6F6F6F]">
          Be the first to rate this property!
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...ratingDistribution, 1);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 lg:gap-8 w-full">
      {/* Left side - Overall rating */}
      <div className="w-full lg:w-auto text-center lg:text-left">
        <div className="w-full sm:w-[200px] lg:w-[220px] mx-auto lg:mx-0 bg-[#F1F1F2] rounded-md flex justify-center items-center shadow-sm py-4 sm:py-6">
          <div className="flex flex-col justify-center items-center p-2 sm:p-4">
            <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl lg:text-3xl">
              <span className="text-[#050505] font-[500]">{rating}</span>/5
            </h2>
            <div className="flex items-center gap-1 sm:gap-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] ${
                    index < Math.round(rating)
                      ? 'text-[#006073] fill-current'
                      : 'text-[#E6E6E6]'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[#313131] text-xs sm:text-sm font-[500] mt-2 sm:mt-3">
              {totalRatings} verified rating{totalRatings !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Rating distribution */}
      <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
        {ratingDistribution.map((count, index) => {
          const stars = 5 - index; // 5, 4, 3, 2, 1
          return (
            <React.Fragment key={stars}>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        starIndex < stars
                          ? 'text-[#006073] fill-current'
                          : 'text-[#E6E6E6]'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#6F6F6F] text-xs sm:text-sm font-[400] ml-1">
                  ({count})
                </p>
              </div>
              <div className="w-full h-[3px] sm:h-[4px] bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006073] rounded-full transition-all duration-300"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                  }}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyRatings;
