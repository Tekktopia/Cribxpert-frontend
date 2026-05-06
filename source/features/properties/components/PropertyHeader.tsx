import {
  selectIsItemFavourited,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites';
import { ShareIcon } from '@heroicons/react/24/solid';
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

  const userId = currentUser?.id;
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
    <div className="py-12 border-t border-neutral-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
             <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-neutral-900">
              {propertyName}
            </h2>
            <div className="h-[1px] w-12 bg-neutral-200"></div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
              {displayRating > 0 ? (
                <>
                  {displayRating} / 5.0 Rating
                </>
              ) : (
                'New Listing'
              )}
            </p>
          </div>

          <p className="text-neutral-500 text-xs flex items-center gap-2 uppercase tracking-widest">
            Managed by{' '}
            <button
              onClick={() => setIsHostDrawerOpen(true)}
              className="text-neutral-900 font-bold hover:text-primary transition-colors border-b border-neutral-200"
            >
              {hostName}
            </button>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className={`premium-transition px-8 py-3 rounded-full border-2 text-[10px] uppercase tracking-[0.2em] font-bold ${
              isAuthenticated && isFavourited
                ? 'bg-primary border-primary text-white'
                : 'bg-transparent border-neutral-100 text-neutral-400 hover:border-primary hover:text-primary'
            }`}
            onClick={onSave}
          >
            {isAuthenticated && isFavourited ? 'Favourited' : 'Add to Collection'}
          </button>
          
          <button
            onClick={onShareClick}
            className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ShareIcon className="w-4 h-4 text-neutral-900" />
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
