import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review, reviewApi } from './reviewService';

// Define the state structure
interface ReviewState {
  // Reviews for the current listing being viewed
  reviews: Review[];

  // Current review being edited/created
  currentReview: Partial<Review> | null;

  // Average rating for the current listing
  averageRating: number | null;

  // UI states
  isLoading: boolean;
  isSubmitting: boolean;

  // Error messages
  error: string | null;
}

// Initial state
const initialState: ReviewState = {
  reviews: [],
  currentReview: null,
  averageRating: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
};

// Helper function to calculate average rating
const calculateAverageRating = (reviews: Review[]): number => {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

// Create the slice
export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // Update the current review being created/edited
    updateCurrentReview: (state, action: PayloadAction<Partial<Review>>) => {
      state.currentReview = {
        ...state.currentReview,
        ...action.payload,
      };
    },

    // Clear the current review
    clearCurrentReview: (state) => {
      state.currentReview = null;
    },

    // Set error message
    setReviewError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getReviewsByListingId query
      .addMatcher(
        reviewApi.endpoints.getReviewsByListingId.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        reviewApi.endpoints.getReviewsByListingId.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.reviews = payload;
          state.averageRating = calculateAverageRating(payload);
          state.error = null;
        }
      )
      .addMatcher(
        reviewApi.endpoints.getReviewsByListingId.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Failed to fetch reviews';
        }
      )

      // Handle createReview mutation
      .addMatcher(reviewApi.endpoints.createReview.matchPending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addMatcher(reviewApi.endpoints.createReview.matchFulfilled, (state) => {
        state.isSubmitting = false;
        state.currentReview = null;
        state.error = null;
      })
      .addMatcher(
        reviewApi.endpoints.createReview.matchRejected,
        (state, { error }) => {
          state.isSubmitting = false;
          state.error = error.message || 'Failed to submit review';
        }
      )

      // Handle deleteReview mutation
      .addMatcher(reviewApi.endpoints.deleteReview.matchPending, (state) => {
        state.error = null;
      })
      .addMatcher(
        reviewApi.endpoints.deleteReview.matchRejected,
        (state, { error }) => {
          state.error = error.message || 'Failed to delete review';
        }
      );
  },
});

// Export actions
export const { updateCurrentReview, clearCurrentReview, setReviewError } =
  reviewSlice.actions;

// Export selectors
export const selectReviews = (state: { review: ReviewState }) =>
  state.review.reviews;

export const selectCurrentReview = (state: { review: ReviewState }) =>
  state.review.currentReview;

export const selectAverageRating = (state: { review: ReviewState }) =>
  state.review.averageRating;

export const selectReviewLoading = (state: { review: ReviewState }) =>
  state.review.isLoading;

export const selectReviewSubmitting = (state: { review: ReviewState }) =>
  state.review.isSubmitting;

export const selectReviewError = (state: { review: ReviewState }) =>
  state.review.error;

// Export reducer
export default reviewSlice.reducer;
