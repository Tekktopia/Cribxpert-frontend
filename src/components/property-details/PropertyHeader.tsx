import React from 'react';

interface PropertyHeaderProps {
  propertyName: string;
  description: string;
  rating: number;
  totalRatings?: number;
  shareIconUrl: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  propertyName,
  description,
  rating,
  totalRatings = 115,
  shareIconUrl,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-10 m-3 sm:m-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <div className="flex flex-col gap-y-2 w-full md:w-auto">
          <h1 className="font-[400] text-xl sm:text-2xl md:text-[25px] text-[#040404] line-clamp-2">
            {propertyName} - {description}
          </h1>
          <p className="font-[400] text-sm sm:text-[14px] text-[#040404]">
            ⭐{rating}{' '}
            <span className="text-[#6f6f6f] font-[400] text-sm sm:text-[16px]">
              [{totalRatings} verified positive feedbacks]
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0 w-full md:w-auto justify-start md:justify-center">
          <button className="rounded-[200px] px-4 sm:px-6 py-2 sm:py-3 bg-[#e6e6e6] hover:bg-[#d9d9d9] transition-colors">
            <div className="flex items-center gap-2">
              <p className="text-[#070707] font-[400] text-xs sm:text-[14px] text-center">
                Save
              </p>
            </div>
          </button>
          <button className="rounded-[200px] px-4 sm:px-6 py-2 sm:py-3 bg-[#e6e6e6] hover:bg-[#d9d9d9] transition-colors">
            <div className="flex items-center gap-2">
              <img
                src={shareIconUrl}
                className="w-4 h-4 sm:w-[20px] sm:h-[20px]"
                alt="Share"
              />
              <p className="text-[#070707] font-[400] text-xs sm:text-[14px]">
                Share
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
