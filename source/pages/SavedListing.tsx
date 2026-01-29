import React from 'react';
import SavedListingCard from '@/features/properties/components/SavedListingCard';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { selectFavourites } from '@/features/favourites';

const SavedListing: React.FC = () => {
  const savedList = useSelector(selectFavourites);
  return (
    <div className=" bg-white">
      <div className="sticky top-0 z-30 bg-white">
        <div className="py-8 px-4 xl:px-8 container mx-auto">
          <h1 className=" text-2xl">Your Saved Listings</h1>
          <p className="text-[#6F6F6F] mt-2 ">
            {savedList.length} Listings saved -- Last updated on March 30,
            2023.{' '}
          </p>
        </div>
      </div>

      {savedList.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
          <img
            src={'/images/No-Favorite.png'}
            alt="No saved List Image"
            className="w-40 h-40 mx-auto"
          />
          <h1 className="font-bold text-xl text-[#040404]">No Saved Listing</h1>
          <p className="text-[#999999] max-w-md text-md">
            Save your favorites in one place. Click the heart icon as you browse
            to add items to your saved list.
          </p>
          <Link to={'/discover'}>
            <button className="bg-[#1D5C5C] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1D5C5C]/80 transition duration-300">
              Add Listings
            </button>
          </Link>
        </div>
      ) : (
        <div className="px-4 2xl:container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-14 items-stretch">
          {savedList.map((listing) => (
            <SavedListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListing;
