import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PropertyListing } from '@/types';
import PropertyListingCard from './PropertyCard';
import { selectAllPropertyTypes } from '@/features/propertyType';
import { useGetListingByIdQuery } from '@/features/listing/listingService';

function getImageUrl(img: unknown): string | null {
  if (typeof img === 'string' && img.trim()) return img;
  if (img && typeof img === 'object') {
    const o = img as Record<string, unknown>;
    const url = (o.fileUrl ?? o.url ?? o.secure_url) as string | undefined;
    return url && typeof url === 'string' && url.trim() ? url : null;
  }
  return null;
}

function listingHasImages(listing: PropertyListing): boolean {
  const urls = (listing.listingImg ?? []).map(getImageUrl).filter(Boolean);
  return urls.length > 0;
}

interface SavedListingCardProps {
  listing: PropertyListing;
}

/**
 * Renders a single saved listing card. When the favourite listing has no
 * image URLs (e.g. API returned a different shape), fetches full listing
 * by ID to get listingImg so the image displays.
 */
const SavedListingCard: React.FC<SavedListingCardProps> = ({ listing }) => {
  const propertyTypes = useSelector(selectAllPropertyTypes) || [];
  const propertyTypeNames = useMemo(
    () =>
      propertyTypes.reduce(
        (acc, type) => {
          acc[type._id] = type.name;
          return acc;
        },
        {} as Record<string, string>
      ),
    [propertyTypes]
  );

  const hasImages = listingHasImages(listing);
  const { data: fullListingData } = useGetListingByIdQuery(listing._id, {
    skip: hasImages,
  });

  const displayListing = useMemo(() => {
    if (hasImages) return listing;
    const full = fullListingData?.listing;
    if (full?.listingImg && Array.isArray(full.listingImg) && full.listingImg.length > 0) {
      return { ...listing, listingImg: full.listingImg };
    }
    return listing;
  }, [listing, hasImages, fullListingData]);

  const {
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
    createdAt,
  } = displayListing;

  const images = (listingImg ?? [])
    .map(getImageUrl)
    .filter((url): url is string => !!url);
  const fallbackImage = '/images/property-image.jpeg';
  const primaryImage = images[0] || fallbackImage;

  const locationParts = [city, state, country].filter(
    (part) => part && part.trim() !== ''
  );
  const location =
    locationParts.length > 0
      ? locationParts.join(', ')
      : 'Location not specified';

  let propertyTypeName = '';
  if (propertyType) {
    if (typeof propertyType === 'object' && 'name' in propertyType) {
      propertyTypeName = (propertyType as { name: string }).name;
    } else if (typeof propertyType === 'string') {
      propertyTypeName = propertyTypeNames[propertyType] ?? '';
    }
  }


  return (
    <div className="w-full h-full flex justify-center">
      <PropertyListingCard
        id={_id}
        image={primaryImage}
        price={basePrice}
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
};

export default React.memo(SavedListingCard);
