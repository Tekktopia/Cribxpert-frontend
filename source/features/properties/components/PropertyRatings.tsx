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
      <div className="w-full bg-neutral-50 border border-neutral-100 p-12 text-center">
        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-400 mb-4">
          No ratings available
        </h3>
        <p className="text-neutral-500 text-sm max-w-xs mx-auto">
          This premium space hasn't been rated yet. Be the first to share your experience.
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...ratingDistribution, 1);

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 w-full">
      {/* Left side - Overall rating */}
      <div className="w-full lg:w-1/3">
        <div className="h-full border border-neutral-100 flex flex-col justify-center items-center py-12 px-8 bg-neutral-50/30">
          <h2 className="mb-6 text-5xl font-light text-neutral-900 tracking-tighter">
            <span className="font-bold">{rating}</span><span className="text-neutral-300 text-3xl">/5</span>
          </h2>
          <div className="flex items-center gap-1.5 mb-6">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(rating)
                    ? 'text-primary fill-current'
                    : 'text-neutral-200 fill-current'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-neutral-400 text-[10px] uppercase tracking-[0.3em] font-bold">
            {totalRatings} Verified Experience{totalRatings !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Right side - Rating distribution */}
      <div className="flex flex-col justify-center gap-5 w-full lg:w-2/3">
        {ratingDistribution.map((count, index) => {
          const stars = 5 - index; // 5, 4, 3, 2, 1
          return (
            <div key={stars} className="flex items-center gap-6">
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className="text-[10px] font-bold text-neutral-900 tracking-widest">{stars} STAR</span>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 h-[2px] bg-neutral-100 overflow-hidden relative">
                <div
                  className="h-full bg-primary transition-all duration-700 ease-out"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                  }}
                />
              </div>
              <p className="text-neutral-400 text-[10px] font-bold min-w-[20px] text-right">
                {count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyRatings;
