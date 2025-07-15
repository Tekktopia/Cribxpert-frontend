import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favouritesApi } from './favouritesService';
import { PropertyListing } from '@/types';

// Favourites state interface
interface FavouritesState {
  items: PropertyListing[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Clear all favourites (for logout)
    clearFavourites: (state) => {
      state.items = [];
    },

    // Update favourite display order
    reorderFavourites: (state, action: PayloadAction<PropertyListing[]>) => {
      state.items = action.payload;
    },

    // Set an error message
    setFavouriteError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
      .addMatcher(
        favouritesApi.endpoints.addFavourite.matchPending,
        (state) => {
          state.error = null;
        }
      )
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
export const { clearFavourites, reorderFavourites, setFavouriteError } =
  favouritesSlice.actions;

// Export selectors
export const selectFavourites = (state: { favourites: FavouritesState }) =>
  state.favourites.items;

export const selectFavouritesLoading = (state: {
  favourites: FavouritesState;
}) => state.favourites.isLoading;

export const selectFavouritesError = (state: { favourites: FavouritesState }) =>
  state.favourites.error;

export const selectIsItemFavourited =
  (listingId: string) => (state: { favourites?: FavouritesState }) => {
    return !!state.favourites?.items?.find((item) => item._id === listingId);
  };

export const selectFavouritesByCity =
  (city: string) => (state: { favourites: FavouritesState }) => {
    return state.favourites.items.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase()
    );
  };

// Export reducer
export default favouritesSlice.reducer;
