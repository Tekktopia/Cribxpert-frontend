import Header, { HeaderSpacer } from '@/components/layout/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectInitialListingsLoaded,
  useGetListingsQuery,
} from '@/features/listing';
import AuthHandler from '@/components/home/AuthHandler';
import ListingsManager from '@/components/home/ListingsManager';
import HeroSection from '@/components/home/HeroSection';
import FilterSection from '@/components/home/FilterSection';
import ListingsSection from '@/components/home/ListingsSection';

const Home: React.FC = () => {
  const initialListingsLoaded = useSelector(selectInitialListingsLoaded);

  // Check if we're in a loading state for initial listings
  const { isLoading: isLoadingInitial } = useGetListingsQuery(
    {},
    {
      skip: initialListingsLoaded,
    }
  );

  const isLoading = isLoadingInitial || !initialListingsLoaded;

  return (
    <div>
      {/* Background components that handle side effects */}
      <AuthHandler />
      <ListingsManager />

      <Header />
      <section className="py-15 my-5">
        <HeaderSpacer />

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
