import React, { useState, useRef, useEffect } from 'react';
import star from '../../assets/icons/star.svg';

interface ListingCardProps {
  title: string;
  price: string;
  tags: string[];
  image: string;
  category: string;
  rating: number;
  className?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ 
  title, 
  price, 
  tags, 
  image, 
  category,
  rating,
  className = '' 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full bg-white rounded-lg overflow-hidden   ${className}`}>
      {/* Image container */}
      <div className="relative w-full aspect-[4/3]">
        <img 
          src={image} 
          alt="listing" 
          className="w-full h-full object-cover" 
        />
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full">
          <img src={star} alt="star" className="w-3 h-3" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
        </div>

        {/* Image indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white bg-opacity-60"></div>
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="p-4 space-y-3">
        {/* Title + Menu */}
        <div className="flex justify-between items-start gap-2 relative">
          <h3 className="text-lg font-medium leading-tight line-clamp-2 flex-1">{title}</h3>
          
          {/* Menu button container with ref */}
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
            
            {/* Dropdown menu */}
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
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

        {/* Price */}
        <p className="text-base font-semibold text-gray-900">{price}</p>
      </div>

      {/* Delete confirmation modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center  ">
  <div 
    className="bg-white rounded-lg w-full max-w-md min-h-[300px] flex flex-col items-center justify-center p-8 "
    onClick={(e) => e.stopPropagation()} // Prevent click-through to background
  >
    {/* Modal Body */}
    <div className=" flex flex-col items-center justify-center">
    
      <h3 className="text-xl font-semibold text-gray-900 pb-8 ">Delete Listing?</h3>
      <p className="text-gray-600 text-center mb-4">
        Are you sure you want to permanently delete <span className="font-medium">"{title}"</span>?<br />
        Do you want to continue?
      </p>
    </div>

    {/* Modal Footer */}
    <div className="pt-8 flex justify-center space-x-4">
    <button
        onClick={() => setModalOpen(false)}
        className="px-6 py-2 w-32 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
        Cancel
    </button>
    <button
        onClick={() => {
        setModalOpen(false);
        // Handle delete logic here
        }}
        className="px-6 py-2 w-32 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
        Yes delete
    </button>
    </div>
  </div>
</div>
      )}
    </div>
  );
};

export default ListingCard;