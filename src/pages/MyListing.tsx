import React, { useState } from 'react';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import ListingHeader from '@/components/ListingComponents/ListingHeader';
import ListingTabs from '@/components/ListingComponents/ListingTabs';
import ListingCard from '@/components/ListingComponents/ListingCard';
import InitialListCardText from '@/components/ListingComponents/InitialListCardText';
import ListCardInitial from '@/components/ListingComponents/ListCardInitial';
import RoadmapStepper from '@/components/ListingComponents/ListRoadMapper';



const listings = [
  {
    title: "Makinwaa's Cottage",
    price: "NGN 50,000 / night",
    tags: ['3 Bedroom Apartment', 'Gombe Abuja'],
    image: "/images/GalleryFour.jpeg",
    category: "Active Listings",
  },
  {
    title: "Oceanview Bungalow",
    price: "NGN 65,000 / night",
    tags: ['2 Bedroom Apartment', 'Lagos Island'],
    image: "/images/GalleryFour.jpeg",
    category: "Most Booked Listings",
  },
  {
    title: "Hilltop Cabin",
    price: "NGN 40,000 / night",
    tags: ['1 Bedroom', 'Jos Plateau'],
    image: "/images/GalleryFour.jpeg",
    category: "Drafted Listings",
  },
  {
    title: "Urban Flat",
    price: "NGN 80,000 / night",
    tags: ['Studio', 'Abuja Central'],
    image: "/images/GalleryFour.jpeg",
    category: "Active Listings",
  },
  {
    title: "Oceanview Bungalow",
    price: "NGN 65,000 / night",
    tags: ['2 Bedroom Apartment', 'Lagos Island'],
    image: "/images/GalleryFour.jpeg",
    category: "Most Booked Listings",
  },
  {
    title: "Oceanview Bungalow",
    price: "NGN 65,000 / night",
    tags: ['2 Bedroom Apartment', 'Lagos Island'],
    image: "/images/GalleryFour.jpeg",
    category: "Most Booked Listings",
  },
  {
    title: "Hilltop Cabin",
    price: "NGN 40,000 / night",
    tags: ['1 Bedroom', 'Jos Plateau'],
    image: "/images/GalleryFour.jpeg",
    category: "Drafted Listings",
  },{
    title: "Oceanview Bungalow",
    price: "NGN 65,000 / night",
    tags: ['2 Bedroom Apartment', 'Lagos Island'],
    image: "/images/GalleryFour.jpeg",
    category: "Most Booked Listings",
  },
];

const steps = [
  {
    title: "Start with the basics",
    description: "Add your location, property type, number of guests, and available amenities.",
    image: "/icons/house-in-isometry.png"
  },
  {
    title: "Make It Shine",
    description: "   Upload great photos, write a simple description and set price and availability",
    image: "/icons/Livingroom.png"

  },
  {
    title: "Finish & Go Live",
    description: "   Double check your details, preview your listing, and publish it to start hosting",
    image: "/icons/checkmark-pink.png"

  }
];

const MyListing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Listings');
  const [userSteps, setUserSteps] = useState(0);
  const initialListingsLoaded = true; {/*useSelector(selectInitialListingsLoaded)*/};
  
  const filteredListings =
    activeTab === "All Listings"
      ? listings
      : listings.filter((listing) => listing.category === activeTab);

  return (
    <div >
      
      <Header />
      <HeaderSpacer />
        <div className='px-10 py-4'>

        {initialListingsLoaded && userSteps === 0 &&
        <div className='grid grid-cols-2 gap-x-12 gap-y-8 mt-20'>
          <div className=" col-span-1 row-start-2 justify-start flex ">
            <InitialListCardText/> 
            </div>

                    {steps.map((step, index) => (
            <div key={index} className=" col-start-2 flex justify-center">
              <ListCardInitial
                index={index}
                title={step.title}
                description={step.description}
                image= {step.image}
              />
            </div>

            
          ))}
          <div className="col-start-2 flex justify-end mt-8">
            <button 
            onClick={() => setUserSteps(1)}
            className="bg-[#1D5C5C] px-6 py-3 rounded-lg text-white text-sm hover:opacity-90 transition">
              Get started
            </button>
          </div>
                  
            
        </div>
        
      }
        {userSteps >= 1 && (
  <RoadmapStepper currentStep={userSteps} setCurrentStep={setUserSteps} />
      )}

      { !initialListingsLoaded && <div className="container mx-auto p-4 md:p-8">
        <ListingHeader />
        <ListingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredListings.map((listing, index) => (
            <ListingCard
            key={index}
            title={listing.title}
            price={listing.price}
            tags={listing.tags}
            image={listing.image}
            category={listing.category}
            rating={3.5}
            className="w-full"
            />
          ))}
        </div>
      </div>}
          </div>
    </div>
  );
};

export default MyListing;