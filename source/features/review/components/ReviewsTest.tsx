import React from "react";
import { useGetReviewsByListingIdQuery } from "../reviewService";
import ReviewNotificationItem from "./ReviewNotificationItem";
import NoNotification from "../../notifications/components/NoNotification";

interface ReviewsTestProps {
  listingId?: string; // make optional to avoid crashes
}

const ReviewsTest: React.FC<ReviewsTestProps> = ({ listingId }) => {
  // If no listingId, skip the query
  const { data, isLoading, error } = useGetReviewsByListingIdQuery(listingId || "", {
    skip: !listingId,
  });

  console.log("ReviewsTest - listingId:", listingId);
  console.log("Reviews API response:", data);

  const reviews = Array.isArray(data) ? data : data?.reviews ?? [];

  const getDaysAgo = (createdAt: string) => {
    if (!createdAt) return "";
    const created = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-[#999] text-[14px] sm:text-[16px]">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center my-6 sm:my-9">
        <p className="text-red-500 text-[14px] sm:text-[16px]">Failed to load reviews</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <NoNotification />;
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
          onViewListing={() => console.log("View review clicked:", review._id)}
        />
      ))}
    </div>
  );
};

export default ReviewsTest;
