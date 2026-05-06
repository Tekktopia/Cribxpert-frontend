import { selectCurrentUser } from '@/features/auth/authSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAlert from '@/hooks/useAlert';

interface LeaveReviewFormProps {
  onSubmit?: (review: {
    rating: number;
    review: string;
  }) => Promise<void> | void;
  isSubmitting?: boolean;
}

const LeaveReviewForm: React.FC<LeaveReviewFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const showAlert = useAlert();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      showAlert({
        title: 'Please log in to leave a review',
        icon: 'error',
      });
      return;
    }
    
    if (rating === 0) {
      showAlert({
        title: 'Please select a rating',
        icon: 'error',
      });
      return;
    }

    if (!review.trim()) {
      showAlert({
        title: 'Please write a review',
        icon: 'error',
      });
      return;
    }

    try {
      await onSubmit?.({
        rating,
        review,
      });
      // Reset form after successful submission
      setRating(0);
      setReview('');
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  // If user is not logged in, show login prompt
  if (!currentUser) {
    return (
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white border border-[#E6E6E6] rounded-lg shadow-sm">
        <h3 className="text-base sm:text-lg font-medium text-[#040404] mb-4 sm:mb-6">
          Leave a Review
        </h3>
        <div className="text-center py-6 sm:py-8">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#006073] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h4 className="text-base sm:text-lg font-medium text-[#040404] mb-2">
            Please log in to leave a review
          </h4>
          <p className="text-sm text-[#6F6F6F] mb-6">
            You need to be logged in to share your experience with this property.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto bg-[#006073] text-white py-3 px-6 rounded-md hover:bg-[#004d5a] transition-colors font-medium"
          >
            Log In to Leave a Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-8 bg-neutral-50/50 border border-neutral-100">
      <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 mb-8 border-b border-neutral-100 pb-4">
        Leave a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Rating Section */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-4">
            Add Your Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`w-6 h-6 ${
                    star <= rating
                      ? 'text-primary fill-current'
                      : 'text-neutral-200'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Review Text Area */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-3">
            Your Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
            className="w-full px-4 py-4 bg-white border border-neutral-100 text-[13px] tracking-wide focus:ring-1 focus:ring-primary/20 outline-none resize-none transition-all"
            placeholder="Share your experience here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || !review.trim()}
          className="w-full bg-primary text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:bg-neutral-200 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Post Your Review'}
        </button>
      </form>
    </div>
  );
};

export default LeaveReviewForm;
