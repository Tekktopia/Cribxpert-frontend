import { useGetAmenitiesQuery } from '@/features/amenities';
import { useGetListingsQuery } from '@/features/listing';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface DataPreloaderProps {
  children: React.ReactNode;
  onLoadingChange: (isLoading: boolean) => void;
}

/**
 * Component responsible for preloading essential data
 * and determining loading states based on current route
 */
const DataPreloader: React.FC<DataPreloaderProps> = ({
  children,
  onLoadingChange,
}) => {
  const location = useLocation();

  // Preload global data
  useGetAmenitiesQuery();
  const { isLoading: listingsLoading } = useGetListingsQuery();

  // Check if current route requires listings to be loaded
  const requiresListings =
    location.pathname === '/' || location.pathname === '/discover';

  // Only wait for listings if on home or discover routes
  const shouldWaitForListings = requiresListings && listingsLoading;

  // Notify parent about loading state
  useEffect(() => {
    onLoadingChange(shouldWaitForListings);
  }, [shouldWaitForListings, onLoadingChange]);

  return <>{children}</>;
};

export default DataPreloader;
