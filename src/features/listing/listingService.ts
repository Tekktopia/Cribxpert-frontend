import { createApi } from '@reduxjs/toolkit/query/react';
import { PropertyListing } from '@/types';
import { baseQuery } from '@/features/api';

// filter interface based on API documentation
export interface ListingFilter {
  // Location filters
  state?: string;
  country?:string;
  city?: string;

  // Property details filters
  guestNo?: number;
  propertyType?: string;
  // bedrooms?: number;
  // amenities?: string[];

  // Price filters
  // priceMin?: number;
  // priceMax?: number;

  // Date filters
  startDate?: string; // for availability check
  endDate?: string; // for availability check
}

export interface CreateListingRequest {
  // Basic info
  name: string;
  description: string;
  propertyType: string;

  // Location details
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Property details
  size: number;
  bedroomNo: number;
  bathroomNo: number;
  guestNo: number;
  amenities: string[];

  // Pricing information
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;

  // Availability
  avaliableFrom: string; // Note: API uses "avaliable" not "available"
  avaliableUntil: string;

  // Rules and settings
  houseRules: string;

  // Images
  files?: File[]; // For file uploads
}

// Interface for unavailable dates response
export interface UnavailableDate {
  date: string; // ISO date string
  reason: 'booking' | 'cleanup'; // reason for unavailability
}

export interface UnavailableDatesResponse {
  unavailableDates: UnavailableDate[];
}

// Create the listing service
export const listingApi = createApi({
  reducerPath: 'listingApi',
  baseQuery,
  tagTypes: ['Listing'],
  endpoints: (builder) => ({
    // GET /listing - Get all listings with optional filters
    getListings: builder.query<{ listings: PropertyListing[] }, ListingFilter | void>({
      query: (filters) => {
        // Format dates if they exist
        const formattedFilters = filters ? { ...filters } : undefined;

        return {
          url: '/listing',
          params: formattedFilters,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.listings.map(({ _id }) => ({ type: 'Listing' as const, _id })),
              { type: 'Listing', _id: 'LIST' },
            ]
          : [{ type: 'Listing', id: 'LIST' }],
    }),

    // GET /listing/{listingId} - Get a listing by its ID
    getListingById: builder.query<{listing: PropertyListing}, string>({
      query: (id) => `/listing/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Listing', id }],
    }),

    // PATCH /listing - Create or update a listing
    createOrUpdateListing: builder.mutation<
      PropertyListing,
      Partial<CreateListingRequest> & { id?: string }
    >({
      query: (data) => {
        // Special handling for form data if files are included
        if (data.files && data.files.length > 0) {
          const formData = new FormData();

          // Append all non-file fields to the form data
          Object.keys(data).forEach((key) => {
            if (key !== 'files') {
              // Handle arrays (like amenities) by stringifying them
              if (Array.isArray(data[key as keyof typeof data])) {
                formData.append(
                  key,
                  JSON.stringify(data[key as keyof typeof data])
                );
              } else {
                const value = data[key as keyof typeof data];
                formData.append(
                  key,
                  value !== undefined && value !== null ? value.toString() : ''
                );
              }
            }
          });

          // Append files
          data.files.forEach((file) => {
            formData.append('files', file);
          });

          return {
            url: '/listing',
            method: 'PATCH',
            body: formData,
            // Don't set Content-Type header as browser will set it with boundary
            formData: true,
          };
        }

        // Standard JSON request if no files
        return {
          url: '/listing',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { id }) =>
        id
          ? [
              { type: 'Listing', id },
              { type: 'Listing', id: 'LIST' },
            ]
          : [{ type: 'Listing', id: 'LIST' }],
    }),

    // DELETE /listing/{listingId} - Delete a listing and its images
    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/listing/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Listing', id },
        { type: 'Listing', id: 'LIST' },
        { type: 'Listing', id: 'USER_LISTINGS' },
      ],
    }),

    // GET /listing/user/{userId} - Get all listings created by a specific user
    getUserListings: builder.query<PropertyListing[], string>({
      query: (userId) => `/listing/user/${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Listing' as const, _id })),
              { type: 'Listing', id: 'USER_LISTINGS' },
            ]
          : [{ type: 'Listing', id: 'USER_LISTINGS' }],
    }),

    // GET /listing/uncompleted - Get all uncompleted listings
    getUncompletedListings: builder.query<PropertyListing[], void>({
      query: () => `/listing/uncompleted`,
      providesTags: [{ type: 'Listing', id: 'UNCOMPLETED' }],
    }),

    // DELETE /listing/image/{listingId} - Delete an image from a listing
    deleteListingImage: builder.mutation<
      void,
      { listingId: string; imageId: string }
    >({
      query: ({ listingId, imageId }) => ({
        url: `/listing/image/${listingId}`,
        method: 'DELETE',
        body: { imageId },
      }),
      invalidatesTags: (_result, _error, { listingId }) => [
        { type: 'Listing', id: listingId },
      ],
    }),

    // GET /listing/{listingId}/unavailable-dates - Get unavailable dates for a listing
    getListingUnavailableDates: builder.query<UnavailableDatesResponse, string>({
      query: (listingId) => `/listings/${listingId}/unavailable-dates`,
      providesTags: (_result, _error, listingId) => [
        { type: 'Listing', id: `${listingId}-unavailable-dates` },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useCreateOrUpdateListingMutation,
  useDeleteListingMutation,
  useGetUserListingsQuery,
  useGetUncompletedListingsQuery,
  useDeleteListingImageMutation,
  useGetListingUnavailableDatesQuery,
} = listingApi;
