import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites/favouritesService';
import {
  selectIsItemFavourited,
  addOfflineFavourite,
  removeOfflineFavourite,
  setFavouriteError,
} from '@/features/favourites/favouritesSlice';
import { RootState } from '@/store/store';

interface FavouriteButtonProps {
  listingId: string;
  className?: string;
  showText?: boolean;
}

/**
 * A button component to toggle favourite status with offline support
 */
export const FavouriteButton = ({
  listingId,
  className = '',
  showText = false,
}: FavouriteButtonProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Get current user and online status
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOnline } = useSelector((state: RootState) => state.favourites);

  // Check if this item is already favourited
  const isFavourited = useSelector(selectIsItemFavourited(listingId));

  // Get API mutation hooks
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const handleToggleFavourite = async () => {
    // If no user is logged in, you might want to redirect to login
    if (!user) {
      // Optionally, redirect to login or show a message
      alert('Please login to save favourites');
      return;
    }

    // If we're offline, use offline state management
    if (!isOnline) {
      if (isFavourited) {
        dispatch(removeOfflineFavourite(listingId));
      } else {
        dispatch(addOfflineFavourite(listingId));
      }
      // Show feedback to the user that this will sync when online
      alert("You're offline. This will be synced when you're back online.");
      return;
    }

    // If we're online, make the API call
    try {
      setIsLoading(true);

      if (isFavourited) {
        await removeFavourite({
          userId: user.id,
          listingId,
        });
      } else {
        await addFavourite({
          userId: user.id,
          listingId,
        });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setFavouriteError('Failed to update favourite status'));
      console.error('Error toggling favourite:', error);
    }
  };

  return (
    <button
      onClick={handleToggleFavourite}
      disabled={isLoading}
      className={`favourite-button ${isFavourited ? 'is-favourite' : ''} ${className}`}
      aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
    >
      {isLoading ? (
        <span className="loading-icon">...</span>
      ) : (
        <>
          <img
            src={isFavourited ? '/icons/heart.png' : '/icons/heart-black.png'}
            alt={isFavourited ? 'Favourited' : 'Not favourited'}
            width={24}
            height={24}
          />
          {showText && (
            <span className="ml-2">{isFavourited ? 'Saved' : 'Save'}</span>
          )}
        </>
      )}
    </button>
  );
};

export default FavouriteButton;
