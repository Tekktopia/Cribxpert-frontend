import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';

export interface Amenity {
  _id: string;
  name: string;
  icon?: {
    _id?: string;
    fileUrl: string;
    fileType: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const amenitiesApi = createApi({
  reducerPath: 'amenitiesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Amenity'],
  keepUnusedDataFor: 3600,
  refetchOnMountOrArgChange: 1800,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getAmenities: builder.query<Amenity[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('amenities')
          .select('*, icon:amenity_icons(id, file_url, file_type)')
          .order('name');
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: (data ?? []).map((a) => ({
            _id: a.id,
            name: a.name,
            icon: a.icon
              ? { _id: a.icon.id, fileUrl: a.icon.file_url, fileType: a.icon.file_type }
              : undefined,
            createdAt: a.created_at,
            updatedAt: a.updated_at,
          })),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Amenity' as const, id: _id })),
              { type: 'Amenity', id: 'LIST' },
            ]
          : [{ type: 'Amenity', id: 'LIST' }],
    }),

    createAmenity: builder.mutation<Amenity, Partial<Amenity>>({
      queryFn: async (amenity) => {
        if (!amenity.name) return { error: { status: 'CUSTOM_ERROR', error: 'Name is required' } };
        const { data, error } = await supabase
          .from('amenities')
          .insert({ name: amenity.name })
          .select('*, icon:amenity_icons(id, file_url, file_type)')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: {
            _id: data.id,
            name: data.name,
            icon: data.icon
              ? { _id: data.icon.id, fileUrl: data.icon.file_url, fileType: data.icon.file_type }
              : undefined,
          },
        };
      },
      invalidatesTags: [{ type: 'Amenity', id: 'LIST' }],
    }),

    deleteAmenity: builder.mutation<void, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('amenities').delete().eq('id', id);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Amenity', id },
        { type: 'Amenity', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAmenitiesQuery,
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
} = amenitiesApi;
