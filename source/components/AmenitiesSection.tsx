import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/listing/listingSlice';
import { Amenity, selectAllAmenities } from '@/features/amenities';

const AmenitiesSection = () => {
  // Get the current listing and all amenities from the store
  const currentListing = useSelector(selectCurrentListing);
  const allAmenities = useSelector(selectAllAmenities);

  // console.log('All Amenities:', allAmenities);

  // Get the amenities for this property (full objects)
  const propertyAmenities = React.useMemo(() => {
    if (!currentListing?.amenities || !Array.isArray(currentListing.amenities))
      return [];
    return allAmenities.filter((amenity: Amenity) =>
      currentListing.amenities.includes(amenity._id)
    );
  }, [currentListing, allAmenities]);

  if (!propertyAmenities.length) return null;

  return (
    <div className="py-8">
      <h3 className="text-[#050505] font-[500] text-[16px]">
        Popular Amenities
      </h3>
      <div className="mt-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
          {propertyAmenities.map((amenity) => (
            <div key={amenity._id} className="flex flex-row items-center gap-3">
              <img
                src={amenity.icon?.fileUrl}
                alt={amenity.name}
                className="w-[20px] h-[20px]"
              />
              <p className="text-[#313131] font-[400] text-[14px]">
                {amenity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSection;
