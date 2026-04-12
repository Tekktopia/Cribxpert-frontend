// Re-export from listingService
import {
  listingApi,
  useGetListingsQuery,
  useGetListingByIdQuery,
  useCreateOrUpdateListingMutation,
  useDeleteListingMutation,
  useGetUserListingsQuery,
  useGetUncompletedListingsQuery,
  useDeleteListingImageMutation,
  useGetListingUnavailableDatesQuery,
  type ListingFilter,
  type CreateListingRequest,
  type UnavailableDate,
  type UnavailableDatesResponse,
} from './listingService';

// Re-export from listingSlice
import listingReducer, {
  setCurrentListing,
  setCurrentListings,
  selectCurrentListings,
  selectActiveFilter,
  setUsingGeolocation,
  updateFilter,
  updateFilters,
  selectIsUsingGeolocation,
  clearFilters,
  setListingError,
  startNewListing,
  updateDraftListing,
  setListingStep,
  clearDraftListing,
  setUploadProgress,
  toggleListingSelection,
  clearSelectedListings,
  selectCurrentListing,
  selectDraftListing,
  selectListingStep,
  resetFilters,
  selectActiveFilters,
  selectIsCreatingListing,
  selectIsFilteringListings,
  selectListingError,
  selectUploadProgress,
  selectSelectedListingIds,
  selectIsDraftDirty,
  selectIsListingSelected,
  setInitialListingsLoaded,
  selectInitialListingsLoaded,
  selectAllListings,
} from './listingSlice';

// Export the API
export { listingApi };

// Export reducer as default
export default listingReducer;

// Export all hooks
export {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useCreateOrUpdateListingMutation,
  useDeleteListingMutation,
  useGetUserListingsQuery,
  useGetUncompletedListingsQuery,
  useDeleteListingImageMutation,
  useGetListingUnavailableDatesQuery,
};

// Export all actions
export {
  setCurrentListing,
  setCurrentListings,
  setUsingGeolocation,
  updateFilter,
  updateFilters,
  clearFilters,
  setListingError,
  startNewListing,
  updateDraftListing,
  setListingStep,
  clearDraftListing,
  setUploadProgress,
  toggleListingSelection,
  clearSelectedListings,
  setInitialListingsLoaded,
  resetFilters,
};

// Export all selectors
export {
  selectCurrentListing,
  selectActiveFilter,
  selectIsUsingGeolocation,
  selectCurrentListings,
  selectDraftListing,
  selectListingStep,
  selectActiveFilters,
  selectInitialListingsLoaded,
  selectIsCreatingListing,
  selectIsFilteringListings,
  selectListingError,
  selectUploadProgress,
  selectSelectedListingIds,
  selectIsDraftDirty,
  selectIsListingSelected,
  selectAllListings,
};

// Export types
export type {
  ListingFilter,
  CreateListingRequest,
  UnavailableDate,
  UnavailableDatesResponse,
};
