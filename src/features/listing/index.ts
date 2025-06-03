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
  setFilter,
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
  setFilter,
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