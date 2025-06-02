import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import slices from features
import authReducer from '@/features/auth';
import { bookingReducer } from '@/features/booking';

// Import API services
import { authApi } from '@/features/auth/authService';
// import { listingApi } from '@/features/listing';
import { bookingApi } from '@/features/booking/bookingService';
import favouritesReducer, { favouritesApi } from '@/features/favourites';

export const store = configureStore({
  reducer: {
    // Feature slices
    auth: authReducer,
    booking: bookingReducer,
    favourites: favouritesReducer,

    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      //   listingApi.middleware,
      bookingApi.middleware,
      favouritesApi.middleware
    ),
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
