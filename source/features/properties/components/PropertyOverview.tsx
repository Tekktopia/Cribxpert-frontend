import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/properties/listingSlice';
import { selectAllPropertyTypes } from '@/features/propertyType';
import { Bed, Bath, Users, Home } from 'lucide-react'; // Import Lucide icons

const PropertyOverview: React.FC = () => {
  // Select current listing from the store
  const currentListing = useSelector(selectCurrentListing);
  const propertyTypes = useSelector(selectAllPropertyTypes) || [];

  const displayBedrooms = currentListing?.bedroomNo ?? 0;
  const displayBathrooms = currentListing?.bathroomNo ?? 0;
  const displayGuests = currentListing?.guestNo ?? 0;

  // Get property type name
  const getPropertyTypeName = (): string => {
    if (!currentListing?.propertyType) return '';
    
    // Handle if propertyType is an object (from API)
    if (typeof currentListing.propertyType === 'object' && 'name' in currentListing.propertyType) {
      return (currentListing.propertyType as { name: string }).name;
    }
    
    // Handle if propertyType is an ID string
    const propertyTypeId = typeof currentListing.propertyType === 'string' 
      ? currentListing.propertyType 
      : '';
    
    const propertyType = propertyTypes.find((type) => type._id === propertyTypeId);
    return propertyType?.name || '';
  };

  const displayPropertyType = getPropertyTypeName();

  return (
    <section className="py-4 sm:py-6 px-4 sm:px-10 overflow-x-auto">
      <div className="flex flex-row items-center gap-4 sm:gap-6 whitespace-nowrap">
        {displayPropertyType && (
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#313131]" />
            <p className="text-[#313131] font-[400] text-xs sm:text-[14px]">
              {displayPropertyType}
            </p>
          </div>
        )}

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
      </div>
    </section>
  );
};

export default PropertyOverview;
