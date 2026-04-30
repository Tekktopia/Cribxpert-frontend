import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';

export interface Review {
  _id: string;
  name?: string;
  email?: string;
  review: string;
  listing: string;
  rating: number;
  userId?: string | { _id: string; fullName: string; email: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewRequest {
  review: string;
  listing: string;
  rating: number;
}

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Review'],
  keepUnusedDataFor: 120,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, CreateReviewRequest>({
      queryFn: async ({ review, listing, rating }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: { status: 'CUSTOM_ERROR', error: 'Not authenticated' } };
        const { data, error } = await supabase
          .from('reviews')
          .insert({ user_id: user.id, listing_id: listing, review, rating })
          .select('*, user:profiles!user_id(id, full_name, email)')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: {
            _id: data.id,
            review: data.review,
            listing: data.listing_id,
            rating: data.rating,
            userId: data.user
              ? { _id: data.user.id, fullName: data.user.full_name ?? '', email: data.user.email }
              : data.user_id,
            name: data.user?.full_name ?? undefined,
            email: data.user?.email ?? undefined,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          },
        };
      },
      invalidatesTags: (_result, _error, { listing }) => [
        { type: 'Review', id: `LIST_${listing}` },
      ],
    }),

    getReviewsByListingId: builder.query<{ reviews: Review[] }, string>({
      queryFn: async (listingId) => {
        const { data, error } = await supabase
          .from('reviews')
          .select('*, user:profiles!user_id(id, full_name, email)')
          .eq('listing_id', listingId)
          .order('created_at', { ascending: false });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        const reviews: Review[] = (data ?? []).map((r) => ({
          _id: r.id,
          review: r.review,
          listing: r.listing_id,
          rating: r.rating,
          userId: r.user
            ? { _id: r.user.id, fullName: r.user.full_name ?? '', email: r.user.email }
            : r.user_id,
          name: r.user?.full_name ?? undefined,
          email: r.user?.email ?? undefined,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }));
        return { data: { reviews } };
      },
      providesTags: (result, _error, listingId) =>
        result
          ? [
              ...result.reviews.map(({ _id }) => ({ type: 'Review' as const, id: _id })),
              { type: 'Review', id: `LIST_${listingId}` },
            ]
          : [{ type: 'Review', id: `LIST_${listingId}` }],
    }),

    deleteReview: builder.mutation<void, { reviewId: string; listingId: string }>({
      queryFn: async ({ reviewId }) => {
        const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, { reviewId, listingId }) => [
        { type: 'Review', id: reviewId },
        { type: 'Review', id: `LIST_${listingId}` },
      ],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsByListingIdQuery,
  useDeleteReviewMutation,
} = reviewApi;
