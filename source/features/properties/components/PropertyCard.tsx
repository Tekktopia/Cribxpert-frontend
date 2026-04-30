import { PropertyListingCardProps } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from 'react-icons/fa';
import { HiOutlineCamera } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import React, { useCallback, useState } from 'react';
import OptimizedImage from '@/shared/components/OptimizedImage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites/favouritesService';
import { selectIsItemFavourited } from '@/features/favourites/favouritesSlice';

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  id,
  name,
  price,
  rating,
  description,
  location,
  image,
  images = [],
  bedrooms = 3, // Default value if not provided
  propertyType = 'Apartment', // Default value if not provided
  minWidth = 'min-w-[350px]',
  createdAt,
  cleaningFee = 0,
}) => {
  // Format the createdAt date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return 'Today';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } catch {
      return '';
    }
  };
  const navigate = useNavigate();
  // Use the provided image as fallback if no images array is provided
  const allImages = React.useMemo(
    () => (images.length > 0 ? images : [image]),
    [images, image]
  );

  // State for carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Redux setup for favourites
  const { user } = useSelector((state: RootState) => state.auth);
  const isSavedProperty = useSelector(selectIsItemFavourited(id));

  // API mutations
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const handleIconToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // If user is not logged in, you might want to redirect to login
      if (!user?.id) {
        // Handle unauthenticated user - maybe show a login prompt
        console.warn('User must be logged in to save favourites');
        navigate('/login');
        return;
      }

      // Only allow if online
      if (!navigator.onLine) {
        alert('Unable to add favorites, restore your connection.');
        return;
      }

      try {
        if (isSavedProperty) {
          // Remove from favourites
          await removeFavourite({ userId: user.id, listingId: id });
        } else {
          // Add to favourites
          await addFavourite({ userId: user.id, listingId: id });
        }
      } catch (error) {
        console.error('Failed to update favourite:', error);
        // You might want to show a toast notification here
      }
    },
    [id, isSavedProperty, user, addFavourite, removeFavourite, navigate]
  );

  const nextImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    },
    [allImages.length]
  );

  const prevImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
    },
    [allImages.length]
  );
  // Helper function to convert property name to URL slug
  const createSlug = (name: string): string => {
    if (!name) return 'property';
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };

  const propertySlug = React.useMemo(() => createSlug(name), [name]);

  return (
    <Link to={`/propertydetail/${propertySlug}`} className="block w-full h-full">
      <div
        className={`w-full h-full ${minWidth} hover:cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 max-w-full flex flex-col`}
      >
        {/* Image Carousel - compact aspect and max height so images don't dominate the card */}
        <div className="relative overflow-hidden">
          <div className="relative aspect-[16/10] w-full max-h-[220px] sm:max-h-[260px] bg-gray-100">
            {/* Current Image */}
            <OptimizedImage
              src={allImages[currentImageIndex]}
              alt={name}
              width={350}
              height={220}
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              priority={currentImageIndex === 0} // First image is priority
              className="w-full h-full object-cover rounded-t-lg transition-opacity duration-300"
            />
            {/* Navigation Arrows - Only show when more than one image */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={12} className="sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <FaChevronRight size={12} className="sm:w-3.5 sm:h-3.5 text-white" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex space-x-1 sm:space-x-1.5">
                  {allImages.length <= 5 ? (
                    // Show all dots when few images
                    allImages.map((_, index) => (
                      <span
                        key={index}
                        className={`block h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full transition-all ${index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/50'
                          }`}
                      />
                    ))
                  ) : (
                    // Show limited indicators when many images
                    <>
                      {[0, 1, 2].map((index) => (
                        <span
                          key={index}
                          className={`block h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full transition-all ${currentImageIndex === index
                            ? 'bg-white'
                            : 'bg-white/50'
                            }`}
                        />
                      ))}
                      {currentImageIndex > 2 &&
                        currentImageIndex < allImages.length - 1 && (
                          <span className="text-[10px] sm:text-xs text-white">...</span>
                        )}
                      {currentImageIndex >= 3 && (
                        <span className="block h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-white" />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Heart Icon - Save/Unsave */}
          <div className="absolute top-3 right-3 z-20">
            {isSavedProperty ? (
              <FaHeart
                className="w-6 h-6 text-[#1D5C5C]"
                onClick={handleIconToggle}
              />
            ) : (
              <CiHeart
                className="w-6 h-6 text-white drop-shadow-md"
                onClick={handleIconToggle}
              />
            )}
          </div>

          {/* Photo Count Badge */}
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1.5 sm:gap-2">
            <span className="bg-white text-black text-xs py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-md font-medium">
              +{allImages.length - 1}
            </span>
            <span className="bg-white p-0.5 sm:p-1 rounded-md">
              <HiOutlineCamera className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </div>
        </div>

        {/* Content Section - min-w-0 so content can shrink and not overflow card */}
        <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0">
          {/* Property Name */}
          <div className="mb-2 sm:mb-3 min-w-0">
            <h3 className="font-medium text-base sm:text-lg leading-tight mb-1 truncate" title={name}>{name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{description}</p>
          </div>

          {/* Property Tags Row */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-3 min-w-0">
            {/* Property Type Tag */}
            {propertyType && (
              <span className="bg-[#1D5C5C] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {propertyType}
              </span>
            )}

            {/* Bedroom Tag */}
            <span className="bg-[#1D5C5C] text-white text-xs sm:text-xs px-2 py-1 rounded whitespace-nowrap">
              {bedrooms} Bedroom{bedrooms !== 1 ? 's' : ''}
            </span>

            {/* Rating - Only show if rating exists and is greater than 0 */}
            {rating && rating > 0 ? (
              <div className="flex items-center">
                <span className="bg-[#A58207] text-white text-xs px-1.5 sm:px-2 py-0.5 rounded gap-1 flex items-center">
                  <FaStar className="text-yellow-500 text-xs" />
                  <span className="text-xs">{rating}</span>
                </span>
              </div>
            ) : null}
          </div>

          {/* Location and Date Row - stay inside card, location truncates if needed */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2 min-w-0 overflow-hidden">
            {/* Location - shrinks and truncates so date stays visible */}
            <div className="flex items-center text-gray-600 min-w-0 flex-1 sm:flex-initial sm:min-w-0">
              <IoLocationOutline className="mr-1 text-sm sm:text-base flex-shrink-0" />
              <p className="text-xs sm:text-sm truncate" title={location}>{location}</p>
            </div>

            {/* Created Date - doesn't shrink so it stays readable */}
            {createdAt && (
              <div className="flex items-center text-gray-500 flex-shrink-0">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xs sm:text-sm whitespace-nowrap">{formatDate(createdAt)}</p>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto pt-2">
            <span className="text-[#1D5C5C] font-bold text-base sm:text-lg">
              ₦{(Number(price) + Number(cleaningFee)).toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">/night</span>
            <p className="text-gray-400 text-xs mt-0.5">Accommodation fee · excl. taxes & fees</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(PropertyListingCard);
