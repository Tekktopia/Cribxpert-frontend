import {
  selectIsItemFavourited,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites';
import {
  addOfflineFavourite,
  removeOfflineFavourite,
} from '@/features/favourites/favouritesSlice';
import { useFavouritesOfflineSync } from '@/features/favourites/useOfflineSync';
import { ShareIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from 'lucide-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentListing } from '@/features/listing/listingSlice';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import useAlert from '@/hooks/useAlert';
import { RootState } from '@/store/store';

const PropertyHeader: React.FC = () => {
  // Initialize offline sync for favorites (handles synchronization when coming back online)
  useFavouritesOfflineSync();

  // Get current listing from the store
  const currentListing = useSelector(selectCurrentListing);
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isOnline } = useSelector((state: RootState) => state.favourites);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  // Prepare fallback/default values for destructuring
  const {
    _id: propertyId = '',
    name: propertyName = '',
    description = '',
    rating = 0,
    // totalRatings = 115,
  } = currentListing || {};

  const userId = currentUser?._id;
  const listingId = propertyId;

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
      // Optionally redirect to login page
      navigate('/login');
      return;
    }

    try {
      if (isFavourited) {
        // Remove from favourites
        if (isOnline) {
          await removeFavourite({ listingId, userId }).unwrap();
        } else {
          // Handle offline removal
          dispatch(removeOfflineFavourite(listingId));
        }
        alert({
          icon: 'success',
          title: 'Removed',
          text: isOnline
            ? 'Property removed from saved!'
            : 'Property removed from saved! Changes will sync when you reconnect.',
        });
      } else {
        // Add to favourites
        if (isOnline) {
          await addFavourite({ listingId, userId }).unwrap();
        } else {
          // Handle offline addition
          dispatch(addOfflineFavourite(listingId));
        }
        alert({
          icon: 'success',
          title: 'Saved',
          text: isOnline
            ? 'Property saved!'
            : 'Property saved! Changes will sync when you reconnect.',
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
            {propertyName} - {description}
          </h1>
          <p className="font-[400] text-sm sm:text-[14px] text-[#040404]">
            ⭐{rating}{' '}
            <span className="text-[#6f6f6f] font-[400] text-sm sm:text-[16px]">
              [{'90'} verified positive feedbacks]
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3 md:mt-0 w-full md:w-auto justify-start md:justify-center">
          <button
            className={`rounded-[200px] px-4 sm:px-6 py-2 sm:py-3 transition-colors ${
              isAuthenticated
                ? 'bg-[#e6e6e6] hover:bg-[#d9d9d9]'
                : 'bg-[#f0f0f0] cursor-pointer opacity-75 hover:opacity-100'
            }`}
            onClick={onSave}
            title={
              !isAuthenticated
                ? 'Login to save properties'
                : !isOnline
                  ? 'Offline - changes will sync when you reconnect'
                  : undefined
            }
          >
            <div className="flex items-center gap-2">
              <HeartIcon
                fill={isAuthenticated && isFavourited ? '#e63946' : 'none'}
                className={`w-4 h-4 sm:w-[20px] sm:h-[20px] ${
                  isAuthenticated ? 'text-[#070707]' : 'text-[#999999]'
                }`}
              />
              <p
                className={`font-[400] text-xs sm:text-[14px] text-center ${
                  isAuthenticated ? 'text-[#070707]' : 'text-[#999999]'
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
    </div>
  );
};

export default PropertyHeader;
