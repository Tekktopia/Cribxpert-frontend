import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/listing/listingSlice';
import { Bed, Bath, Users, Home } from 'lucide-react'; // Import Lucide icons

const PropertyOverview: React.FC = () => {
  // Select current listing from the store
  const currentListing = useSelector(selectCurrentListing);

  const displayBedrooms = currentListing?.bedroomNo ?? 0;
  const displayBathrooms = currentListing?.bathroomNo ?? 0;
  const displayGuests = currentListing?.guestNo ?? 0;

  return (
    <section className="py-4 sm:py-6 px-4 sm:px-10 overflow-x-auto">
      <div className="flex flex-row items-center gap-6 sm:9 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Bed className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#313131]" />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {displayBedrooms} bedroom{displayBedrooms !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#313131]" />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {displayBathrooms} bathroom{displayBathrooms !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#313131]" />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {displayGuests} guest{displayGuests !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#313131]" />
          <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
            {'100 sq ft'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview;