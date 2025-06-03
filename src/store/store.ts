import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import slices from features
import authReducer from '@/features/auth';
import { bookingReducer } from '@/features/booking';
import { propertyReducer, propertyTypeApi } from '@/features/propertyType';

// Import API services
import { authApi } from '@/features/auth/authService';
import { bookingApi } from '@/features/booking/bookingService';
import favouritesReducer, { favouritesApi } from '@/features/favourites';
import amenitiesReducer, { amenitiesApi } from '@/features/amenities';
import listingReducer, { listingApi } from '@/features/listing';

export const store = configureStore({
  reducer: {
    // Feature slices
    auth: authReducer,
    booking: bookingReducer,
    favourites: favouritesReducer,
    amenities: amenitiesReducer,
    listing: listingReducer,
    property: propertyReducer,

    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    [amenitiesApi.reducerPath]: amenitiesApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [propertyTypeApi.reducerPath]: propertyTypeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      listingApi.middleware,
      bookingApi.middleware,
      favouritesApi.middleware,
      amenitiesApi.middleware,
      propertyTypeApi.middleware
    ),
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
