// import { useEffect } from 'react';
import { useFavouritesOfflineSync } from '@/features/favourites/useOfflineSync';

/**
 * This component doesn't render anything visible
 * It just hooks into the app lifecycle to manage offline/online syncing
 */
const OfflineSyncHandler = () => {
  // Initialize the favourites offline sync hook
  useFavouritesOfflineSync();

  // We could add more offline sync hooks here for other features

  // // Log when the component mounts/unmounts for debugging
  // useEffect(() => {
  //   console.log('OfflineSyncHandler mounted - offline sync enabled');
  //   return () => {
  //     console.log('OfflineSyncHandler unmounted');
  //   };
  // }, []);

  // This component doesn't render anything
  return null;
};

export default OfflineSyncHandler;
