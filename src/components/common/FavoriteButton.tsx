import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites/favouritesService';
import { selectIsItemFavourited } from '@/features/favourites/favouritesSlice';
import { RootState } from '@/store/store';

interface FavouriteButtonProps {
  listingId: string;
  className?: string;
  showText?: boolean;
}

export const FavouriteButton = ({
  listingId,
  className = '',
  showText = false,
}: FavouriteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const isFavourited = useSelector(selectIsItemFavourited(listingId));

  // Get API mutation hooks
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const handleToggleFavourite = async () => {
    if (!user) {
      alert('Please login to save favourites');
      return;
    }
    if (!navigator.onLine) {
      alert('Unable to add favorites, restore your connection.');
      return;
    }
    try {
      setIsLoading(true);
      if (isFavourited) {
        await removeFavourite({ userId: user._id, listingId });
      } else {
        await addFavourite({ userId: user._id, listingId });
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      alert('Failed to update favourite status');
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
