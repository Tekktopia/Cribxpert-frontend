import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/properties/listingSlice';
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
    
    // Check if amenities are full objects (from API) or just IDs
    const firstAmenity = currentListing.amenities[0];
    if (firstAmenity && typeof firstAmenity === 'object' && '_id' in firstAmenity) {
      // Amenities are full objects, use them directly
      return currentListing.amenities as Amenity[];
    } else {
      // Amenities are IDs, filter from allAmenities
      return allAmenities.filter((amenity: Amenity) =>
        (currentListing.amenities as string[]).includes(amenity._id)
      );
    }
  }, [currentListing, allAmenities]);

  if (!propertyAmenities.length) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {propertyAmenities.map((amenity) => (
          <div 
            key={amenity._id} 
            className="flex flex-row items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src={amenity.icon?.fileUrl}
              alt={amenity.name}
              className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
            />
            <p className="text-[#313131] font-[400] text-sm sm:text-[14px] truncate">
              {amenity.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
