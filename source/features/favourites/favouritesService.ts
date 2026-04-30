import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { PropertyListing } from '@/types';

// Reuse the same select string shape as listingService so we get the full listing shape
const LISTING_SELECT = `
  *,
  property_type:property_types!property_type_id(id, name, icon:property_type_icons(file_url)),
  user:profiles!user_id(id, full_name, email),
  amenities:listing_amenities(amenity:amenities(id, name, icon:amenity_icons(file_url))),
  images:listing_listing_images(sort_order, image:listing_images!listing_image_id(id, file_url, file_name, public_id)),
  house_rules:listing_house_rules(rule:house_rules(id, name))
`.trim();

function mapListing(row: Record<string, unknown>): PropertyListing {
  return {
    _id: row.id as string,
    propertyId: row.property_id as string | undefined,
    userId: row.user
      ? {
          _id: (row.user as Record<string, string>).id,
          fullName: (row.user as Record<string, string>).full_name,
          email: (row.user as Record<string, string>).email,
        }
      : (row.user_id as string),
    name: row.name as string,
    description: (row.description as string) ?? '',
    propertyType: row.property_type
      ? {
          _id: (row.property_type as Record<string, unknown>).id as string,
          name: (row.property_type as Record<string, unknown>).name as string,
          icon: {
            fileUrl:
              ((row.property_type as Record<string, unknown>).icon as Record<string, string>)
                ?.file_url ?? '',
          },
        }
      : ((row.property_type_id as string) ?? ''),
    street: (row.street as string) ?? '',
    city: (row.city as string) ?? '',
    state: (row.state as string) ?? '',
    postalCode: (row.postal_code as string) ?? '',
    country: (row.country as string) ?? '',
    longitude: row.longitude as number | undefined,
    latitude: row.latitude as number | undefined,
    hideStatus: (row.hide_status as boolean) ?? false,
    status: row.status as string | undefined,
    basePrice: (row.base_price as number) ?? 0,
    securityDeposit: (row.security_deposit as number) ?? 0,
    cleaningFee: (row.cleaning_fee as number) ?? 0,
    avaliableFrom: (row.available_from as string) ?? '',
    avaliableUntil: (row.available_until as string) ?? '',
    houseRules: ((row.house_rules as Array<{ rule: { id: string } }>) ?? []).map(
      (hr) => hr.rule?.id ?? ''
    ),
    additionalRules: (row.additional_rules as string) ?? '',
    guestNo: (row.guest_no as number) ?? 0,
    size: (row.size as number) ?? 0,
    bathroomNo: (row.bathroom_no as number) ?? 0,
    bedroomNo: (row.bedroom_no as number) ?? 0,
    amenities: ((row.amenities as Array<{ amenity: Record<string, unknown> }>) ?? []).map(
      (la) => ({
        _id: la.amenity?.id as string,
        name: la.amenity?.name as string,
        icon: la.amenity?.icon
          ? { fileUrl: (la.amenity.icon as Record<string, string>).file_url }
          : undefined,
      })
    ),
    listingImg: (
      (row.images as Array<{ sort_order: number; image: Record<string, string> }>) ?? []
    )
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((li) => ({
        _id: li.image?.id ?? '',
        fileUrl: li.image?.file_url ?? '',
        fileName: li.image?.file_name,
      })),
    rating: (row.rating as number) ?? 0,
    createdAt: (row.created_at as string) ?? '',
    updatedAt: (row.updated_at as string) ?? '',
    __v: 0,
  };
}

export const favouritesApi = createApi({
  reducerPath: 'favouritesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Favourite'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 60,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getFavouritesByUserId: builder.query<PropertyListing[], string>({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from('favourites')
          .select(`listing:listings!listing_id(${LISTING_SELECT})`)
          .eq('user_id', userId);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        const listings = ((data ?? []) as unknown as Array<{ listing: Record<string, unknown> | null }>)
          .map((row) => row.listing)
          .filter(Boolean)
          .map((l) => mapListing(l!));
        return { data: listings };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Favourite' as const, id: _id })),
              { type: 'Favourite', id: 'LIST' },
            ]
          : [{ type: 'Favourite', id: 'LIST' }],
    }),

    addFavourite: builder.mutation<void, { listingId: string; userId: string }>({
      queryFn: async ({ listingId, userId }) => {
        const { error } = await supabase
          .from('favourites')
          .insert({ listing_id: listingId, user_id: userId });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: [{ type: 'Favourite', id: 'LIST' }],
    }),

    removeFavourite: builder.mutation<void, { userId: string; listingId: string }>({
      queryFn: async ({ userId, listingId }) => {
        const { error } = await supabase
          .from('favourites')
          .delete()
          .eq('user_id', userId)
          .eq('listing_id', listingId);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: [{ type: 'Favourite', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetFavouritesByUserIdQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} = favouritesApi;
