import Header, { HeaderSpacer } from '@/components/layout/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectInitialListingsLoaded } from '@/features/listing';
import ListingsManager from '@/components/home/ListingsManager';
import HeroSection from '@/components/home/HeroSection';
import FilterSection from '@/components/home/FilterSection';
import ListingsSection from '@/components/home/ListingsSection';

const Home: React.FC = () => {
  const initialListingsLoaded = useSelector(selectInitialListingsLoaded);

  // Loading state is simply based on whether initial listings are loaded
  // ListingsManager handles the actual data fetching
  const isLoading = !initialListingsLoaded;

  return (
    <div>
      {/* Background component that handles listings data fetching */}
      <ListingsManager />

      <Header />
      <HeaderSpacer />
      <section className="py-15">
        

        {/* Hero Section */}
        <HeroSection />

        {/* Filter Section - Made sticky */}
        <FilterSection />

        {/* Listings Section with Loading/Empty States */}
        <ListingsSection isLoading={isLoading} />
      </section>
    </div>
  );
};

export default Home;
