import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';
import { PropertyListing } from '@/types';

interface FavouritesResponse {
  _id: string;
  userId: string;
  listing: PropertyListing[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Create the service
export const favouritesApi = createApi({
  reducerPath: 'favouritesApi',
  baseQuery,
  tagTypes: ['Favourite'],
  keepUnusedDataFor: 300, // Cache favourites for 5 minutes
  refetchOnMountOrArgChange: 60, // Only refetch if data is older than 60 seconds
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    // GET /favourites/{userId} - Get a user's favourites
    getFavouritesByUserId: builder.query<PropertyListing[], string>({
      query: (userId) => `/favourites/${userId}`,
      // Transform the response to match FavouriteItem interface
      transformResponse: (response: { favourites: FavouritesResponse }) => {
        const favourites = response.favourites;

        // Map the nested listings to format
        return favourites.listing;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Favourite' as const,
                id: _id,
              })),
              { type: 'Favourite', id: 'LIST' },
            ]
          : [{ type: 'Favourite', id: 'LIST' }],
    }),

    // POST /favourites - Add a listing to favourites
    addFavourite: builder.mutation<void, { listingId: string; userId: string }>({
      query: (data) => ({
        url: '/favourites',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Favourite', id: 'LIST' }],
    }),

    // DELETE /favourites - Remove a listing from favourites
    removeFavourite: builder.mutation<
      void,
      { userId: string; listingId: string }
    >({
      query: (data) => ({
        url: '/favourites',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: [{ type: 'Favourite', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetFavouritesByUserIdQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} = favouritesApi;
