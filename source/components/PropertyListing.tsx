import { PropertyListing } from '@/types';
import PropertyListingCard from './common/PropertyCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPropertyTypes } from '@/features/propertyType';

const PropertyListings = ({ listings }: { listings: PropertyListing[] }) => {
  const propertyTypes = useSelector(selectAllPropertyTypes) || [];
  // Precompute property type names for all listings
  const propertyTypeNames = propertyTypes.map((type) => ({
    id: type._id,
    name: type.name,
  })).reduce((acc, type) => {
    acc[type.id] = type.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="px-4 2xl:container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-14">
      {listings?.map(
        (
          {
            _id,
            listingImg,
            basePrice,
            rating,
            name,
            city,
            state,
            country,
            description,
            bedroomNo,
            propertyType,
          },
          key
        ) => {
          const images = listingImg.map((img) => img.fileUrl) || [];
          const location = `${city}, ${state}, ${country}`;
          const propertyTypeName = propertyTypeNames[propertyType];

          return (
            <div key={key} className="w-full flex justify-center">
              <PropertyListingCard
                id={_id}
                image={images[0] || ''}
                price={basePrice}
                rating={rating}
                name={name}
                location={location}
                description={description}
                images={images}
                bedrooms={bedroomNo}
                propertyType={propertyTypeName}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

// Wrap PropertyListings in React.memo
export default React.memo(PropertyListings);
