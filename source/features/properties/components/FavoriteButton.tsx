import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useGetFavouritesByUserIdQuery,
} from '@/features/favourites/favouritesService';
import { selectIsItemFavourited } from '@/features/favourites/favouritesSlice';
import { RootState } from '@/store/store';
import Title from '@/shared/components/ui/Title';

type TitleType = 'success' | 'error' | 'info' | 'warning';

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

  useGetFavouritesByUserIdQuery(user?._id ?? '', {
    skip: !user?._id,
  });
  
  const isFavourited = useSelector(selectIsItemFavourited(listingId));

  // Get API mutation hooks
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  // modal state for title comp
      const [modal, setModal] = useState<{
        isOpen: boolean;
        type: TitleType;
        title: string;
        message: string;
        primaryAction?: { label: string; onClick: () => void };
        secondaryAction?: { label: string; onClick: () => void };
      }>({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
      });
    
      // helper func to show modal
      const showModal = (
        type: TitleType,
        title: string,
        message: string,
        primaryAction?: { label: string; onClick: () => void },
        secondaryAction?: { label: string; onClick: () => void }
      ) => {
        setModal({
          isOpen: true,
          type,
          title,
          message,
          primaryAction,
          secondaryAction,
        });
      };
    
      // Helper function to close modal
      const closeModal = () => {
        setModal((prev) => ({ ...prev, isOpen: false }));
      };

  const handleToggleFavourite = async () => {
    if (!user) {
      showModal(
        'info',
        'Login Required',
        'Please log in to save favourites.',
        {
          label: 'Log In',
          onClick: () => {
            closeModal();
            // Navigate to login - requires useNavigate or window.location
            window.location.href = '/login';
          },
        },
        {
          label: 'Cancel',
          onClick: closeModal,
        }
      );
      return;
    }
    if (!navigator.onLine) {
      showModal(
        'warning',
        'No Connection',
        'Unable to update favourites. Please check your internet connection and try again.',
      );
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
      showModal(
        'error',
        'Update Failed',
        'Failed to update favourite status. Please try again.',
        {
          label: 'Try Again',
          onClick: closeModal,
        }
      );
    }
  };

  return (
    <>
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

    <Title
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryAction={modal.primaryAction}
        secondaryAction={modal.secondaryAction}
      />
    </>
  );
};

export default FavouriteButton;
