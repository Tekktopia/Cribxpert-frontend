import React, { useState, useEffect } from 'react';
import { useGetListingsQuery } from '@/features/listing/listingService';
import ListingHeader from '@/components/ListingComponents/ListingHeader';
import ListingTabs from '@/components/ListingComponents/ListingTabs';
import ListingCard from '@/components/ListingComponents/ListingCard';
import InitialListCardText from '@/components/ListingComponents/InitialListCardText';
import ListCardInitial from '@/components/ListingComponents/ListCardInitial';
import RoadmapStepper from '@/components/ListingComponents/ListRoadMapper';
import {InitialSteps} from '@/components/ListingComponents/onboardingSteps';


const MyListing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Listings');
  const [userSteps, setUserSteps] = useState(0);
  const [initialListingsLoaded, setInitialListingsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading,refetch } = useGetListingsQuery();

  useEffect(() => {
    setInitialListingsLoaded( false)//!!data?.listings);
  }, [data]);

  const filteredListings = (data?.listings || [])
    .filter((listing) => activeTab === 'All Listings' || listing.category === activeTab)
    .filter((listing) => listing.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="px-10 py-4">
       {userSteps === 0 && !initialListingsLoaded ? (
  <div className="flex flex-col md:flex-row gap-12 mt-20">
    {/* Left: Text Section */}
    <div className="flex-1 flex pl-16 justify-start items-center ">
      <InitialListCardText />
    </div>

    {/* Right: Steps + Button */}
    <div className="flex-1 flex flex-col items-center py-8 gap-10 ">
      {InitialSteps.map((step, index) => (
        <ListCardInitial
          key={index}
          index={index}
          title={step.title}
          description={step.description}
          image={step.image}
        />
      ))}

      {/* Get Started Button */}
      <div className="mt-8 justify-end items-end flex w-full pr-[17rem]">
        <button
          onClick={() => setUserSteps(1)}
          className="bg-[#1D5C5C] px-16 py-4 rounded-lg text-white text-md hover:opacity-90 transition  hover:bg-[#C18B3F]"
        >
          Get started
        </button>
      </div>
    </div>
  </div>
        ) : (
          <>
            <RoadmapStepper currentStep={userSteps} setCurrentStep={setUserSteps} />

            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading listings: {error?.message || 'Unknown error'}</div>
            ) : (
              <div className="container mx-auto p-4 md:p-8">
                <ListingHeader />
                <ListingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {filteredListings.length === 0 ? (
                  <div className="text-gray-600 mt-6">No listings found for the selected filter.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {filteredListings.map((listing: any) => {
                      const { _id, name, basePrice, listingImg, rating, country } = listing;
                      const imageUrl = listingImg?.[0]?.fileUrl || '/default-image.jpg';
                      return (
                        <ListingCard
                          key={_id}
                          id={_id}
                          title={name}
                          price={`$${basePrice}`}
                          image={imageUrl}
                          rating={rating || 3.5}
                          category={country}
                          className="w-full"
                          onDelete={(deletedId) => {
                            // Manually refetch the listings after deletion
                            refetch();
                            console.log(`Listing ${deletedId} deleted successfully`);
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyListing;
