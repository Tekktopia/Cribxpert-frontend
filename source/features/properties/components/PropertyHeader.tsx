import {
  selectIsItemFavourited,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites';
import { ShareIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/properties/listingSlice';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import useAlert from '@/hooks/useAlert';
import { useGetReviewsByListingIdQuery } from '@/features/review/reviewService';
// Add these imports at the top
import { useState } from 'react';
import HostProfileDrawer from '@/features/properties/components/HostProfileDrawer';

const PropertyHeader: React.FC = () => {
  // Get current listing from the store
  const currentListing = useSelector(selectCurrentListing);
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const alert = useAlert();

  const [isHostDrawerOpen, setIsHostDrawerOpen] = useState(false);

  console.log('Detail cleaningFee:', currentListing?.cleaningFee);

  // Prepare fallback/default values for destructuring
  const {
    _id: propertyId = '',
    name: propertyName = '',
    userId: listingOwner,
  } = currentListing || {};

  const userId = currentUser?._id;
  const listingId = propertyId;

  const hostName = listingOwner
    ? typeof listingOwner === 'object' && 'fullName' in listingOwner
      ? (listingOwner as { fullName?: string }).fullName || 'Host'
      : 'Host'
    : 'Host';

  // Fetch reviews for this listing
  const { data: apiReviews } = useGetReviewsByListingIdQuery(
    listingId || '',
    {
      skip: !listingId,
      // Ensure the query refetches when tags are invalidated
      refetchOnMountOrArgChange: true,
    }
  );

  // Calculate rating and total reviews from API data
  const ratingData = useMemo(() => {
    if (!apiReviews?.reviews || apiReviews.reviews.length === 0) {
      return {
        rating: 0,
        totalRatings: 0,
      };
    }

    const reviews = apiReviews.reviews;
    const totalRatings = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = parseFloat((sum / totalRatings).toFixed(1));

    return {
      rating: averageRating,
      totalRatings,
    };
  }, [apiReviews]);

  // Only use calculated rating from reviews, don't fallback to listing rating
  // This ensures we only show ratings when there are actual reviews
  const displayRating = ratingData.rating > 0 && ratingData.totalRatings > 0 ? ratingData.rating : 0;
  const totalRatings = ratingData.totalRatings;



  // Check if this property is already favourited
  const isFavourited = useSelector(selectIsItemFavourited(listingId));

  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  // If no listing, render nothing or a fallback
  if (!currentListing) return null;

  const onShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert({
      icon: 'success',
      title: 'Link copied',
      text: 'Link copied to clipboard!',
    });
  };

  const onSave = async () => {
    // Check if user is authenticated
    if (!isAuthenticated || !userId) {
      alert({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to save properties to your favorites.',
      });
      navigate('/login');
      return;
    }

    // Only allow if online
    if (!navigator.onLine) {
      alert({
        icon: 'error',
        title: 'Offline',
        text: 'Unable to add favorites, restore your connection.',
      });
      return;
    }

    try {
      if (isFavourited) {
        // Remove from favourites
        await removeFavourite({ listingId, userId }).unwrap();
        alert({
          icon: 'success',
          title: 'Removed',
          text: 'Property removed from saved!',
        });
      } else {
        // Add to favourites
        await addFavourite({ listingId, userId }).unwrap();
        alert({
          icon: 'success',
          title: 'Saved',
          text: 'Property saved!',
        });
      }
    } catch (error) {
      alert({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update favorites. Please try again.',
      });
      console.error('Favorites operation failed:', error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 m-3 sm:m-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <div className="flex flex-col gap-y-2 w-full md:w-auto">
          <h1 className="font-[400] text-xl sm:text-2xl md:text-[25px] text-[#040404] line-clamp-2">
            {propertyName}
          </h1>
          <p className="font-[400] text-sm sm:text-[14px] text-[#040404]">
            {displayRating > 0 ? (
              <>
                ⭐{displayRating}{' '}
                {totalRatings > 0 && (
                  <span className="text-[#6f6f6f] font-[400] text-sm sm:text-[16px]">
                    [{totalRatings} verified {totalRatings === 1 ? 'feedback' : 'feedbacks'}]
                  </span>
                )}
              </>
            ) : (
              <span className="text-[#6f6f6f] font-[400] text-sm sm:text-[16px]">
                No ratings yet
              </span>
            )}
          </p>

          <p className="text-[#6f6f6f] text-sm sm:text-[14px] flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#1D5C5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Hosted by{' '}
            <button
              onClick={() => setIsHostDrawerOpen(true)}
              className="text-[#1D5C5C] font-medium ml-1 underline hover:text-[#006073] transition-colors"
            >
              {hostName}
            </button>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3 md:mt-0 w-full md:w-auto justify-start md:justify-center">
          <button
            className={`rounded-[200px] px-4 sm:px-6 py-2 sm:py-3 transition-colors ${isAuthenticated
              ? 'bg-[#e6e6e6] hover:bg-[#d9d9d9]'
              : 'bg-[#f0f0f0] cursor-pointer opacity-75 hover:opacity-100'
              }`}
            onClick={onSave}
            title={!isAuthenticated ? 'Login to save properties' : undefined}
          >
            <div className="flex items-center gap-2">
              <HeartIcon
                fill={isAuthenticated && isFavourited ? '#006073' : 'none'}
                className={`w-4 h-4 sm:w-[20px] sm:h-[20px] ${isAuthenticated ? 'text-[#070707]' : 'text-[#999999]'
                  }`}
              />
              <p
                className={`font-[400] text-xs sm:text-[14px] text-center ${isAuthenticated ? 'text-[#070707]' : 'text-[#999999]'
                  }`}
              >
                {isAuthenticated ? (isFavourited ? 'Unsave' : 'Save') : 'Save'}
              </p>
            </div>
          </button>
          <button
            onClick={onShareClick}
            className="rounded-[200px] px-4 sm:px-6 py-2 sm:py-3 bg-[#e6e6e6] hover:bg-[#d9d9d9] transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShareIcon className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#070707]" />
              <p className="text-[#070707] font-[400] text-xs sm:text-[14px]">
                Share
              </p>
            </div>
          </button>
        </div>
      </div>
      <HostProfileDrawer
        isOpen={isHostDrawerOpen}
        onClose={() => setIsHostDrawerOpen(false)}
        hostName={hostName}
        hostEmail={
          listingOwner && typeof listingOwner === 'object' && 'email' in listingOwner
            ? (listingOwner as { email?: string }).email
            : undefined
        }
        hostAvatar={
          listingOwner && typeof listingOwner === 'object' && 'profileImage' in listingOwner
            ? (listingOwner as { profileImage?: string }).profileImage
            : undefined
        }
      />
    </div>
  );
};

export default PropertyHeader;
