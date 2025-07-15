// Import and re-export from favouritesService.ts
import {
  favouritesApi,
  useGetFavouritesByUserIdQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  type FavouriteItem,
} from './favouritesService';

// Import and re-export from favouritesSlice.ts
import favouritesReducer, {
  // Actions
  clearFavourites,
  reorderFavourites,
  setFavouriteError,

  // Selectors
  selectFavourites,
  selectFavouritesLoading,
  selectFavouritesError,
  selectIsItemFavourited,
  selectFavouritesByCity,
} from './favouritesSlice';

// Export the API for store configuration
export { favouritesApi };

// Export the reducer as default
export default favouritesReducer;

// Export hooks for component usage
export {
  useGetFavouritesByUserIdQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
};

// Export actions
export { clearFavourites, reorderFavourites, setFavouriteError };

// Export selectors
export {
  selectFavourites,
  selectFavouritesLoading,
  selectFavouritesError,
  selectIsItemFavourited,
  selectFavouritesByCity,
};

// Export types
export type { FavouriteItem };
