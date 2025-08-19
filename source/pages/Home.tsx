import React from 'react';
import { useSelector } from 'react-redux';
import { selectInitialListingsLoaded } from '@/features/properties';
import HeroSection from '@/features/home/components/HeroSection';
import FilterSection from '@/features/home/components/FilterSection';
import ListingsSection from '@/features/home/components/ListingsSection';

const Home: React.FC = () => {
  const initialListingsLoaded = useSelector(selectInitialListingsLoaded);

  // Loading state is simply based on whether initial listings are loaded
  // ListingsManager handles the actual data fetching
  const isLoading = !initialListingsLoaded;

  return (
    <div>
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
