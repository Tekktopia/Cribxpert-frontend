import { PropertyListingProps } from '@/types';
import PropertyListingCard from './common/PropertyCard';
import React from 'react';

const PropertyListings = ({
  listings,
}: {
  listings: PropertyListingProps[];
}) => {
  return (
    <div className="px-4 2xl:container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-14">
      {listings?.map((listing, key) => (
        <div key={key} className="w-full flex justify-center">
          <PropertyListingCard
            id={listing.id}
            image={listing.image}
            price={listing.price}
            rating={listing.rating}
            propertyName={listing.propertyName}
            location={listing.location}
            description={listing.description}
            images={listing.images}
            bedrooms={listing.bedrooms}
            propertyType={listing.propertyType}
          />
        </div>
      ))}
    </div>
  );
};

// Wrap PropertyListings in React.memo
export default React.memo(PropertyListings);