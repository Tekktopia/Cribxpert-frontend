import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// Define the review interface
export interface Review {
  _id: string;
  name: string;
  email: string;
  review: string;
  listing: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

// Request body for creating a review
export interface CreateReviewRequest {
  name: string;
  email: string;
  review: string;
  listing: string;
  rating: number;
}

// Create the review API service
export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery,
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    // POST /reviews - Create a review for a listing
    createReview: builder.mutation<Review, CreateReviewRequest>({
      query: (reviewData) => ({
        url: '/reviews',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (_result, _error, { listing }) => [
        { type: 'Review', id: `LIST_${listing}` },
      ],
    }),

    // GET /reviews/listing/{listingId} - Get all reviews for a specific listing
    getReviewsByListingId: builder.query<{reviews: Review[]}, string>({
      query: (listingId) => `/reviews/listing/${listingId}`,
      providesTags: (result, _error, listingId) =>
        result
          ? [
              ...result.reviews.map(({ _id }) => ({
                type: 'Review' as const,
                id: _id,
              })),
              { type: 'Review', id: `LIST_${listingId}` },
            ]
          : [{ type: 'Review', id: `LIST_${listingId}` }],
    }),

    // DELETE /reviews/{reviewId} - Delete a review by ID
    deleteReview: builder.mutation<
      void,
      { reviewId: string; listingId: string }
    >({
      query: ({ reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { reviewId, listingId }) => [
        { type: 'Review', id: reviewId },
        { type: 'Review', id: `LIST_${listingId}` },
      ],
    }),
  }),
});

// Export hooks for use in components
export const {
  useCreateReviewMutation,
  useGetReviewsByListingIdQuery,
  useDeleteReviewMutation,
} = reviewApi;
