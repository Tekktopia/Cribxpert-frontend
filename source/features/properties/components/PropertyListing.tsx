import { PropertyListing } from '@/types';
import PropertyListingCard from './PropertyCard';
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mb-14 items-stretch">
      {listings?.map(
        (
          // AFTER:
          {
            _id,
            listingImg,
            basePrice,
            cleaningFee,
            rating,
            name,
            city,
            state,
            country,
            street,
            description,
            bedroomNo,
            propertyType,
            createdAt,
          },
          key
        ) => {
          // Support fileUrl, url, secure_url (Cloudinary) and plain URL strings from API
          const getImageUrl = (img: unknown): string | null => {
            if (typeof img === 'string' && img.trim()) return img;
            if (img && typeof img === 'object') {
              const o = img as Record<string, unknown>;
              const url = (o.fileUrl ?? o.url ?? o.secure_url) as string | undefined;
              return url && typeof url === 'string' && url.trim() ? url : null;
            }
            return null;
          };
          const images = (listingImg ?? [])
            .map(getImageUrl)
            .filter((url): url is string => !!url);
          const fallbackImage = '/images/property-image.jpeg';
          const primaryImage = images[0] || fallbackImage;
          // Map location: prefer city/state/country; fall back to street if those are empty
          const locationParts = [city, state, country].filter(
            (part) => part && part.trim() !== ''
          );
          const location =
            locationParts.length > 0
              ? locationParts.join(', ')
              : street?.trim() || 'Location not specified';

          // Get property type name - handle both object and ID formats
          let propertyTypeName = '';
          if (propertyType) {
            if (typeof propertyType === 'object' && 'name' in propertyType) {
              // Property type is an object with name property
              propertyTypeName = (propertyType as { name: string }).name;
            } else if (typeof propertyType === 'string') {
              // Property type is an ID string, look it up
              propertyTypeName = propertyTypeNames[propertyType] ?? '';
            }
          }

          return (
            <div key={key} className="w-full h-full flex justify-center">
              <PropertyListingCard
                id={_id}
                image={primaryImage}
                price={basePrice}
                cleaningFee={cleaningFee ?? 0}
                rating={rating}
                name={name}
                location={location}
                description={description}
                images={images.length > 0 ? images : [primaryImage]}
                bedrooms={bedroomNo}
                propertyType={propertyTypeName}
                createdAt={createdAt}
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
