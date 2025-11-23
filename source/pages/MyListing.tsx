import React, { useState, useEffect } from 'react';
import { useGetListingsQuery } from '@/features/listing/listingService';
import ListingHeader from '@/features/listing/components/ListingHeader';
import ListingTabs from '@/features/listing/components/ListingTabs';
import ListingCard from '@/features/listing/components/ListingCard';
import InitialListCardText from '@/features/listing/components/InitialListCardText';
import ListCardInitial from '@/features/listing/components/ListCardInitial';
import RoadmapStepper from '@/features/listing/components/ListRoadMapper';
import { InitialSteps } from '@/features/listing/components/data/onboardingSteps';

const MyListing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Listings');
  const [userSteps, setUserSteps] = useState(0);
  const [initialListingsLoaded, setInitialListingsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showListings] = useState(true); // NEW STATE

  const { data, error, isLoading, refetch } = useGetListingsQuery();

  useEffect(() => {
    setInitialListingsLoaded(false); // Temporarily disabled
  }, [data]);


  const filteredListings = (data?.listings || [])
  .filter((listing) => activeTab === 'All Listings' || listing?.country === activeTab)
  .filter((listing) => {
    const name = listing?.name?.toLowerCase() || '';
    const term = searchTerm?.toLowerCase() || '';
    return name.includes(term);
  });

  return (
    <div className="px-4 sm:px-6 md:px-10 py-4">
      {userSteps === 0 && !initialListingsLoaded ? (
        <div className="flex flex-col md:flex-row gap-12 mt-20">
          <div className="flex-1 flex pl-4 sm:pl-10 justify-start items-center">
            <InitialListCardText />
          </div>

          <div className="flex-1 flex flex-col items-center py-8 gap-10">
            {InitialSteps.map((step, index) => (
              <ListCardInitial
                key={index}
                index={index}
                title={step.title}
                description={step.description}
                image={step.image}
              />
            ))}

            <div className="mt-8 justify-end items-end flex w-full pr-0 sm:pr-16">
              <button
                onClick={() => setInitialListingsLoaded(true)}
                className="bg-primary px-10 py-3 rounded-lg text-white text-md hover:opacity-90 transition hover:bg-hoverColor flex items-center gap-2"
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
  <div className="text-center mt-10 text-neutral">Loading listings...</div>
) : error ? (
  <div className="text-red-500 mt-10">
    {(() => {
      if (!error) return 'Unknown error';

      // Check if it's a FetchBaseQueryError
      if ('status' in error) {
        // If error.data is string, show it; if object, try to get message
        const errMsg =
          typeof error.data === 'string'
            ? error.data
            : (error.data as { message?: string })?.message;
        return `Error loading listings: ${errMsg || error.status}`;
      }

      // Otherwise, it might be a SerializedError
      if ('message' in error) {
        return `Error loading listings: ${error.message}`;
      }

      return 'Unknown error';
    })()}
  </div>
) : (
  showListings && (
    <div className="container mx-auto p-4 md:p-8">
      <ListingHeader />
      <ListingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[300px] px-4 py-2 border border-neutralLight rounded"
        />
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-neutral mt-6">No listings found for the selected filter.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredListings.map((listing) => {
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
                  refetch();
                  console.log(`Listing ${deletedId} deleted successfully`);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  )
)}
        </>
      )}
    </div>
  );
};

export default MyListing;
