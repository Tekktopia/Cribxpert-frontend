import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// Types for amenity data
export interface Amenity {
  _id: string;
  name: string;
  icon?: string;
  category?: 'basic' | 'safety' | 'accessibility' | 'special';
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API service for amenities
export const amenitiesApi = createApi({
  reducerPath: 'amenitiesApi',
  baseQuery,
  tagTypes: ['Amenity'],
  endpoints: (builder) => ({
    // GET /amenities - Retrieve all amenities
    getAmenities: builder.query<Amenity[], void>({
      query: () => '/amenities',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Amenity' as const,
                id: _id,
              })),
              { type: 'Amenity', id: 'LIST' },
            ]
          : [{ type: 'Amenity', id: 'LIST' }],
    }),

    // POST /amenities - Create a new amenity
    createAmenity: builder.mutation<Amenity, Partial<Amenity>>({
      query: (amenity) => ({
        url: '/amenities',
        method: 'POST',
        body: amenity,
      }),
      invalidatesTags: [{ type: 'Amenity', id: 'LIST' }],
    }),

    // DELETE /amenities/{id} - Delete an amenity
    deleteAmenity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/amenities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Amenity', id },
        { type: 'Amenity', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetAmenitiesQuery,
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
} = amenitiesApi;
