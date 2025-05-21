import React from 'react';
import Header from '@/components/layout/Header';
import NoSavedListImage from '../../assets/images/NoSavedListing.png';
import PropertyListingCard from '@/components/common/PropertyCard';
import { useSavedList } from '@/components/context/SavedListContext';

const SavedListing: React.FC = () => {
  const { savedList } = useSavedList();
  return (
    <div className=" bg-white">
      <Header />
      <div className="py-4 px-10 container mx-auto">
        <h1 className=" text-2xl">Your Saved Jobs</h1>
        <p className="text-[#6F6F6F] mt-2 ">
          {savedList.length} Listings saved -- Last updated on March 30,
          2023.{' '}
        </p>
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
          <button className="bg-[#730071] text-white font-bold py-2 px-4 rounded-md hover:bg-[#AE6BAD]/80 transition duration-300">
            Add
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mb-14 place-items-center">
          {savedList.map((savedProperty) => (
            <PropertyListingCard
              id={savedProperty.id}
              key={savedProperty.id}
              image={savedProperty.image}
              location={savedProperty.location}
              price={savedProperty.price}
              propertyName={savedProperty.propertyName}
              description={savedProperty.description}
              rating={savedProperty.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListing;
