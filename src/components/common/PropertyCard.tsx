import { PropertyListingCardProps } from '@/types';
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from 'react-icons/fa';
import { HiOutlineCamera } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import React, { useCallback, useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from '@/features/favourites/favouritesService';
import {
  addOfflineFavourite,
  removeOfflineFavourite,
  selectIsItemFavourited,
} from '@/features/favourites/favouritesSlice';

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
}) => {
  // Use the provided image as fallback if no images array is provided
  const allImages = React.useMemo(
    () => (images.length > 0 ? images : [image]),
    [images, image]
  );

  // State for carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Redux setup for favourites
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOnline } = useSelector((state: RootState) => state.favourites);
  const isSavedProperty = useSelector(selectIsItemFavourited(id));

  // API mutations
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const handleIconToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // If user is not logged in, you might want to redirect to login
      if (!user?._id) {
        // Handle unauthenticated user - maybe show a login prompt
        console.warn('User must be logged in to save favourites');
        return;
      }

      try {
        if (isSavedProperty) {
          // Remove from favourites
          if (isOnline) {
            await removeFavourite({ userId: user._id, listingId: id });
          } else {
            // Handle offline removal
            dispatch(removeOfflineFavourite(id));
          }
        } else {
          // Add to favourites
          if (isOnline) {
            await addFavourite({ userId: user._id, listingId: id });
          } else {
            // Handle offline addition
            dispatch(addOfflineFavourite(id));
          }
        }
      } catch (error) {
        console.error('Failed to update favourite:', error);
        // You might want to show a toast notification here
      }
    },
    [
      id,
      isSavedProperty,
      user,
      isOnline,
      addFavourite,
      removeFavourite,
      dispatch,
    ]
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
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };

  const propertySlug = React.useMemo(() => createSlug(name), [name]);

  return (
    <Link to={`/propertydetail/${propertySlug}`} className="block">
      <div
        className={`w-full ${minWidth} hover:cursor-pointer rounded-lg overflow-hidden shadow-sm`}
      >
        {/* Image Carousel */}
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/3] w-full bg-gray-100">
            {/* Current Image */}
            <OptimizedImage
              src={allImages[currentImageIndex]}
              alt={name}
              width={350}
              height={200}
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              priority={currentImageIndex === 0} // First image is priority
              className="w-full h-full object-cover rounded-t-lg transition-opacity duration-300"
              // onError={() => {
              //   // console.error(`Failed to load image for ${name}`);
              // }}
            />
            {/* Navigation Arrows - Only show when more than one image */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center"
                  aria-label="Next image"
                >
                  <FaChevronRight size={14} className="text-white" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-3 left-3 flex space-x-1">
                  {allImages.length <= 5 ? (
                    // Show all dots when few images
                    allImages.map((_, index) => (
                      <span
                        key={index}
                        className={`block h-1.5 w-1.5 rounded-full ${
                          index === currentImageIndex
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
                          className={`block h-1.5 w-1.5 rounded-full ${
                            currentImageIndex === index
                              ? 'bg-white'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                      {currentImageIndex > 2 &&
                        currentImageIndex < allImages.length - 1 && (
                          <span className="text-xs text-white">...</span>
                        )}
                      {currentImageIndex >= 3 && (
                        <span className="block h-1.5 w-1.5 rounded-full bg-white" />
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
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="bg-white text-black text-xs py-1 px-2 rounded-md">
              +{allImages.length - 1}
            </span>
            <span className="bg-white p-1 rounded-md">
              <HiOutlineCamera className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3">
          {/* Property Name */}
          <div className="mb-2">
            <h3 className="font-medium text-lg leading-tight">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          {/* Property Tags Row */}
          <div className="flex items-center gap-4 mb-2">
            {/* Bedroom Tag */}
            <span className="bg-[#1D5C5C] text-white text-xs px-2 py-1 rounded">
              {bedrooms} Bedroom {propertyType}
            </span>

            {/* Rating */}
            <div className="flex items-center">
              <span className="bg-[#A58207] text-white text-xs px-1 py-0.5 rounded  gap-1 flex">
                <FaStar className="text-yellow-500 text-xs" /> {rating}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center mb-2 text-gray-600">
            <IoLocationOutline className="mr-1" />
            <p className="text-sm">{location}</p>
          </div>

          {/* Price */}
          <div className="mt-2">
            <span className="text-[#1D5C5C] font-bold text-lg">
              ₦{Number(price).toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">/per night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(PropertyListingCard);
