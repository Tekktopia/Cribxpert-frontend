import { bookingSlice } from './bookingSlice';

// Export actions
export const {
  startBooking,
  clearCurrentBooking,
  setBookingError,
} = bookingSlice.actions;

// Export reducer
export { default as bookingReducer } from './bookingSlice';

// Export the slice
export const booking = bookingSlice;
