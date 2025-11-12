import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import slices from features
import authReducer from '@/features/auth';
import { bookingReducer } from '@/features/bookings';
import { propertyTypeReducer, propertyTypeApi } from '@/features/propertyType';
import reviewReducer, { reviewApi } from '@/features/review';
import notificationReducer, { notificationApi } from '@/features/notifications';
import { messageReducer, messageApi } from '@/features/messages';

// Import API services
import { authApi } from '@/features/auth/authService';
import { bookingApi } from '@/features/bookings/bookingService';
import favouritesReducer, { favouritesApi } from '@/features/favourites';
import amenitiesReducer, { amenitiesApi } from '@/features/amenities';
import listingReducer, { listingApi } from '@/features/properties';
import { houseRuleApi } from '@/features/houseRule/houseRuleService';
import houseRuleReducer from '@/features/houseRule/houseRuleSlice';

export const store = configureStore({
  reducer: {
    // Feature slices
    houseRule: houseRuleReducer,
    auth: authReducer,
    booking: bookingReducer,
    favourites: favouritesReducer,
    amenities: amenitiesReducer,
    listing: listingReducer,
    propertyType: propertyTypeReducer,
    review: reviewReducer,
    notification: notificationReducer,
    messages: messageReducer,

    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    [amenitiesApi.reducerPath]: amenitiesApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [propertyTypeApi.reducerPath]: propertyTypeApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      listingApi.middleware,
      bookingApi.middleware,
      favouritesApi.middleware,
      amenitiesApi.middleware,
      propertyTypeApi.middleware,
      reviewApi.middleware,
      notificationApi.middleware
    ),
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
