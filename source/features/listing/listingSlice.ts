import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyListing } from '@/types';
import { listingApi, CreateListingRequest } from './listingService';

// Define types for UI-specific state
interface DraftListing extends Partial<CreateListingRequest> {
  id?: string;
  step?: number;
  uploadProgress?: number;
  isDirty?: boolean;
}

// Update the interface for activeFilters to include amenities as string[]
interface ListingState {
  // Current listing being viewed or edited
  currentListing: PropertyListing | null;

  // List of all current listings (for search results, etc.)
  currentListings: PropertyListing[];

  // All listings fetched from the server
  allListings?: PropertyListing[] | [];

  // Draft listing for multi-step form
  draftListing: DraftListing;

  // Active search filters
  activeFilters: {
    country?: string;
    stateProvince?: string;
    city?: string;
    propertyType?: string;
    bedrooms?: string;
    amenities?: string[] | string; // Update to support both string and string[] for backward compatibility
    bookingAvailability?: string; // New field for booking availability
    priceRange?: string; // New field for price range
    priceMin?: string; // New field for minimum price
    priceMax?: string; // New field for maximum price
    rating?: string; // New field for rating
    location?: string; // New field for location search
    [key: string]: string | string[] | undefined;
  };

  // UI states
  isCreating: boolean;
  isFiltering: boolean;
  isLoadingUserListings: boolean;
  error: string | null;

  // Selected listing IDs (for bulk operations)
  selectedListingIds: string[];

  // Track if we're using geolocation
  isUsingGeolocation: boolean;

  initialListingsLoaded?: boolean; // Track if initial listings are loaded
}

// Initial state
const initialState: ListingState = {
  currentListing: null,
  currentListings: [],
  allListings: [],
  draftListing: {
    step: 1,
    uploadProgress: 0,
    isDirty: false,
  },
  activeFilters: {
    country: '',
    stateProvince: '',
    city: '',
    guestNo: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    amenities: [], // Update to initialize as an array
    bookingAvailability: '',
    priceMin: '',
    priceMax: '',
    rating: '',
    location: '',
    startDate: '',
    endDate: '',
  },
  isCreating: false,
  isFiltering: false,
  isLoadingUserListings: false,
  error: null,
  selectedListingIds: [],
  isUsingGeolocation: false,
  initialListingsLoaded: false, // Track if initial listings are loaded
};

