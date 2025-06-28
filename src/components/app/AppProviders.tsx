import React from 'react';
// import { SavedListProvider } from '@/components/context/SavedListContext';
import OfflineSyncHandler from '@/components/common/OfflineSyncHandler';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Component responsible for wrapping the app with all necessary providers
 * and background services
 */
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <>
      <OfflineSyncHandler />
      {children}
    </>
  );
};

export default AppProviders;
