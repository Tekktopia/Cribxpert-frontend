import { createApi } from '@reduxjs/toolkit/query/react';
import { PropertyListing } from '@/types';
import { baseQuery } from '@/features/api';

// filter interface based on API documentation
export interface ListingFilter {
  // Location filters
  state?: string;
  country?: string;
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
  // Ownership
  userId: string;

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
  amenities?: string[];

  // Pricing information
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;

  // Availability
  avaliableFrom: string; // Note: API uses "avaliable" not "available"
  avaliableUntil: string;

  // Rules and settings
  houseRules?: string[];
  additionalRules?: string;

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
  // AFTER:
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    // GET /listing - Get all listings with optional filters
    getListings: builder.query<{ listings: PropertyListing[] }, ListingFilter | void>({
      query: (filters) => {
        const formattedFilters = filters ? { ...filters } : undefined;
        return {
          url: '/listing',
          params: { ...formattedFilters, _t: Date.now() },
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
    getListingById: builder.query<{ listing: PropertyListing }, string>({
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
          Object.entries(data).forEach(([key, value]) => {
            if (key === 'files' || value === undefined || value === null) {
              return;
            }

            if (Array.isArray(value)) {
              value.forEach((item) => {
                if (item !== undefined && item !== null) {
                  formData.append(key, item.toString());
                }
              });
            } else {
              formData.append(key, value.toString());
            }
          });

          // Append files using backend field name
          data.files.forEach((file) => {
            formData.append('listingImg', file);
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
        const { files, ...jsonPayload } = data;
        return {
          url: '/listing',
          method: 'PATCH',
          body: jsonPayload,
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

    // GET /listing/user - Get all listings created by the authenticated user
    getUserListings: builder.query<PropertyListing[], void>({
      query: () => `/listing/user`,
      transformResponse: (response: { listings: PropertyListing[] }) => {
        return response.listings || [];
      },
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
      query: (listingId) => `/listing/unavailable-dates/${listingId}`,
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
