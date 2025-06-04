import React from 'react';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import NoSavedListImage from '../../assets/images/NoSavedListing.png';
import { useSavedList } from '@/components/context/SavedListContext';
import PropertyListing from '@/components/PropertyListing';
import { Link } from 'react-router';

const SavedListing: React.FC = () => {
  const { savedList } = useSavedList();
  return (
    <div className=" bg-white">
      <Header />
      <HeaderSpacer />
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
            src={NoSavedListImage}
            alt="No saved List Image"
            className="w-40 h-40 mx-auto"
          />
          <h1 className="font-bold text-xl text-[#040404]">No Saved Listing</h1>
          <p className="text-[#999999] max-w-md text-md">
            Save your favorites in one place. Click the heart icon as you browse
            to add items to your saved list.
          </p>
          <Link to={'/discover'}>
            <button className="bg-[#730071] text-white font-bold py-2 px-4 rounded-md hover:bg-[#AE6BAD]/80 transition duration-300">
              Add Listings
            </button>
          </Link>
        </div>
      ) : (
        <PropertyListing listings={savedList} />
      )}
    </div>
  );
};

export default SavedListing;
