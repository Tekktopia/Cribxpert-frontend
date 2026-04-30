import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PropertyListing } from '@/types';
import { supabase } from '@/lib/supabase';

export interface CreateListingRequest {
  id?: string;
  userId: string;
  name: string;
  description: string;
  propertyType: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  size: number;
  bedroomNo: number;
  bathroomNo: number;
  guestNo: number;
  amenities?: string[];
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;
  avaliableFrom: string;
  avaliableUntil: string;
  houseRules?: string[];
  additionalRules?: string;
  hideStatus?: boolean;
  files?: File[];
}

export interface ListingFilter {
  state?: string;
  country?: string;
  city?: string;
  guestNo?: number;
  propertyType?: string;
  startDate?: string;
  endDate?: string;
  amenities?: string;
}

// Full Supabase select string — joins all related tables in one query
const LISTING_SELECT = `
  *,
  property_type:property_types!property_type_id(id, name, icon:property_type_icons(file_url)),
  user:profiles!user_id(id, full_name, email),
  amenities:listing_amenities(amenity:amenities(id, name, icon:amenity_icons(file_url))),
  images:listing_listing_images(sort_order, image:listing_images!listing_image_id(id, file_url, file_name, public_id)),
  house_rules:listing_house_rules(rule:house_rules(id, name))
`.trim();

// Map a raw Supabase row → PropertyListing shape the components expect
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
    description: row.description as string ?? '',
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
      : (row.property_type_id as string ?? ''),
    street: row.street as string ?? '',
    city: row.city as string ?? '',
    state: row.state as string ?? '',
    postalCode: row.postal_code as string ?? '',
    country: row.country as string ?? '',
    longitude: row.longitude as number | undefined,
    latitude: row.latitude as number | undefined,
    hideStatus: row.hide_status as boolean ?? false,
    status: row.status as string | undefined,
    basePrice: row.base_price as number ?? 0,
    securityDeposit: row.security_deposit as number ?? 0,
    cleaningFee: row.cleaning_fee as number ?? 0,
    avaliableFrom: row.available_from as string ?? '',
    avaliableUntil: row.available_until as string ?? '',
    houseRules: ((row.house_rules as Array<{ rule: { id: string } }>) ?? []).map(
      (hr) => hr.rule?.id ?? ''
    ),
    additionalRules: row.additional_rules as string ?? '',
    guestNo: row.guest_no as number ?? 0,
    size: row.size as number ?? 0,
    bathroomNo: row.bathroom_no as number ?? 0,
    bedroomNo: row.bedroom_no as number ?? 0,
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
    rating: row.rating as number ?? 0,
    createdAt: row.created_at as string ?? '',
    updatedAt: row.updated_at as string ?? '',
    __v: 0,
  };
}

