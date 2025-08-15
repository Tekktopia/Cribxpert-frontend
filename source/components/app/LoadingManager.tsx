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
import Preloader from '@/components/common/Preloader';
import { useGetPropertyTypesQuery } from '@/features/propertyType';
import { useGetListingsQuery } from '@/features/listing';
import { setAllListings } from '@/features/listing/listingSlice';

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
  const requiresFavourites =
    location.pathname === '/' ||
    location.pathname === '/discover' ||
    location.pathname === '/saved-listings';

  const shouldWaitForFavourites =
    isAuthenticated &&
    user?._id &&
    requiresFavourites &&
    favouritesLoading &&
    !timeoutExceeded;

  const isDataLoading = Boolean(shouldWaitForFavourites);

  // Safety timeout to prevent infinite loading (10 seconds)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (shouldWaitForFavourites && !timeoutExceeded) {
      timeoutId = setTimeout(() => {
        setTimeoutExceeded(true);
      }, 10000); // 10 seconds
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

  const isLoading =
    (!initialLoadComplete || userLoading || isDataLoading || listingsLoading) &&
    !timeoutExceeded;

  useEffect(() => {
    if (
      !userLoading &&
      !listingsLoading &&
      (!isAuthenticated || !favouritesLoading)
    ) {
      setInitialLoadComplete(true);
    }
  }, [userLoading, listingsLoading, favouritesLoading, isAuthenticated]);

  if (listingsError) {
    // console.error('Error fetching listings:', listingsError);
    // Optionally, you could show an error state here
  }

  if (isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
};

export default LoadingManager;
