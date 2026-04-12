import { store } from '@/store/store';
import { listingApi } from './listingService';

/**
 * Initializes listings by triggering the API call to fetch all listings
 * as soon as the application starts.
 */
export const initializeListings = () => {
  // Dispatch the getListings query to fetch all listings immediately
  store.dispatch(listingApi.endpoints.getListings.initiate());
};
