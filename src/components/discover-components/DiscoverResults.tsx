import { SAMPLE_DATA } from '@/utils/data';
import PropertyListingCard from '../common/PropertyCard';

type DiscoverResultsProps = {
  isOpen: boolean;
};

export default function DiscoverResults({ isOpen }: DiscoverResultsProps) {
  console.log(isOpen);
  const listings = SAMPLE_DATA;
  return (
    <div className="mt-8 w-full max-w-none">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${isOpen ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}
      >
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
    </div>
  );
}
