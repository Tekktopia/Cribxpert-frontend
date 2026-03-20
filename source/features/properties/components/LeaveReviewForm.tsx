import { selectCurrentUser } from '@/features/auth/authSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useAlert from '@/hooks/useAlert';

interface LeaveReviewFormProps {
  onSubmit?: (review: {
    rating: number;
    name: string;
    email: string;
    review: string;
  }) => void;
  isSubmitting?: boolean;
}

const LeaveReviewForm: React.FC<LeaveReviewFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [review, setReview] = useState('');
  const showAlert = useAlert();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      showAlert({
        title: 'Please select a rating',
        icon: 'error',
      });
      return;
    }

    onSubmit?.({
      rating,
      name,
      email,
      review,
    });
  };

  return (
    <div className="mt-8 p-6 bg-white border border-[#E6E6E6] rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-[#040404] mb-6">
        Leave a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div>
          <label className="block text-sm font-medium text-[#040404] mb-3">
            Add Your Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 ${
                    star <= rating
                      ? 'text-[#006073] fill-current'
                      : 'text-[#E6E6E6]'
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

        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#040404] mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006073] focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#040404] mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006073] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Review Text Area */}
        <div>
          <label className="block text-sm font-medium text-[#040404] mb-2">
            Write a review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006073] focus:border-transparent resize-none"
            placeholder="enter your review here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-hoverColor transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Your Review'}
        </button>
      </form>
    </div>
  );
};

export default LeaveReviewForm;
