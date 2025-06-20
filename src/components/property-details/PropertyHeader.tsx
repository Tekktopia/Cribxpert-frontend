import {
  selectIsItemFavourited,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites';
import { ShareIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/listing/listingSlice';
import useAlert from '@/hooks/useAlert';

const PropertyHeader: React.FC = () => {
  // Get current listing from the store
  const currentListing = useSelector(selectCurrentListing);
  const alert = useAlert();

  // Prepare fallback/default values for destructuring
  const {
    _id: propertyId = '',
    name: propertyName = '',
    description = '',
    rating = 0,
    // totalRatings = 115,
  } = currentListing || {};

  const userId = 'currentUserId';
  const listingId = propertyId || 'defaultListingId';

  // Check if this property is already favourited
  const isFavourited = useSelector(selectIsItemFavourited(listingId));

  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  // If no listing, render nothing or a fallback
  if (!currentListing) return null;

  const onShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert({ icon: 'success', title: 'Link copied', text: 'Link copied to clipboard!' });
  };


  const onSave = () => {
    if (isFavourited) {
      removeFavourite({ listingId, userId });
      alert({ icon: 'success', title: 'Removed', text: 'Property removed from saved!' });
    } else {
      addFavourite({ listingId, userId });
      alert({ icon: 'success', title: 'Saved', text: 'Property saved!' });
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
              [{"90"} verified positive feedbacks]
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3 md:mt-0 w-full md:w-auto justify-start md:justify-center">
          <button
            className="rounded-[200px] px-4 sm:px-6 py-2 sm:py-3 bg-[#e6e6e6] hover:bg-[#d9d9d9] transition-colors"
            onClick={onSave}
          >
            <div className="flex items-center gap-2">
              <HeartIcon
                fill={isFavourited ? '#e63946' : 'none'}
                className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#070707]"
              />
              <p className="text-[#070707] font-[400] text-xs sm:text-[14px] text-center">
                {isFavourited ? 'Unsave' : 'Save'}
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