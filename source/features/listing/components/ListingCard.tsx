import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import star from '../../../assets/icons/star.png';
import { useDeleteListingMutation } from '@/features/listing/listingService';

interface ListingCardProps {
  id: string; // Added ID prop for API calls
  title: string;
  price: string;
  tags?: string[];
  image: string;
  category?: string;
  rating: number;
  className?: string;
  onDelete?: (id: string) => void; // Callback for parent component
  onEdit?: (id: string) => void; // Callback for editing
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  propertyType?: string;
  description?: string;
  location?: string;
  createdAt?: string;
  hideStatus?: boolean;
  status?: string; // Optional: 'pending' | 'flagged' when backend supports it
  onStatusChange?: () => void; // Callback when status changes
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  price,
  image,
  rating,
  className = '',
  onDelete,
  onEdit,
  bedrooms,
  bathrooms,
  guests,
  propertyType,
  description,
  location,
  createdAt,
  hideStatus = false,
  status: listingStatus,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // RTK Query mutation hooks
  const [deleteListing, { isLoading: isDeleting, error: deleteError }] = useDeleteListingMutation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      const modalContainer = document.querySelector('.modal-container');
      if (modalContainer && !modalContainer.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteListing(id).unwrap();
      
      // Success - close modal and notify parent
      setModalOpen(false);
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      // Error is automatically handled by RTK Query state
    }
  };

  const imageUrl = image;
  const validRating = isNaN(rating) || rating < 0 ? 0 : rating;

  const goToDetails = () => navigate(`/my-listing/${id}`);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToDetails();
        }
      }}
      className={`w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer ${className}`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden group">
        <img
          src={imageUrl}
          alt="listing"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => (e.currentTarget.src = '/default-image.jpg')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-full shadow-sm">
          <img src={star} alt="star" className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">{validRating.toFixed(1)}</span>
        </div>
        {/* Listing status badge - uses API status when present, else hideStatus (Active = approved, Rejected = rejected/draft) */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
              listingStatus === 'flagged'
                ? 'bg-amber-500 text-white'
                : listingStatus === 'pending'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : listingStatus === 'rejected' || hideStatus
                    ? 'bg-gray-500 text-white'
                    : 'bg-[#1D5C5C] text-white'
            }`}
          >
            {listingStatus === 'flagged'
              ? 'Flagged'
              : listingStatus === 'pending'
                ? 'Pending'
                : listingStatus === 'rejected' || hideStatus
                  ? 'Rejected'
                  : 'Active'}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-3 relative">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2 flex-1 text-gray-900">{title}</h3>

          <div
            ref={dropdownRef}
            className="relative flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="p-1.5 -m-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Listing options"
              aria-expanded={dropdownOpen}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    navigate(`/my-listing/${id}`);
                  }}
                >
                  View Details
                </button>
                {onEdit && (
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(false);
                      onEdit(id);
                    }}
                  >
                    Edit Listing
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
                >
                  Delete Listing
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        {/* Property Tags Row */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Property Type Tag */}
          {propertyType && (
            <span className="bg-[#1D5C5C] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {propertyType}
            </span>
          )}
          
          {/* Bedroom Tag */}
          {bedrooms !== undefined && bedrooms > 0 && (
            <span className="bg-[#1D5C5C] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {bedrooms} Bedroom{bedrooms !== 1 ? 's' : ''}
            </span>
          )}

          {/* Bathroom Tag */}
          {bathrooms !== undefined && bathrooms > 0 && (
            <span className="bg-[#1D5C5C] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {bathrooms} Bathroom{bathrooms !== 1 ? 's' : ''}
            </span>
          )}

          {/* Guests Tag */}
          {guests !== undefined && guests > 0 && (
            <span className="bg-[#1D5C5C] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {guests} Guest{guests !== 1 ? 's' : ''}
            </span>
          )}

          {/* Rating */}
          {rating > 0 && (
            <span className="bg-[#A58207] text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
              <img src={star} alt="star" className="w-3 h-3" />
              <span>{rating.toFixed(1)}</span>
            </span>
          )}
        </div>

        {/* Location and Date Row */}
        <div className="flex flex-col sm:flex-col sm:justify-between gap-1 sm:gap-2 pt-2 border-t border-gray-100">
          {/* Location */}
          {location && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs sm:text-sm truncate">{location}</p>
            </div>
          )}

          {/* Created Date */}
          {createdAt && (
            <div className="flex items-center text-gray-500">
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
              <p className="text-xs sm:text-sm whitespace-nowrap">
                {(() => {
                  try {
                    const date = new Date(createdAt);
                    const now = new Date();
                    const diffTime = Math.abs(now.getTime() - date.getTime());
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 0) return 'Today';
                    if (diffDays === 1) return 'Yesterday';
                    if (diffDays < 7) return `${diffDays} days ago`;
                    if (diffDays < 30) {
                      const weeks = Math.floor(diffDays / 7);
                      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
                    }
                    if (diffDays < 365) {
                      const months = Math.floor(diffDays / 30);
                      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
                    }
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  } catch {
                    return '';
                  }
                })()}
              </p>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xl font-bold text-[#1D5C5C]">{price}</p>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md min-h-[300px] flex flex-col items-center justify-center p-8 modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 pb-8">Delete Listing?</h3>
            <p className="text-gray-600 text-center mb-4">
              Are you sure you want to permanently delete{' '}
              <span className="font-medium">"{title}"</span>? Do you want to continue?
            </p>
            
            {deleteError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {(() => {
                    if ('data' in deleteError && deleteError.data && typeof deleteError.data === 'object') {
                      const errorData = deleteError.data as { message?: string };
                      return errorData.message || 'Failed to delete listing';
                    }
                    if ('message' in deleteError && typeof deleteError.message === 'string') {
                      return deleteError.message;
                    }
                    return 'Failed to delete listing';
                  })()}
                </p>
              </div>
            )}

            <div className="pt-8 flex justify-center space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                disabled={isDeleting}
                className="px-6 py-2 w-32 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 w-32 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Yes, delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingCard;