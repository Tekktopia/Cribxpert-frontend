import { PropertyListing } from '@/types';

// Calculate price ranges based on actual listing data
export const calculatePriceRanges = (listings: PropertyListing[]) => {
  if (!listings || listings.length === 0) {
    return [
      { label: 'Under 100k', value: 'under-100k', max: 100000 },
      { label: '100k - 500k', value: '100k-500k', min: 100000, max: 500000 },
      { label: '500k - 2M', value: '500k-2M', min: 500000, max: 2000000 },
      { label: 'More than 2M', value: 'over-2M', min: 2000000 },
    ];
  }

  const prices = listings
    .map((listing) => listing.basePrice)
    .filter((price) => price > 0);

  if (prices.length === 0) {
    return [
      { label: 'Under 100k', value: 'under-100k', max: 100000 },
      { label: '100k - 500k', value: '100k-500k', min: 100000, max: 500000 },
      { label: '500k - 2M', value: '500k-2M', min: 500000, max: 2000000 },
      { label: 'More than 2M', value: 'over-2M', min: 2000000 },
    ];
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  // Create dynamic ranges based on actual data
  const ranges = [];

  // Under 25th percentile
  const q25 = prices.sort((a, b) => a - b)[Math.floor(prices.length * 0.25)];
  if (q25 > minPrice) {
    ranges.push({
      label: `Under ${formatPrice(q25)}`,
      value: `under-${q25}`,
      max: q25,
    });
  }

  // 25th to 75th percentile
  const q75 = prices.sort((a, b) => a - b)[Math.floor(prices.length * 0.75)];
  if (q75 > q25) {
    ranges.push({
      label: `${formatPrice(q25)} - ${formatPrice(q75)}`,
      value: `${q25}-${q75}`,
      min: q25,
      max: q75,
    });
  }

  // Over 75th percentile
  if (maxPrice > q75) {
    ranges.push({
      label: `Over ${formatPrice(q75)}`,
      value: `over-${q75}`,
      min: q75,
    });
  }

  // If we don't have enough data for percentiles, create simple ranges
  if (ranges.length === 0) {
    const midPoint = minPrice + priceRange / 2;
    ranges.push(
      {
        label: `Under ${formatPrice(midPoint)}`,
        value: `under-${midPoint}`,
        max: midPoint,
      },
      {
        label: `Over ${formatPrice(midPoint)}`,
        value: `over-${midPoint}`,
        min: midPoint,
      }
    );
  }

  return ranges;
};

// Format price for display
export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}k`;
  }
  return price.toString();
};

// Filter listings based on active filters
export const filterListings = (
  listings: PropertyListing[],
  filters: {
    bookingAvailability?: string;
    amenities?: string[];
    priceMin?: string;
    priceMax?: string;
    priceRange?: string;
    rating?: string;
    location?: string;
    [key: string]: string | string[] | undefined;
  }
): PropertyListing[] => {
  return listings.filter((listing) => {
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenityId) =>
        listing.amenities.includes(amenityId)
      );
      if (!hasAllAmenities) return false;
    }

    // Filter by price range
    if (filters.priceMin || filters.priceMax) {
      const minPrice = filters.priceMin ? parseFloat(filters.priceMin) : 0;
      const maxPrice = filters.priceMax
        ? parseFloat(filters.priceMax)
        : Infinity;

      if (listing.basePrice < minPrice || listing.basePrice > maxPrice) {
        return false;
      }
    }

    // Filter by rating
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      if (listing.rating < minRating) {
        return false;
      }
    }

    // Filter by location
    if (filters.location && filters.location.trim()) {
      const locationQuery = filters.location.toLowerCase().trim();
      const listingLocation =
        `${listing.city}, ${listing.state}, ${listing.country}`.toLowerCase();

      if (!listingLocation.includes(locationQuery)) {
        return false;
      }
    }

    // Filter by booking availability (simplified - you might want to implement actual availability logic)
    if (
      filters.bookingAvailability &&
      filters.bookingAvailability !== 'All Availability'
    ) {
      // This would need to be implemented based on your availability logic
      // For now, we'll skip this filter
    }

    return true;
  });
};

// Get unique locations from listings
export const getUniqueLocations = (listings: PropertyListing[]): string[] => {
  const locations = new Set<string>();

  listings.forEach((listing) => {
    const location = `${listing.city}, ${listing.state}, ${listing.country}`;
    locations.add(location);
  });

  return Array.from(locations).sort();
};
