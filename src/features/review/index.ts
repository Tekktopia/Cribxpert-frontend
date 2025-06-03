// Import and re-export from reviewService.ts
import {
  reviewApi,
  useCreateReviewMutation,
  useGetReviewsByListingIdQuery,
  useDeleteReviewMutation,
  type Review,
  type CreateReviewRequest,
} from './reviewService';

// Import and re-export from reviewSlice.ts
import reviewReducer, {
  // Actions
  updateCurrentReview,
  clearCurrentReview,
  setReviewError,

  // Selectors
  selectReviews,
  selectCurrentReview,
  selectAverageRating,
  selectReviewLoading,
  selectReviewSubmitting,
  selectReviewError,
} from './reviewSlice';

// Export the API for store configuration
export { reviewApi };

// Export the reducer as default
export default reviewReducer;

// Export hooks for component usage
export {
  useCreateReviewMutation,
  useGetReviewsByListingIdQuery,
  useDeleteReviewMutation,
};

// Export actions
export { updateCurrentReview, clearCurrentReview, setReviewError };

// Export selectors
export {
  selectReviews,
  selectCurrentReview,
  selectAverageRating,
  selectReviewLoading,
  selectReviewSubmitting,
  selectReviewError,
};

// Export types
export type { Review, CreateReviewRequest };
