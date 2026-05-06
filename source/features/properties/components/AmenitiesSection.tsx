import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/properties/listingSlice';
import { Amenity, selectAllAmenities } from '@/features/amenities';

const AmenitiesSection = () => {
  // Get the current listing and all amenities from the store
  const currentListing = useSelector(selectCurrentListing);
  const allAmenities = useSelector(selectAllAmenities);

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
    <div className="w-full space-y-12">
      {/* Dynamic Amenities from API */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
        {propertyAmenities.map((amenity) => (
          <div 
            key={amenity._id} 
            className="flex flex-row items-center gap-4 group"
          >
            <div className="w-11 h-11 rounded-full bg-neutral-50 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 border border-neutral-100/50">
              <img
                src={amenity.icon?.fileUrl}
                alt={amenity.name}
                className="w-5 h-5 opacity-40 group-hover:opacity-100"
              />
            </div>
            <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-neutral-900 transition-colors">
              {amenity.name}
            </p>
          </div>
        ))}
      </div>

      {/* Static Premium Features (Nigerian Luxury Standard) */}
      <div className="pt-10 border-t border-neutral-100/50">
        <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-300 mb-8">Luxury Standard Features</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
          {[
            { label: '24/7 Armed Security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { label: 'Inverter & Solar', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'Water Treatment', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { label: 'Fibre Internet', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.9 9.9 0 0114.142 0M2.006 8.05a15 15 0 0121.988 0' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-6 h-6 flex items-center justify-center text-primary opacity-40 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
              </div>
              <span className="text-neutral-500 font-medium text-[10px] uppercase tracking-[0.2em] group-hover:text-neutral-900 transition-colors">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSection;
