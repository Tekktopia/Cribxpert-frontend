import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectInitialListingsLoaded,
  setCurrentListings,
  setInitialListingsLoaded,
  useGetListingsQuery,
} from '@/features/listing';

const ListingsManager = () => {
  const dispatch = useDispatch();
  const initialListingsLoaded = useSelector(selectInitialListingsLoaded);

  // Initial fetch of all listings (with no filters)
  const { data: allListings } = useGetListingsQuery(
    {},
    {
      // Only fetch once on component mount
      skip: initialListingsLoaded,
    }
  );

  // Set initial listings when they load
  useEffect(() => {
    if (allListings && !initialListingsLoaded) {
      dispatch(setCurrentListings(allListings.listings));
      dispatch(setInitialListingsLoaded(true));
    }
  }, [allListings, initialListingsLoaded, dispatch]);

  // This component doesn't render anything
  return null;
};

export default ListingsManager;
