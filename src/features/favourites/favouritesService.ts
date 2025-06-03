import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// Define types based on the actual API response
interface Listing {
  _id: string;
  name: string;
  description: string;
  amenities: string[];
  propertyType: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  hideStatus: boolean;
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;
  avaliableFrom: string;
  avaliableUntil: string;
  houseRules: string[];
  guestNo: number;
  size: number;
  bathroomNo: number;
  bedroomNo: number;
  listingImg: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface FavouritesResponse {
  _id: string;
  userId: string;
  listing: Listing[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Simplified favourite item for UI use
export interface FavouriteItem {
  id: string; // The favourites collection ID
  listingId: string; // The ID of the individual listing
  name: string; // Listing name for display
  city: string; // Location info
  state: string;
  basePrice: number; // Price info
  bedroomNo: number; // Property details
  bathroomNo: number;
  guestNo: number;
  imageUrl?: string; // First image if available
}

// Create the service
export const favouritesApi = createApi({
  reducerPath: 'favouritesApi',
  baseQuery,
  tagTypes: ['Favourite'],
  endpoints: (builder) => ({
    // GET /favourites/{userId} - Get a user's favourites
    getFavouritesByUserId: builder.query<FavouriteItem[], string>({
      query: (userId) => `/favourites/${userId}`,
      // Transform the response to match FavouriteItem interface
      transformResponse: (response: { favourites: FavouritesResponse }) => {
        const favourites = response.favourites;

        // Map the nested listings to format
        return favourites.listing.map((listing) => ({
          id: favourites._id, // ID of the favourites collection
          listingId: listing._id, // ID of the individual listing
          name: listing.name,
          city: listing.city,
          state: listing.state,
          basePrice: listing.basePrice,
          bedroomNo: listing.bedroomNo,
          bathroomNo: listing.bathroomNo,
          guestNo: listing.guestNo,
          imageUrl: listing.listingImg[0], // First image or undefined
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ listingId }) => ({
                type: 'Favourite' as const,
                id: listingId,
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
