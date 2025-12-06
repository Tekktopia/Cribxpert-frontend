import React from "react";
import { useGetReviewsByListingIdQuery } from "../reviewService";
import ReviewNotificationItem from "./ReviewNotificationItem";
import NoNotification from "../../notifications/components/NoNotification";

interface ReviewsTestProps {
  listingId: string;
}
console.log("ReviewsTest component rendered");

const ReviewsTest: React.FC<ReviewsTestProps> = ({ listingId }) => {
  // Fetch actual reviews for a listing
  const { data, isLoading, error } = useGetReviewsByListingIdQuery(listingId);
  console.log("Reviews API response:", data);

  // Utility: Calculate "days ago"
  const getDaysAgo = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-[#999] text-[14px] sm:text-[16px]">
          Loading reviews...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-red-500 text-[14px] sm:text-[16px]">
          Failed to load reviews
        </p>
      </div>
    );
  }

  const reviews = data?.reviews || [];

  if (reviews.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 my-9">
        <NoNotification message="No reviews found" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-6">
      {reviews.map((review) => (
        <ReviewNotificationItem
          key={review._id}
          username={review.name}
          description={review.review}
          daysAgo={getDaysAgo(review.createdAt || "")}
          buttonLabel="View Review"
          onViewListing={() =>
            console.log("View review clicked:", review._id)
          }
        />
      ))}
    </div>
  );
};

export default ReviewsTest;
