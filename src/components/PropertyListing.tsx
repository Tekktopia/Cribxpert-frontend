import { PropertyListingProps } from '@/types';
import PropertyListingCard from './common/PropertyCard';
const PropertyListings = ({
  listings,
}: {
  listings: PropertyListingProps[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 place-items-center">
      {listings?.map((listing, key) => (
        <PropertyListingCard
          key={key}
          image={listing.image}
          price={listing.price}
          rating={listing.rating}
          propertyName={listing.propertyName}
          location={listing.location}
          description={listing.description}
        />
      ))}
    </div>
  );
};
export default PropertyListings;
