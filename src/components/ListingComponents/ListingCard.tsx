import React, { useState, useRef, useEffect } from 'react';
import star from '../../assets/icons/star.svg';
import { useDeleteListingMutation } from '@/features/listing/listingService'; // Import your RTK Query hook

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
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  price,
  tags,
  image,
  category,
  rating,
  className = '',
  onDelete
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // RTK Query mutation hook
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

  return (
    <div className={`w-full bg-white rounded-lg overflow-hidden ${className}`}>
      <div className="relative w-full aspect-[4/3]">
        <img
          src={imageUrl}
          alt="listing"
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = '/default-image.jpg')}
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full">
          <img src={star} alt="star" className="w-3 h-3" />
          <span className="text-xs font-medium">{validRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2 relative">
          <h3 className="text-lg font-medium leading-tight line-clamp-2 flex-1">{title}</h3>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="p-1 -m-1 text-gray-400 hover:text-gray-600"
              aria-label="Listing options"
              aria-expanded={dropdownOpen}
            >
              <div className="flex flex-col gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-current"></div>
                ))}
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                  }}
                >
                  Edit Listing
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                >
                  Delete Listing
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(tags || []).map((tag, index) => (
            <span
              key={index}
              className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                index === 0 ? 'bg-teal-700' : 'bg-[#C18B3F]'
              } text-white`}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-base font-semibold text-gray-900">{price}</p>
        <p className="text-sm text-gray-600 font-medium">{category}</p>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
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