export const listingApi = createApi({
  reducerPath: 'listingApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Listing'],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getListings: builder.query<{ listings: PropertyListing[] }, ListingFilter | void>({
      queryFn: async (filters) => {
        let query = supabase.from('listings').select(LISTING_SELECT);

        if (filters?.state) query = query.ilike('state', `%${filters.state}%`);
        if (filters?.city) query = query.ilike('city', `%${filters.city}%`);
        if (filters?.country) query = query.ilike('country', `%${filters.country}%`);
        if (filters?.guestNo) query = query.gte('guest_no', filters.guestNo);
        if (filters?.propertyType) query = query.eq('property_type_id', filters.propertyType);
        // Only show approved, unhidden listings to everyone
        query = query.eq('status', 'approved').eq('hide_status', false);

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { listings: (data ?? []).map(mapListing) } };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.listings.map(({ _id }) => ({ type: 'Listing' as const, id: _id })),
              { type: 'Listing', id: 'LIST' },
            ]
          : [{ type: 'Listing', id: 'LIST' }],
    }),

    getListingById: builder.query<{ listing: PropertyListing }, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from('listings')
          .select(LISTING_SELECT)
          .eq('id', id)
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { listing: mapListing(data) } };
      },
      providesTags: (_result, _error, id) => [{ type: 'Listing', id }],
    }),

    getUserListings: builder.query<PropertyListing[], { status?: string } | undefined>({
      queryFn: async (arg) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { data: [] };
        let query = supabase
          .from('listings')
          .select(LISTING_SELECT)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (arg?.status) query = query.eq('status', arg.status);
        const { data, error } = await query;
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: (data ?? []).map(mapListing) };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Listing' as const, id: _id })),
              { type: 'Listing', id: 'USER_LISTINGS' },
            ]
          : [{ type: 'Listing', id: 'USER_LISTINGS' }],
    }),

    createOrUpdateListing: builder.mutation<PropertyListing, Partial<CreateListingRequest>>({
      queryFn: async (payload) => {
        const row = {
          user_id: payload.userId,
          name: payload.name,
          description: payload.description,
          property_type_id: payload.propertyType,
          street: payload.street,
          city: payload.city,
          state: payload.state,
          postal_code: payload.postalCode,
          country: payload.country,
          size: payload.size,
          bedroom_no: payload.bedroomNo,
          bathroom_no: payload.bathroomNo,
          guest_no: payload.guestNo,
          base_price: payload.basePrice,
          security_deposit: payload.securityDeposit,
          cleaning_fee: payload.cleaningFee,
          available_from: payload.avaliableFrom,
          available_until: payload.avaliableUntil,
          additional_rules: payload.additionalRules,
          hide_status: payload.hideStatus ?? false,
        };

        let listingId = payload.id;
        if (listingId) {
          const { error } = await supabase.from('listings').update(row).eq('id', listingId);
          if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        } else {
          const { data, error } = await supabase
            .from('listings')
            .insert({ ...row, status: 'pending' })
            .select('id')
            .single();
          if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
          listingId = data.id;
        }

        // Update amenities junction
        if (payload.amenities !== undefined && listingId) {
          await supabase.from('listing_amenities').delete().eq('listing_id', listingId);
          if (payload.amenities.length > 0) {
            await supabase.from('listing_amenities').insert(
              payload.amenities.map((aid) => ({ listing_id: listingId, amenity_id: aid }))
            );
          }
        }

        // Upload images to Cloudinary, then save URLs to Supabase
        if (payload.files && payload.files.length > 0 && listingId) {
          const CLOUD_NAME = 'dm1ikqlsh';
          const UPLOAD_PRESET = 'cribxpert_listings';

          const { count: existingCount } = await supabase
            .from('listing_listing_images')
            .select('*', { count: 'exact', head: true })
            .eq('listing_id', listingId);

          const imageInserts: { listing_id: string; listing_image_id: string; sort_order: number }[] = [];

          for (let i = 0; i < payload.files.length; i++) {
            const file = payload.files[i];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            formData.append('folder', 'shortlet/listings');

            let cloudRes: { secure_url: string; public_id: string; original_filename: string };
            try {
              const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
              });
              if (!res.ok) {
                console.error('Cloudinary upload failed:', await res.text());
                continue;
              }
              cloudRes = await res.json();
              console.log('Cloudinary upload success:', cloudRes.secure_url);
            } catch (e) {
              console.error('Cloudinary upload error:', e);
              continue;
            }

            const { data: imgRow, error: imgErr } = await supabase
              .from('listing_images')
              .insert({
                file_url: cloudRes.secure_url,
                file_name: cloudRes.original_filename || file.name,
                public_id: cloudRes.public_id,
                file_type: file.type || 'image/jpeg',
              })
              .select('id')
              .single();
            if (imgErr || !imgRow) {
              console.error('listing_images insert error:', imgErr);
              continue;
            }

            imageInserts.push({
              listing_id: listingId,
              listing_image_id: imgRow.id,
              sort_order: (existingCount ?? 0) + i,
            });
          }

          if (imageInserts.length > 0) {
            await supabase.from('listing_listing_images').insert(imageInserts);
          }
        }

        // Fetch updated listing to return
        const { data: updated, error: fetchErr } = await supabase
          .from('listings')
          .select(LISTING_SELECT)
          .eq('id', listingId)
          .single();
        if (fetchErr) return { error: { status: 'CUSTOM_ERROR', error: fetchErr.message } };
        return { data: mapListing(updated) };
      },
      invalidatesTags: (_result, _error, payload) =>
        payload?.id
          ? [{ type: 'Listing', id: payload.id }, { type: 'Listing', id: 'LIST' }, { type: 'Listing', id: 'USER_LISTINGS' }]
          : [{ type: 'Listing', id: 'LIST' }, { type: 'Listing', id: 'USER_LISTINGS' }],
    }),

    deleteListing: builder.mutation<void, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('listings').delete().eq('id', id);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Listing', id },
        { type: 'Listing', id: 'LIST' },
        { type: 'Listing', id: 'USER_LISTINGS' },
      ],
    }),

    deleteListingImage: builder.mutation<void, { listingId: string; imageId: string }>({
      queryFn: async ({ listingId, imageId }) => {
        const { error } = await supabase
          .from('listing_listing_images')
          .delete()
          .eq('listing_id', listingId)
          .eq('listing_image_id', imageId);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, { listingId }) => [{ type: 'Listing', id: listingId }],
    }),

    getUncompletedListings: builder.query<PropertyListing[], void>({
      queryFn: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { data: [] };
        const { data, error } = await supabase
          .from('listings')
          .select(LISTING_SELECT)
          .eq('user_id', user.id)
          .eq('status', 'pending');
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: (data ?? []).map(mapListing) };
      },
      providesTags: [{ type: 'Listing', id: 'UNCOMPLETED' }],
    }),

    getListingUnavailableDates: builder.query<{ unavailableDates: { date: string; reason: string }[] }, string>({
      queryFn: async (listingId) => {
        const { data, error } = await supabase
          .from('bookings')
          .select('start_date, end_date, status')
          .eq('listing_id', listingId)
          .in('status', ['Confirmed', 'Completed']);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };

        const dates: { date: string; reason: 'booking' | 'cleanup' }[] = [];
        (data ?? []).forEach((b) => {
          const start = new Date(b.start_date);
          const end = new Date(b.end_date);
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push({ date: d.toISOString().split('T')[0], reason: 'booking' });
          }
        });
        return { data: { unavailableDates: dates } };
      },
      providesTags: (_result, _error, listingId) => [
        { type: 'Listing', id: `${listingId}-unavailable-dates` },
      ],
    }),
  }),
});

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
