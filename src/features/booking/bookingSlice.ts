import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookingApi, BookingResponse } from './bookingService';

interface BookingDetails {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  totalPrice: number;
}

interface BookingState {
  currentBooking: BookingDetails | null;
  bookingHistory: BookingResponse[];
  isProcessing: boolean;
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  bookingHistory: [],
  isProcessing: false,
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    startBooking: (state, action: PayloadAction<BookingDetails>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setBookingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking matchers
      .addMatcher(
        bookingApi.endpoints.createBooking.matchPending,
        (state) => {
          state.isProcessing = true;
          state.error = null;
        }
      )
      .addMatcher(
        bookingApi.endpoints.createBooking.matchFulfilled,
        (state, { payload }) => {
          state.isProcessing = false;
          state.currentBooking = null;
          // Add to history in a way that preserves BookingResponse type
          state.bookingHistory = [payload as BookingResponse, ...state.bookingHistory];
        }
      )
      .addMatcher(
        bookingApi.endpoints.createBooking.matchRejected,
        (state, { error }) => {
          state.isProcessing = false;
          state.error = error.message || 'Failed to create booking';
        }
      )
      
      // Get bookings by user matchers
      .addMatcher(
        bookingApi.endpoints.getBookingsByUserId.matchPending,
        (state) => {
          state.isProcessing = true;
        }
      )
      .addMatcher(
        bookingApi.endpoints.getBookingsByUserId.matchFulfilled,
        (state, { payload }) => {
          state.isProcessing = false;
          state.bookingHistory = payload as BookingResponse[];
        }
      )
      .addMatcher(
        bookingApi.endpoints.getBookingsByUserId.matchRejected,
        (state, { error }) => {
          state.isProcessing = false;
          state.error = error.message || 'Failed to fetch bookings';
        }
      )
  },
});

// Export actions
export const {
  startBooking,
  clearCurrentBooking,
  setBookingError,
} = bookingSlice.actions;

// Export selectors
export const selectCurrentBooking = (state: { booking: BookingState }) => 
  state.booking.currentBooking;
export const selectBookingHistory = (state: { booking: BookingState }) => 
  state.booking.bookingHistory;
export const selectIsProcessing = (state: { booking: BookingState }) => 
  state.booking.isProcessing;
export const selectBookingError = (state: { booking: BookingState }) => 
  state.booking.error;

export default bookingSlice.reducer;