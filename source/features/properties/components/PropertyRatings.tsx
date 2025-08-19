import React from 'react';

interface PropertyRatingsProps {
  rating: number;
  totalRatings: number;
  ratingDistribution: {
    stars: number;
    count: number;
    progressImage: string;
  }[];
}

const PropertyRatings: React.FC<PropertyRatingsProps> = ({
  rating,
  totalRatings,
  ratingDistribution,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 w-full">
      
      {/* Left side - Overall rating */}
      <div className="w-full lg:w-auto text-center lg:text-left">
        <div className="w-full sm:w-[260px] mx-auto lg:mx-0 h-auto aspect-square sm:aspect-auto sm:h-[220px] bg-[#F1F1F2] rounded-md flex justify-center items-center shadow-sm">
          <div className="flex flex-col justify-center items-center p-4">
            <h2 className="mb-3 text-2xl sm:text-3xl">
              <span className="text-[#050505] font-[500]">{rating}</span>/5
            </h2>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < rating
                      ? '/icons/star.png'
                      : '/icons/Icon-star-light.png'
                  }
                  alt="star"
                  className="w-4 text-[#006073] h-4 sm:w-[18px] sm:h-[18px]"
                />
              ))}
            </div>
            <p className="text-[#313131] text-sm sm:text-[14px] font-[500] mt-3">
              {totalRatings} verified ratings
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Rating distribution */}
      <div className="flex flex-col gap-3 w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
        {ratingDistribution.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, starIndex) => (
                  <img
                    key={starIndex}
                    src={
                      starIndex < item.stars
                        ? '/icons/star.png'
                        : '/icons/Icon-star-light.png'
                    }
                    alt="star"
                    className="w-4 text-[#006073] h-4 sm:w-[18px] sm:h-[18px]"
                  />
                ))}
              </div>
              <p className="text-[#6F6F6F] text-md sm:text-[14px] font-[400] ml-1">
                ({item.count})
              </p>
            </div>
            <div className="w-full h-[4px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#006073] rounded-full transition-all duration-300"
                style={{
                  width: `${(item.count / Math.max(...ratingDistribution.map((r) => r.count))) * 100}%`,
                }}
              />
            </div>
            {index < ratingDistribution.length - 1 && ' '}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PropertyRatings;
