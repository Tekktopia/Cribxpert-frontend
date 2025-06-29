import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favouritesApi } from './favouritesService';
import { PropertyListing } from '@/types';

// Favourites state interface
interface FavouritesState {
  // Online favourites from the API
  items: PropertyListing[];

  // Loading state for API operations
  isLoading: boolean;

  // Error messages from API operations
  error: string | null;

  // Offline favourites - just stores listing IDs when device is offline
  offlineFavourites: string[];

  // Pending operations to sync when back online
  pendingSync: {
    add: string[]; // Listing IDs to add when back online
    remove: string[]; // Listing IDs to remove when back online
  };

  // Flag to track if we're currently online or offline
  isOnline: boolean;
}

const initialState: FavouritesState = {
  items: [],
  isLoading: false,
  error: null,
  offlineFavourites: [],
  pendingSync: {
    add: [],
    remove: [],
  },
  isOnline: navigator.onLine, // Initialize with current online status
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Update online status
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },

    // Add a favourite when offline
    addOfflineFavourite: (state, action: PayloadAction<string>) => {
      const listingId = action.payload;
      if (!state.offlineFavourites.includes(listingId)) {
        state.offlineFavourites.push(listingId);
        // Also track this for syncing later
        if (!state.pendingSync.add.includes(listingId)) {
          state.pendingSync.add.push(listingId);
        }
        // Remove from pending removals if it was there
        const removeIndex = state.pendingSync.remove.indexOf(listingId);
        if (removeIndex !== -1) {
          state.pendingSync.remove.splice(removeIndex, 1);
        }
      }
    },

    // Remove a favourite when offline
    removeOfflineFavourite: (state, action: PayloadAction<string>) => {
      const listingId = action.payload;
      // Remove from offline favourites
      const index = state.offlineFavourites.indexOf(listingId);
      if (index !== -1) {
        state.offlineFavourites.splice(index, 1);
      }

      // Track for syncing later
      if (!state.pendingSync.remove.includes(listingId)) {
        state.pendingSync.remove.push(listingId);
      }

      // Remove from pending additions if it was there
      const addIndex = state.pendingSync.add.indexOf(listingId);
      if (addIndex !== -1) {
        state.pendingSync.add.splice(addIndex, 1);
      }
    },

    // Clear all favourites (for logout)
    clearFavourites: (state) => {
      state.items = [];
      state.offlineFavourites = [];
      state.pendingSync = {
        add: [],
        remove: [],
      };
    },

    // Update favourite display order
    reorderFavourites: (state, action: PayloadAction<PropertyListing[]>) => {
      state.items = action.payload;
    },

    // Set an error message
    setFavouriteError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear pending sync after successful sync
    clearPendingSync: (state) => {
      state.pendingSync = {
        add: [],
        remove: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading states
      .addMatcher(
        favouritesApi.endpoints.getFavouritesByUserId.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      // Handle successful fetch
      .addMatcher(
        favouritesApi.endpoints.getFavouritesByUserId.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.items = payload;
          state.error = null;
        }
      )
      // Handle fetch errors
      .addMatcher(
        favouritesApi.endpoints.getFavouritesByUserId.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Failed to fetch favourites';
        }
      )
      // Reset loading when adding a favourite
      .addMatcher(favouritesApi.endpoints.addFavourite.matchPending, (state) => {
        state.error = null;
      })
      // Handle add favourite errors
      .addMatcher(
        favouritesApi.endpoints.addFavourite.matchRejected,
        (state, { error }) => {
          state.error = error.message || 'Failed to add favourite';
        }
      )
      // Reset loading when removing a favourite
      .addMatcher(
        favouritesApi.endpoints.removeFavourite.matchPending,
        (state) => {
          state.error = null;
        }
      )
      // Handle remove favourite errors
      .addMatcher(
        favouritesApi.endpoints.removeFavourite.matchRejected,
        (state, { error }) => {
          state.error = error.message || 'Failed to remove favourite';
        }
      );
  },
});

// Export actions
export const {
  setOnlineStatus,
  addOfflineFavourite,
  removeOfflineFavourite,
  clearFavourites,
  reorderFavourites,
  setFavouriteError,
  clearPendingSync,
} = favouritesSlice.actions;

// Export selectors
export const selectFavourites = (state: { favourites: FavouritesState }) =>
  state.favourites.items;

export const selectFavouritesLoading = (state: {
  favourites: FavouritesState;
}) => state.favourites.isLoading;

export const selectFavouritesError = (state: { favourites: FavouritesState }) =>
  state.favourites.error;

export const selectIsItemFavourited =
  (listingId: string) => (state: { favourites: FavouritesState }) => {
    // Check both online and offline favourites
    return (
      state.favourites.items.some((item) => item._id === listingId) ||
      state.favourites.offlineFavourites.includes(listingId)
    );
  };

export const selectFavouritesByCity =
  (city: string) => (state: { favourites: FavouritesState }) => {
    return state.favourites.items.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase()
    );
  };

// Export reducer
export default favouritesSlice.reducer;
