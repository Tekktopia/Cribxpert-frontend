import React from 'react';

interface PropertyOverviewProps {
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: string;
  icons: {
    bedroom: string;
    bathroom: string;
    guest: string;
    house: string;
  };
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({
  bedrooms,
  bathrooms,
  guests,
  area,
  icons,
}) => {
  return (
    <section className="py-4 sm:py-6 px-4 sm:px-10 overflow-x-auto">
      <div className="flex flex-row items-center gap-2 sm:gap-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <img
            src={icons.bedroom}
            alt="Bedroom"
            className="w-4 h-4 sm:w-[20px] sm:h-[20px]"
          />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {bedrooms} bedroom{bedrooms !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={icons.bathroom}
            alt="bathroom"
            className="w-4 h-4 sm:w-[20px] sm:h-[20px]"
          />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={icons.guest}
            alt="guest"
            className="w-4 h-4 sm:w-[20px] sm:h-[20px]"
          />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {guests} guest{guests !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={icons.house}
            alt="house"
            className="w-4 h-4 sm:w-[20px] sm:h-[20px]"
          />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {area}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview;
