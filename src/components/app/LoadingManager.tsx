import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthLoading } from '@/features/auth/authSlice';
import Preloader from '@/components/common/Preloader';

interface LoadingManagerProps {
  children: React.ReactNode;
  dataLoading?: boolean;
}

/**
 * Component responsible for managing all loading states
 * and showing the appropriate loading screen
 */
const LoadingManager: React.FC<LoadingManagerProps> = ({
  children,
  dataLoading = false,
}) => {
  const authLoading = useSelector(selectAuthLoading);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Handle initial app load delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Determine if we should show loading screen
  const isLoading = authLoading || !initialLoadComplete || dataLoading;

  if (isLoading) {
    return <Preloader isLoading={true} />;
  }

  return <>{children}</>;
};

export default LoadingManager;