// Create the slice
export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    // Set current listing being viewed
    setCurrentListing: (
      state,
      action: PayloadAction<PropertyListing | null>
    ) => {
      state.currentListing = action.payload;
    },

    // Add these reducers
    setCurrentListings: (state, action: PayloadAction<PropertyListing[]>) => {
      state.currentListings = action.payload;
    },

    // Set all listings fetched from the server
    setAllListings: (state, action: PayloadAction<PropertyListing[]>) => {
      state.allListings = action.payload;
    },

    // Update a single filter
    updateFilter: (
      state,
      action: PayloadAction<{ name: string; value: string | string[] }>
    ) => {
      const { name, value } = action.payload;
      state.activeFilters = {
        ...state.activeFilters,
        [name]: value,
      };
      state.isFiltering = true;
    },

    // Update multiple filters at once
    updateFilters: (state, action: PayloadAction<Record<string, string>>) => {
      state.activeFilters = {
        ...state.activeFilters,
        ...action.payload,
      };
      state.isFiltering = true;
    },

    // Reset filters to initial values
    resetFilters: (state) => {
      state.activeFilters = { ...initialState.activeFilters };
      state.isFiltering = false;
    },

    // Toggle geolocation usage
    setUsingGeolocation: (state, action: PayloadAction<boolean>) => {
      state.isUsingGeolocation = action.payload;
    },

    // Clear all filters
    clearFilters: (state) => {
      state.activeFilters = {};
      state.isFiltering = false;
    },

    // Set error message
    setListingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Start a new listing draft
    startNewListing: (state) => {
      state.draftListing = {
        ...initialState.draftListing,
        step: 1,
      };
      state.isCreating = true;
    },

    // Update draft listing
    updateDraftListing: (
      state,
      action: PayloadAction<Partial<DraftListing>>
    ) => {
      state.draftListing = {
        ...state.draftListing,
        ...action.payload,
        isDirty: true,
      };
    },

    // Set the current step in multi-step form
    setListingStep: (state, action: PayloadAction<number>) => {
      state.draftListing.step = action.payload;
    },

    // Clear the draft listing
    clearDraftListing: (state) => {
      state.draftListing = initialState.draftListing;
      state.isCreating = false;
    },

    // Set upload progress for files
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.draftListing.uploadProgress = action.payload;
    },

    // Toggle a listing selection (for bulk operations)
    toggleListingSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedListingIds.indexOf(id);

      if (index === -1) {
        state.selectedListingIds.push(id);
      } else {
        state.selectedListingIds.splice(index, 1);
      }
    },

    // Clear all selected listings
    clearSelectedListings: (state) => {
      state.selectedListingIds = [];
    },

    // Set whether initial listings have been loaded
    setInitialListingsLoaded: (state, action: PayloadAction<boolean>) => {
      state.initialListingsLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading states for getListings
      .addMatcher(listingApi.endpoints.getListings.matchPending, (state) => {
        state.error = null;
      })
      .addMatcher(
        listingApi.endpoints.getListings.matchFulfilled,
        (state, { payload }) => {
          // When listings are fetched, update both currentListings and allListings
          state.currentListings = payload.listings;
          state.allListings = payload.listings;
          state.initialListingsLoaded = true;
        }
      )
      .addMatcher(
        listingApi.endpoints.getListings.matchRejected,
        (state, { error }) => {
          state.error = error.message || 'Failed to fetch listings';
        }
      )

      // Handle loading states for getListingById
      .addMatcher(listingApi.endpoints.getListingById.matchPending, (state) => {
        state.error = null;
      })
      .addMatcher(
        listingApi.endpoints.getListingById.matchFulfilled,
        (state, { payload }) => {
          state.currentListing = payload.listing;
        }
      )
      .addMatcher(
        listingApi.endpoints.getListingById.matchRejected,
        (state, { error }) => {
          state.error = error.message || 'Failed to fetch listing details';
        }
      )

      // Handle loading states for getUserListings
      .addMatcher(
        listingApi.endpoints.getUserListings.matchPending,
        (state) => {
          state.isLoadingUserListings = true;
          state.error = null;
        }
      )
      .addMatcher(
        listingApi.endpoints.getUserListings.matchFulfilled,
        (state) => {
          state.isLoadingUserListings = false;
        }
      )
      .addMatcher(
        listingApi.endpoints.getUserListings.matchRejected,
        (state, { error }) => {
          state.isLoadingUserListings = false;
          state.error = error.message || 'Failed to fetch your listings';
        }
      )

      // Handle create/update listing
      .addMatcher(
        listingApi.endpoints.createOrUpdateListing.matchPending,
        (state) => {
          state.isCreating = true;
          state.error = null;
        }
      )
      .addMatcher(
        listingApi.endpoints.createOrUpdateListing.matchFulfilled,
        (state, { payload }) => {
          state.isCreating = false;
          state.currentListing = payload.listing;
          state.draftListing = initialState.draftListing;
        }
      )
      .addMatcher(
        listingApi.endpoints.createOrUpdateListing.matchRejected,
        (state, { error }) => {
          state.isCreating = false;
          state.error = error.message || 'Failed to save listing';
        }
      );
  },
});

// Export actions
export const {
  setCurrentListing,
  setCurrentListings,
  setAllListings,
  updateFilter,
  updateFilters,
  resetFilters,
  setUsingGeolocation,
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
} = listingSlice.actions;

// Export selectors
export const selectActiveFilter =
  (filterName: string) => (state: { listing: ListingState }) =>
    state.listing.activeFilters[filterName] || '';

export const selectIsUsingGeolocation = (state: { listing: ListingState }) =>
  state.listing.isUsingGeolocation;

export const selectCurrentListing = (state: { listing: ListingState }) =>
  state.listing.currentListing;

export const selectInitialListingsLoaded = (state: { listing: ListingState }) =>
  state.listing.initialListingsLoaded;

export const selectCurrentListings = (state: { listing: ListingState }) =>
  state.listing.currentListings;

// New selector to get all available listings from the server
export const selectAllListings = (state: { listing: ListingState }) =>
  state.listing.allListings;

export const selectDraftListing = (state: { listing: ListingState }) =>
  state.listing.draftListing;

export const selectListingStep = (state: { listing: ListingState }) =>
  state.listing.draftListing.step || 1;

export const selectActiveFilters = (state: { listing: ListingState }) =>
  state.listing.activeFilters;

export const selectIsCreatingListing = (state: { listing: ListingState }) =>
  state.listing.isCreating;

export const selectIsFilteringListings = (state: { listing: ListingState }) =>
  state.listing.isFiltering;

export const selectListingError = (state: { listing: ListingState }) =>
  state.listing.error;

export const selectUploadProgress = (state: { listing: ListingState }) =>
  state.listing.draftListing.uploadProgress || 0;

export const selectSelectedListingIds = (state: { listing: ListingState }) =>
  state.listing.selectedListingIds;

export const selectIsDraftDirty = (state: { listing: ListingState }) =>
  state.listing.draftListing.isDirty || false;

export const selectIsListingSelected =
  (listingId: string) => (state: { listing: ListingState }) =>
    state.listing.selectedListingIds.includes(listingId);

// Export reducer
export default listingSlice.reducer;
