import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// Define the review interface
export interface Review {
  _id: string;
  name?: string; // Optional, may come from populated userId
  email?: string; // Optional, may come from populated userId
  review: string;
  listing: string;
  rating: number;
  userId?: string | { _id: string; fullName: string; email: string }; // Can be ID or populated object
  createdAt?: string;
  updatedAt?: string;
}

// Request body for creating a review
export interface CreateReviewRequest {
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
      invalidatesTags: (_result, _error, { reviewId, listingId }) => {
        // Invalidate both the specific review and the list query
        const tags = [
          { type: 'Review' as const, id: reviewId },
          { type: 'Review' as const, id: `LIST_${listingId}` },
        ];
        return tags;
      },
    }),
  }),
});

// Export hooks for use in components
export const {
  useCreateReviewMutation,
  useGetReviewsByListingIdQuery,
  useDeleteReviewMutation,
} = reviewApi;
