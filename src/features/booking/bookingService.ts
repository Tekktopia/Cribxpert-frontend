import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';
import { PropertyListing } from '@/types';

// API request format
export interface BookingRequest {
  startDate: string;
  endDate: string;
  travelersNo: number;
  totalPrice: number;
  userId: string;
  listing: string; // This is the property/listing ID
  specialRequests?: string; // Optional field you may want to keep
}

export interface Booking {
  userId: string;
  startDate: string;
  endDate: string;
  travelersNo: number;
  totalPrice: number;
  status: string;
  refundStatus: string;
  cancellationDate: string | null;
  cancellationReason: string | null;
  cancellationBy: string | null;
  totalRefund: number;
  listing: PropertyListing; // Changed from string to PropertyListing
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface CreateBookingResponse {
  message: string;
  booking: Booking;
}
export interface BookingResponse {
  message: string;
  bookings: Booking[];
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery,
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    createBooking: builder.mutation<CreateBookingResponse, BookingRequest>({
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
    getBookingsByUserId: builder.query<BookingResponse, string>({
      query: (userId) => `/booking/user/${userId}`,
      providesTags: (result) =>
        result && result.bookings
          ? [
              ...result.bookings.map((booking) => ({
                type: 'Booking' as const,
                _id: booking._id,
              })),
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
