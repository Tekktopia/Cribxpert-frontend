import React, { useState } from 'react';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import { useSelector } from 'react-redux';
import { selectInitialListingsLoaded } from '@/features/listing';
import ListingsManager from '@/components/home/ListingsManager';
import ListingHeader from '@/components/ListingComponents/ListingHeader';
import ListingTabs from '@/components/ListingComponents/ListingTabs';
import ListingCard from '@/components/ListingComponents/ListingCard';



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

const MyListing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Listings');
  const initialListingsLoaded = false; {/*useSelector(selectInitialListingsLoaded)*/};
  
  const filteredListings =
    activeTab === "All Listings"
      ? listings
      : listings.filter((listing) => listing.category === activeTab);

  return (
    <div >
      <ListingsManager />
      <Header />
      <HeaderSpacer />
        <div className='px-8 py-4'>

        {initialListingsLoaded && (
          <div className='text-5xl'>e</div>
          
        )
        
      }

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