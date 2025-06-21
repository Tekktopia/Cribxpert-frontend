import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from './favouritesService';
import { setOnlineStatus, clearPendingSync } from './favouritesSlice';
import { RootState } from '@/store/store';

/**
 * A hook that handles synchronization of offline favourites when the user comes back online
 */
export function useFavouritesOfflineSync() {
  const dispatch = useDispatch();
  const { pendingSync, isOnline } = useSelector(
    (state: RootState) => state.favourites
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Get the API mutation hooks
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  // Effect to detect online/offline status changes
  useEffect(() => {
    // Update online status when it changes
    const handleOnlineStatus = () => {
      dispatch(setOnlineStatus(navigator.onLine));
    };

    // Add event listeners
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Initial status
    handleOnlineStatus();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [dispatch]);

  // Effect to sync pending operations when coming back online
  useEffect(() => {
    // Only sync if we're online, have a user, and have pending operations
    if (
      isOnline &&
      user?._id &&
      (pendingSync.add.length > 0 || pendingSync.remove.length > 0)
    ) {
      const syncFavourites = async () => {
        // First, process all pending additions
        if (pendingSync.add.length > 0) {
          for (const listingId of pendingSync.add) {
            try {
              await addFavourite({
                userId: user._id,
                listingId,
              });
              // console.log(
              //   `Successfully synced addition of listing ${listingId}`
              // );
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
              // console.error(
              //   `Failed to sync addition of listing ${listingId}:`,
              //   err
              // );
              // In a production app, you might want to retry or track failed syncs
            }
          }
        }

        // Then, process all pending removals
        if (pendingSync.remove.length > 0) {
          for (const listingId of pendingSync.remove) {
            try {
              await removeFavourite({
                userId: user._id,
                listingId,
              });
              console.log(
                `Successfully synced removal of listing ${listingId}`
              );
            } catch (err) {
              console.error(
                `Failed to sync removal of listing ${listingId}:`,
                err
              );
            }
          }
        }

        // Clear the pending sync queue
        dispatch(clearPendingSync());
      };

      // Start the sync process
      syncFavourites();
    }
  }, [
    isOnline,
    user,
    pendingSync.add,
    pendingSync.remove,
    addFavourite,
    removeFavourite,
    dispatch,
  ]);
}
