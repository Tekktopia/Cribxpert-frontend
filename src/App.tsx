// Core styles
import './index.css';
import { useEffect, useState } from 'react';

// Routing related imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// Data & Context Providers
import { SavedListProvider } from './components/context/SavedListContext';

import OfflineSyncHandler from './components/common/OfflineSyncHandler';
import ProtectedRoute from './components/common/ProtectedRoute';
import FooterWrapper from './components/layout/FooterWrapper';

// Import route config
import routeConfig from '@/routes/RouteConfig';
import { JSX } from 'react';

// Add loading components
import Preloader from '@/components/common/Preloader';
import { useSelector } from 'react-redux';
import { selectAuthLoading } from '@/features/auth/authSlice';
import { useGetAmenitiesQuery } from './features/amenities';
import { useGetListingsQuery } from './features/listing';

// New AppContent component that handles authentication loading state
const AppContent = () => {
  const authLoading = useSelector(selectAuthLoading);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const location = useLocation();

  useGetAmenitiesQuery();
  const { isLoading: listingsLoading } = useGetListingsQuery();

  // Check if current route requires listings to be loaded
  const requiresListings =
    location.pathname === '/' || location.pathname === '/discover';

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Only wait for listings if on home or discover routes
  const shouldWaitForListings = requiresListings && listingsLoading;

  if (authLoading || !initialLoadComplete || shouldWaitForListings) {
    return <Preloader isLoading={true} />;
  }

  return (
    <>
      <SavedListProvider>
        <OfflineSyncHandler />
        <Routes>
          {routeConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  route.element ? (
                    <ProtectedRoute>
                      {route.element as JSX.Element}
                    </ProtectedRoute>
                  ) : null
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
        <FooterWrapper />
      </SavedListProvider>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
