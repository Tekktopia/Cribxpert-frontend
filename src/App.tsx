// Core styles
import './index.css';
import { useEffect, useState } from 'react';

// Routing related imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// Data & Context Providers
import { SavedListProvider } from './components/context/SavedListContext';

// Combined imports from both branches
import { SAMPLE_DATA } from './utils/data';
import Footer from './components/layout/Footer';
import NotFound404 from './pages/NotFound404';
import BookNowPage from './components/booking/BookNowPage';
import BookingDetailsPage from './pages/BookingDetailsPage';

import OfflineSyncHandler from './components/common/OfflineSyncHandler';
import ProtectedRoute from './components/common/ProtectedRoute';
import FooterWrapper from './components/layout/FooterWrapper';

// Additional page components
import BookingsPage from './pages/BookingsPage';
import PaymentMethod from './pages/PaymentMethod';
import ProfilePage from './pages/ProfilePage';
import SupportPage from './pages/SupportPage';
import SupportInfo from './pages/SupportInfo';
import NotificationPage from './pages/NotificationPage';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DiscoverPage from './pages/DiscoverPage';
import SavedListing from './pages/SavedListing';

// Import route config
import routeConfig from '@/routes/RouteConfig';
import { JSX } from 'react';

// Add loading components
import Preloader from '@/components/common/Preloader';
import { useSelector } from 'react-redux';
import { selectAuthLoading } from '@/features/auth/authSlice';

// New AppContent component that handles authentication loading state
const AppContent = () => {
  const authLoading = useSelector(selectAuthLoading);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (authLoading || !initialLoadComplete) {
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

          {/* Additional Routes from booking-pages branch */}
          <Route path="/my-bookings" element={<BookingsPage />} />
          <Route path="/booking/:id" element={<BookingDetailsPage />} />
          <Route path="/book-now" element={<BookNowPage />} />

          <Route path="/payments" element={<PaymentMethod />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support-info" element={<SupportInfo />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/saved-listings" element={<SavedListing />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound404 />} />
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
