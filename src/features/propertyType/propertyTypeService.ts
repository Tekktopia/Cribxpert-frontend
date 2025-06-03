import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// Define the property type interface
export interface PropertyType {
  _id: string;
  name: string;
  icon: {
    fileUrl: string;
  };
}

// Request body for creating a property type
export interface CreatePropertyTypeRequest {
  name: string;
  icon: File;
}

// Create the property type API service
export const propertyTypeApi = createApi({
  reducerPath: 'propertyTypeApi',
  baseQuery,
  tagTypes: ['PropertyType'],
  endpoints: (builder) => ({
    // GET /property-types - Get all property types
    getPropertyTypes: builder.query<PropertyType[], void>({
      query: () => '/property-types',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'PropertyType' as const,
                id: _id,
              })),
              { type: 'PropertyType', id: 'LIST' },
            ]
          : [{ type: 'PropertyType', id: 'LIST' }],
    }),

    // GET /property-types/{id} - Get a specific property type
    getPropertyTypeById: builder.query<PropertyType, string>({
      query: (id) => `/property-types/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'PropertyType', id }],
    }),

    // POST /property-types - Create a new property type
    createPropertyType: builder.mutation<
      PropertyType,
      CreatePropertyTypeRequest
    >({
      query: (propertyType) => ({
        url: '/property-types',
        method: 'POST',
        body: propertyType,
      }),
      invalidatesTags: [{ type: 'PropertyType', id: 'LIST' }],
    }),

    // PUT /property-types/{id} - Update a property type
    updatePropertyType: builder.mutation<
      PropertyType,
      Partial<PropertyType> & { _id: string }
    >({
      query: ({ _id, ...data }) => ({
        url: `/property-types/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'PropertyType', id: _id },
        { type: 'PropertyType', id: 'LIST' },
      ],
    }),

    // DELETE /property-types/{id} - Delete a property type
    deletePropertyType: builder.mutation<void, string>({
      query: (id) => ({
        url: `/property-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'PropertyType', id },
        { type: 'PropertyType', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetPropertyTypesQuery,
  useGetPropertyTypeByIdQuery,
  useCreatePropertyTypeMutation,
  useUpdatePropertyTypeMutation,
  useDeletePropertyTypeMutation,
} = propertyTypeApi;
