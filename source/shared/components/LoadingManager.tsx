import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import { useGetCurrentUserQuery } from '@/features/auth/authService';
import { useGetAmenitiesQuery } from '@/features/amenities';
import { useGetFavouritesByUserIdQuery } from '@/features/favourites/favouritesService';
import Preloader from '@/shared/components/Preloader';
import { useGetPropertyTypesQuery } from '@/features/propertyType';
import { useGetListingsQuery } from '@/features/properties';
import { setAllListings } from '@/features/properties/listingSlice';

interface LoadingManagerProps {
  children: React.ReactNode;
}

const LoadingManager: React.FC<LoadingManagerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);
  const [shouldFetchUser, setShouldFetchUser] = useState(false);

  // Handle URL token extraction and sessionStorage setup
  useEffect(() => {
    // Skip token processing for reset-password route
    if (location.pathname === '/reset-password') {
      setInitialLoadComplete(true);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    const sessionToken = sessionStorage.getItem('token');

    if (urlToken) {
      sessionStorage.setItem('token', urlToken);
      setShouldFetchUser(true);
      urlParams.delete('token');
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, '', newUrl);
    } else if (sessionToken && !isAuthenticated && !initialLoadComplete) {
      setShouldFetchUser(true);
    } else if (!sessionToken && !initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }, [isAuthenticated, initialLoadComplete, location.pathname]);

  // Fetch current user when token is available
  const {
    data: currentUser,
    error: userError,
    isLoading: userLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: !shouldFetchUser,
  });

  useEffect(() => {
    if (shouldFetchUser) {
      if (currentUser) {
        setInitialLoadComplete(true);
      } else if (userError) {
        sessionStorage.removeItem('token');
        setInitialLoadComplete(true);
      }
      setShouldFetchUser(false);
    }
  }, [shouldFetchUser, currentUser, userError]);

  // Preload global data
  useGetAmenitiesQuery();
  useGetPropertyTypesQuery();

  // Fetch all listings
  const {
    data: listingsData,
    error: listingsError,
    isLoading: listingsLoading,
  } = useGetListingsQuery();

  // Fetch user's favourites if logged in
  const {
    data: favouritesData,
    isLoading: favouritesLoading,
    isError: favouritesError,
  } = useGetFavouritesByUserIdQuery(user?._id || '', {
    skip: !isAuthenticated || !user?._id, // Skip if user is not authenticated
  });

  // console.log(favouritesData, user?._id, isAuthenticated);
  // console.log(listingsData);

  // Merge listings and favourites after both are loaded and no errors
  useEffect(() => {
    if (
      listingsData &&
      (!isAuthenticated || favouritesData) &&
      !listingsLoading &&
      (!isAuthenticated || !favouritesLoading) &&
      !listingsError &&
      (!isAuthenticated || !favouritesError)
    ) {
      const favouriteIds = (favouritesData || []).map((fav) => fav._id);
      const mergedListings = listingsData.listings.map((listing) => ({
        ...listing,
        isFavorited: favouriteIds.includes(listing._id),
      }));
      console.log('[LoadingManager] Sample listing cleaningFee:', listingsData.listings[0]?.name, listingsData.listings[0]?.cleaningFee);
      dispatch(setAllListings(mergedListings));
    }
  }, [
    listingsData,
    favouritesData,
    isAuthenticated,
    listingsLoading,
    favouritesLoading,
    listingsError,
    favouritesError,
    dispatch,
  ]);

  // Check if current route requires favourites to be loaded
  // Only block on saved-listings page, let home/discover load favourites in background
  const requiresFavourites =
    location.pathname === '/saved-listings';

  const shouldWaitForFavourites =
    isAuthenticated &&
    user?._id &&
    requiresFavourites &&
    favouritesLoading &&
    !timeoutExceeded;

  const isDataLoading = Boolean(shouldWaitForFavourites);

  // Safety timeout to prevent infinite loading (3 seconds - reduced for faster loading)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (shouldWaitForFavourites && !timeoutExceeded) {
      timeoutId = setTimeout(() => {
        setTimeoutExceeded(true);
      }, 3000); // 3 seconds - reduced from 10
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear timeout on component unmount or changes
      }
    };
  }, [shouldWaitForFavourites, timeoutExceeded]);

  useEffect(() => {
    if (favouritesError) {
      // console.error('Error fetching favourites:', favouritesError);
      setTimeoutExceeded(true);
    }
  }, [favouritesError]);

  // Reset timeout when route changes or user changes
  useEffect(() => {
    setTimeoutExceeded(false);
  }, [user?._id]);

  // Add a safety timeout to prevent infinite loading (5 seconds max)
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (!initialLoadComplete) {
        console.warn('Loading timeout exceeded, forcing render');
        setInitialLoadComplete(true);
        setTimeoutExceeded(true);
      }
    }, 5000); // 5 seconds max loading time

    return () => clearTimeout(safetyTimeout);
  }, []);

  // Only wait for critical data: user auth and listings
  // Favourites can load in the background
  const isLoading =
    (!initialLoadComplete || userLoading || isDataLoading) &&
    !timeoutExceeded;

  useEffect(() => {
    // Mark as complete once user and listings are done
    // Don't wait for favourites unless on saved-listings page
    if (
      !userLoading &&
      !listingsLoading
    ) {
      setInitialLoadComplete(true);
    }
  }, [userLoading, listingsLoading]);

  // If there's an error, still render the app (don't block on errors)
  if (listingsError) {
    console.error('Error fetching listings:', listingsError);
    // Still allow the app to render even if listings fail to load
    if (!initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }

  // If timeout exceeded, force render
  if (timeoutExceeded) {
    return <>{children}</>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
};

export default LoadingManager;
