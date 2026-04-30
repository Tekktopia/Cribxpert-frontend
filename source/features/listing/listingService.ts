// Single source of truth — all listing API hooks come from features/properties/listingService.
// This re-export keeps backward-compatible imports from @/features/listing/listingService.
export * from '@/features/properties/listingService';
export type { ListingFilter, CreateListingRequest } from '@/features/properties/listingService';
