import { PropertyListingProps } from '@/types';
import PropertyListingCard from './common/PropertyCard';
const PropertyListings = ({
  listings,
}: {
  listings: PropertyListingProps[];
}) => {
  return (
    <div className="container mx-auto sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 place-items-center">
      {listings?.map((listing, key) => (
        <PropertyListingCard
          id={listing.id}
          key={key}
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
      ))}
    </div>
  );
};
export default PropertyListings;
