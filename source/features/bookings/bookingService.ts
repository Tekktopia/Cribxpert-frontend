import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { PropertyListing } from '@/types';

export interface BookingRequest {
  startDate: string;
  endDate: string;
  travelersNo: number;
  totalPrice: number;
  listing: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  sex: string;
  age: number;
  location: string;
  message: string;
}

export interface Booking {
  _id: string;
  userId: string;
  startDate: string;
  endDate: string;
  travelersNo: number;
  totalPrice: number;
  listing: PropertyListing | string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  sex: string;
  age: number;
  location: string;
  message: string;
  status: string;
  refundStatus: string;
  cancellationDate: string | null;
  cancellationReason: string | null;
  cancellationBy: string | null;
  totalRefund: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateBookingResponse {
  message: string;
  booking: Booking;
}

export interface BookingByUserIdResponse {
  message: string;
  bookings: Booking[];
}

export interface BookingResponse {
  message: string;
  booking: Booking;
}

const BOOKING_SELECT = `
  *,
  listing:listings!listing_id(
    id, name, street, city, state, country, base_price, cleaning_fee, security_deposit,
    guest_no, bedroom_no, bathroom_no, size, status, hide_status, rating,
    available_from, available_until, created_at, updated_at,
    property_type:property_types!property_type_id(id, name, icon:property_type_icons(file_url)),
    images:listing_listing_images(sort_order, image:listing_images(id, file_url, file_name))
  )
`.trim();

function mapBooking(row: Record<string, unknown>): Booking {
  const listingRow = row.listing as Record<string, unknown> | null;
  const listing: PropertyListing | string = listingRow
    ? {
        _id: listingRow.id as string,
        name: listingRow.name as string,
        street: (listingRow.street as string) ?? '',
        city: (listingRow.city as string) ?? '',
        state: (listingRow.state as string) ?? '',
        country: (listingRow.country as string) ?? '',
        basePrice: (listingRow.base_price as number) ?? 0,
        cleaningFee: (listingRow.cleaning_fee as number) ?? 0,
        securityDeposit: (listingRow.security_deposit as number) ?? 0,
        guestNo: (listingRow.guest_no as number) ?? 0,
        bedroomNo: (listingRow.bedroom_no as number) ?? 0,
        bathroomNo: (listingRow.bathroom_no as number) ?? 0,
        size: (listingRow.size as number) ?? 0,
        status: listingRow.status as string | undefined,
        hideStatus: (listingRow.hide_status as boolean) ?? false,
        rating: (listingRow.rating as number) ?? 0,
        avaliableFrom: (listingRow.available_from as string) ?? '',
        avaliableUntil: (listingRow.available_until as string) ?? '',
        userId: row.user_id as string,
        description: '',
        postalCode: '',
        propertyType: listingRow.property_type
          ? {
              _id: (listingRow.property_type as Record<string, unknown>).id as string,
              name: (listingRow.property_type as Record<string, unknown>).name as string,
              icon: {
                fileUrl:
                  ((listingRow.property_type as Record<string, unknown>).icon as Record<string, string>)?.file_url ?? '',
              },
            }
          : '',
        listingImg: (
          (listingRow.images as Array<{ sort_order: number; image: Record<string, string> }>) ?? []
        )
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((li) => ({
            _id: li.image?.id ?? '',
            fileUrl: li.image?.file_url ?? '',
            fileName: li.image?.file_name,
          })),
        amenities: [],
        houseRules: [],
        additionalRules: '',
        createdAt: (listingRow.created_at as string) ?? '',
        updatedAt: (listingRow.updated_at as string) ?? '',
        __v: 0,
      }
    : (row.listing_id as string);

  return {
    _id: row.id as string,
    userId: row.user_id as string,
    startDate: (row.start_date as string) ?? '',
    endDate: (row.end_date as string) ?? '',
    travelersNo: (row.travelers_no as number) ?? 0,
    totalPrice: (row.total_price as number) ?? 0,
    listing,
    firstName: (row.first_name as string) ?? '',
    lastName: (row.last_name as string) ?? '',
    email: (row.email as string) ?? '',
    phoneNo: (row.phone_no as string) ?? '',
    sex: (row.sex as string) ?? '',
    age: (row.age as number) ?? 0,
    location: (row.location as string) ?? '',
    message: (row.message as string) ?? '',
    status: (row.status as string) ?? '',
    refundStatus: (row.refund_status as string) ?? '',
    cancellationDate: row.cancellation_date as string | null,
    cancellationReason: row.cancellation_reason as string | null,
    cancellationBy: row.cancellation_by as string | null,
    totalRefund: (row.total_refund as number) ?? 0,
    createdAt: (row.created_at as string) ?? '',
    updatedAt: (row.updated_at as string) ?? '',
    __v: 0,
  };
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Booking'],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    createBooking: builder.mutation<CreateBookingResponse, BookingRequest>({
      queryFn: async (booking) => {
        const { data, error } = await supabase
          .from('bookings')
          .insert({
            user_id: booking.userId,
            listing_id: booking.listing,
            start_date: booking.startDate,
            end_date: booking.endDate,
            travelers_no: booking.travelersNo,
            total_price: booking.totalPrice,
            first_name: booking.firstName,
            last_name: booking.lastName,
            email: booking.email,
            phone_no: booking.phoneNo,
            sex: booking.sex,
            age: booking.age,
            location: booking.location,
            message: booking.message,
            status: 'Pending',
          })
          .select(BOOKING_SELECT)
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'Booking created successfully', booking: mapBooking(data) } };
      },
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),

    getBookingById: builder.query<BookingResponse, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from('bookings')
          .select(BOOKING_SELECT)
          .eq('id', id)
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'success', booking: mapBooking(data) } };
      },
      providesTags: (_result, _error, id) => [{ type: 'Booking', id }],
    }),

    getBookingsByUserId: builder.query<BookingByUserIdResponse, string>({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from('bookings')
          .select(BOOKING_SELECT)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: {
            message: 'success',
            bookings: (data ?? []).map(mapBooking),
          },
        };
      },
      providesTags: (result) =>
        result?.bookings
          ? [
              ...result.bookings.map(({ _id }) => ({ type: 'Booking' as const, id: _id })),
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
