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
  type ListingFilter,
  type CreateListingRequest
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
  selectActiveFilters,
  selectIsCreatingListing,
  selectIsFilteringListings,
  selectListingError,
  selectUploadProgress,
  selectSelectedListingIds,
  selectIsDraftDirty,
  selectIsListingSelected,
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
  useDeleteListingImageMutation
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
  clearSelectedListings
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
  selectIsCreatingListing,
  selectIsFilteringListings,
  selectListingError,
  selectUploadProgress,
  selectSelectedListingIds,
  selectIsDraftDirty,
  selectIsListingSelected
};

// Export types
export type {
  ListingFilter,
  CreateListingRequest,
};