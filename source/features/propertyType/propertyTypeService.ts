import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';

export interface PropertyType {
  _id: string;
  name: string;
  icon: {
    fileUrl: string;
  };
}

export const propertyTypeApi = createApi({
  reducerPath: 'propertyTypeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['PropertyType'],
  keepUnusedDataFor: 3600,
  refetchOnMountOrArgChange: 1800,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getPropertyTypes: builder.query<{ data: PropertyType[] }, void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('property_types')
          .select('*, icon:property_type_icons(file_url, file_type)')
          .order('name');
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: {
            data: (data ?? []).map((pt) => ({
              _id: pt.id,
              name: pt.name,
              icon: { fileUrl: pt.icon?.file_url ?? '' },
            })),
          },
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'PropertyType' as const, id: _id })),
              { type: 'PropertyType', id: 'LIST' },
            ]
          : [{ type: 'PropertyType', id: 'LIST' }],
    }),

    getPropertyTypeById: builder.query<PropertyType, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from('property_types')
          .select('*, icon:property_type_icons(file_url)')
          .eq('id', id)
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: { _id: data.id, name: data.name, icon: { fileUrl: data.icon?.file_url ?? '' } },
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'PropertyType', id }],
    }),

    createPropertyType: builder.mutation<PropertyType, { name: string }>({
      queryFn: async ({ name }) => {
        const { data, error } = await supabase
          .from('property_types')
          .insert({ name })
          .select('*, icon:property_type_icons(file_url)')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: { _id: data.id, name: data.name, icon: { fileUrl: data.icon?.file_url ?? '' } },
        };
      },
      invalidatesTags: [{ type: 'PropertyType', id: 'LIST' }],
    }),

    updatePropertyType: builder.mutation<PropertyType, Partial<PropertyType> & { _id: string }>({
      queryFn: async ({ _id, name }) => {
        const { data, error } = await supabase
          .from('property_types')
          .update({ name })
          .eq('id', _id)
          .select('*, icon:property_type_icons(file_url)')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: { _id: data.id, name: data.name, icon: { fileUrl: data.icon?.file_url ?? '' } },
        };
      },
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'PropertyType', id: _id },
        { type: 'PropertyType', id: 'LIST' },
      ],
    }),

    deletePropertyType: builder.mutation<void, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('property_types').delete().eq('id', id);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'PropertyType', id },
        { type: 'PropertyType', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetPropertyTypesQuery,
  useGetPropertyTypeByIdQuery,
  useCreatePropertyTypeMutation,
  useUpdatePropertyTypeMutation,
  useDeletePropertyTypeMutation,
} = propertyTypeApi;
