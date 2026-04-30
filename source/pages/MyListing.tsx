import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useGetUserListingsQuery } from '@/features/listing/listingService';
import { PropertyListing } from '@/types';
import ListingHeader from '@/features/listing/components/ListingHeader';
import ListingTabs from '@/features/listing/components/ListingTabs';
import ListingCard from '@/features/listing/components/ListingCard';
import InitialListCardText from '@/features/listing/components/InitialListCardText';
import ListCardInitial from '@/features/listing/components/ListCardInitial';
import RoadmapStepper from '@/features/listing/components/ListRoadMapper';
import { InitialSteps } from '@/features/listing/components/data/onboardingSteps';
import { useSelector } from 'react-redux';
import { selectAllPropertyTypes } from '@/features/propertyType';
import Footer from '@/shared/components/layout/Footer';

const MyListing: React.FC = () => {
  const location = useLocation();
  const editListingIdFromState = (location.state as { editListingId?: string })?.editListingId;

  const [activeTab, setActiveTab] = useState('All Listings');
  const [userSteps, setUserSteps] = useState(0);
  const [initialListingsLoaded, setInitialListingsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showListings] = useState(true);
  const [editingListing, setEditingListing] = useState<PropertyListing | null>(null);

  // When coming from detail page "Edit", we need all listings to find the one to edit
  const statusParam =
    activeTab === 'Active Listings'
      ? 'approved'
      : activeTab === 'Rejected Listing'
        ? 'rejected'
        : activeTab === 'Pending'
          ? 'pending'
          : activeTab === 'Flagged Listings'
            ? 'flagged'
            : undefined; // All Listings, Most Booked → no filter

  // If we have editListingId from detail page, fetch all listings to get that listing; otherwise use tab filter
  const queryArg = editListingIdFromState
    ? undefined
    : statusParam
      ? { status: statusParam }
      : undefined;
  const {
    data: listings,
    error,
    isLoading,
    refetch,
  } = useGetUserListingsQuery(queryArg);

  // Get property types for mapping
  const propertyTypes = useSelector(selectAllPropertyTypes) || [];

  // Check if user has any listings (use full count for "has listings" when no filter)
  const hasListings = listings && listings.length > 0;

  // Show getting started only if:
  // 1. Not loading
  // 2. User has no listings (either empty array or "no listings found" error)
  // 3. User hasn't clicked "Get started" yet
  // 4. User is on step 0 (not creating a listing)
  // 5. User is not in create mode (initialListingsLoaded is false)
  const showGettingStarted =
    !isLoading &&
    !hasListings &&
    userSteps === 0 &&
    !initialListingsLoaded;

  // Realtime: refetch whenever user's listings change
  useEffect(() => {
    const channel = supabase
      .channel('my-listings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'listings' }, () => {
        refetch();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [refetch]);

  useEffect(() => {
    // When navigated from detail page with "Edit", open the edit form with that listing
    if (editListingIdFromState && listings && listings.length > 0) {
      const toEdit = listings.find((l) => l._id === editListingIdFromState);
      if (toEdit) {
        setEditingListing(toEdit);
        setInitialListingsLoaded(true);
        setUserSteps(0);
      }
    }
  }, [editListingIdFromState, listings]);

  // API returns pre-filtered by status; only filter by search term client-side
  const filteredListings = (listings || []).filter((listing) => {
    const name = listing?.name?.toLowerCase() || '';
    const term = searchTerm?.toLowerCase() || '';
    return name.includes(term);
  });

  return (
    <div className='w-full'>
    <div className="px-4 sm:px-6 md:px-10 py-4">
      {showGettingStarted ? (
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
          {/* Show form only when user is creating a listing (initialListingsLoaded is true) */}
          {initialListingsLoaded && (
            <>
              {/* Back button for users with listings */}
              {hasListings && (
                <div className="mt-4 mb-4">
                  <button
                    onClick={() => {
                      setInitialListingsLoaded(false);
                      setUserSteps(0);
                      setEditingListing(null);
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">Back to My Listings</span>
                  </button>
                </div>
              )}
              <RoadmapStepper
                currentStep={userSteps}
                setCurrentStep={setUserSteps}
                editingListing={editingListing}
                onListingSaved={() => {
                  setEditingListing(null);
                  setInitialListingsLoaded(false);
                  setUserSteps(0);
                  refetch();
                }}
              />
            </>
          )}

          {/* Show listings when not creating a listing */}
          {!initialListingsLoaded && showListings && (
            <div className="container mx-auto p-4 md:p-8">
              <ListingHeader
                onCreateNewListing={() => {
                  setUserSteps(0); // Start at step 0 (Property Type - first step of the form)
                  setInitialListingsLoaded(true); // This will show the form
                }}
              />
              <ListingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {isLoading ? (
                <div className="text-center mt-10 text-neutral">
                  Loading listings...
                </div>
              ) : error ? (
                <div className="mt-8">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-neutralLight rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-10 h-10 text-neutral"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Oops! No listings available
                    </h3>
                    <p className="text-gray-500 max-w-md mb-4">
                      {(() => {
                        if (!error) return 'Unable to load your listings.';
                        
                        // Check if it's a FetchBaseQueryError
                        if ('status' in error) {
                          const errMsg =
                            typeof error.data === 'string'
                              ? error.data
                              : (error.data as { message?: string })?.message;

                          // Check if it's the "no listings found" message
                          if (
                            errMsg
                              ?.toLowerCase()
                              .includes('no listings found') ||
                            errMsg
                              ?.toLowerCase()
                              .includes('no listings available')
                          ) {
                            return "You haven't created any listings yet. Start by creating your first listing!";
                          }
                          return 'Unable to load your listings. Please try again later.';
                        }

                        // Otherwise, it might be a SerializedError
                        if ('message' in error) {
                          if (
                            error.message
                            ?.toLowerCase()
                              .includes('no listings found') ||
                            error.message
                            ?.toLowerCase()
                              .includes('no listings available')
                            ) {
                            return "You haven't created any listings yet. Start by creating your first listing!";
                          }
                          return 'Unable to load your listings. Please try again later.';
                        }

                        return 'Unable to load your listings. Please try again later.';
                      })()}
                    </p>
                    <button
                      onClick={() => refetch()}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-hoverColor transition flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Try Again
                    </button>
                  </div>
                </div>
              ) : !listings || listings.length === 0 ? (
                <div className="mt-8">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-neutralLight rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-10 h-10 text-neutral"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Oops! No listings available
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      You haven't created any listings yet. Start by creating
                      your first listing!
                    </p>
                  </div>
                </div>
              ) : (
                <>
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
                    <div className="flex flex-col items-center justify-center py-12 text-center mt-6">
                      <div className="w-16 h-16 bg-neutralLight rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-neutral"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        No listings found
                      </h3>
                      <p className="text-gray-500">
                        No listings match your search or filter criteria. Try
                        adjusting your search term.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                      {filteredListings.map((listing) => {
                        const {
                          _id,
                          name,
                          basePrice,
                          listingImg,
                          rating,
                          country,
                          city,
                          state,
                          bedroomNo,
                          bathroomNo,
                          guestNo,
                          propertyType,
                          description,
                          createdAt,
                          avaliableUntil, // add this
                        } = listing;
                        const imageUrl =
                          listingImg?.[0]?.fileUrl || '/default-image.jpg';

                        // Build location string
                        const locationParts = [city, state, country].filter(
                          (part) => part && part.trim() !== ''
                        );
                        const location = locationParts.length > 0
                          ? locationParts.join(', ')
                          : country || 'Location not specified';

                        // Get property type name
                        let propertyTypeName = '';
                        if (propertyType) {
                          if (typeof propertyType === 'object' && 'name' in propertyType) {
                            propertyTypeName = (propertyType as { name: string }).name;
                          } else if (typeof propertyType === 'string') {
                            const pt = propertyTypes.find((type) => type._id === propertyType);
                            propertyTypeName = pt?.name || '';
                          }
                        }

                        return (
                          <ListingCard
                          key={_id}
                          id={_id}
                            title={name}
                            price={`₦${Number(basePrice).toLocaleString()}/night (Accommodation fee)`}
                            image={imageUrl}
                            rating={rating || 0}
                            category={country}
                            bedrooms={bedroomNo}
                            bathrooms={bathroomNo}
                            guests={guestNo}
                            propertyType={propertyTypeName}
                            description={description}
                            location={location}
                            createdAt={createdAt}
                            hideStatus={listing.hideStatus}
                            status={listing.status}
                            avaliableUntil={avaliableUntil}
                            className="w-full"
                            onDelete={(deletedId) => {
                              refetch();
                              console.log(
                                `Listing ${deletedId} deleted successfully`
                              );
                            }}
                            onEdit={(listingId) => {
                              const listingToEdit = listings?.find((l) => l._id === listingId);
                              if (listingToEdit) {
                                setEditingListing(listingToEdit);
                                setInitialListingsLoaded(true);
                                setUserSteps(0);
                              }
                            }}
                            onStatusChange={() => {
                              refetch();
                            }}
                            />
                          );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
    <Footer />
      </div>
  );
};

export default MyListing;
