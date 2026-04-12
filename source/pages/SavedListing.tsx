import React from 'react';
import SavedListingCard from '@/features/properties/components/SavedListingCard';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { selectFavourites } from '@/features/favourites';
import Footer from '@/shared/components/layout/Footer';

const SavedListing: React.FC = () => {
  const savedList = useSelector(selectFavourites);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="py-8 px-4 xl:px-8 container mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Your Saved Listings</h1>
          <p className="text-[#6F6F6F] mt-2">
            {savedList.length} {savedList.length === 1 ? 'Listing' : 'Listings'} saved
          </p>
        </div>
      </div>

      {/* Main Content - flex-1 pushes footer down */}
      <div className="flex-1">
        {savedList.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
            <img
              src={'/images/No-Favorite.png'}
              alt="No saved List Image"
              className="w-40 h-40 mx-auto mb-6"
            />
            <h1 className="font-bold text-xl text-[#040404] mb-2">No Saved Listing</h1>
            <p className="text-[#999999] max-w-md text-md mb-6">
              Save your favorites in one place. Click the heart icon as you browse
              to add items to your saved list.
            </p>
            <Link to={'/discover'}>
              <button className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-hoverColor transition duration-300">
                Browse Listings
              </button>
            </Link>
          </div>
        ) : (
          <div className="px-4 2xl:container mx-auto w-full py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {savedList.map((listing) => (
                <SavedListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Full width and stays at bottom */}
      <Footer />
    </div>
  );
};

export default SavedListing;