import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// API request format
export interface BookingRequest {
  startDate: string;
  endDate: string;
  travelersNo: number;
  totalPrice: number;
  listing: string; // This is the property/listing ID
  specialRequests?: string; // Optional field you may want to keep
}

export interface BookingResponse {
  id: string;
  startDate: string;
  endDate: string;
  travelersNo: number;
  totalPrice: number;
  listing: string;
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt?: string;
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery,
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (booking) => ({
        url: '/booking',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['Booking'],
    }),
    getBookingById: builder.query<BookingResponse, string>({
      query: (id) => `/booking/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Booking', id }],
    }),
    getBookingsByUserId: builder.query<BookingResponse[], string>({
      query: (userId) => `/booking/user/${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useGetBookingsByUserIdQuery,
} = bookingApi;
