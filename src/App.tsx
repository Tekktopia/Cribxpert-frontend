// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// Authentication & User Management Pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Onboarding from './pages/Onboarding';
import ProfilePage from './pages/ProfilePage';

// Main Feature Pages
import Home from './pages/Home';
import DiscoverPage from './pages/DiscoverPage';
import PropertyDetail from './pages/PropertyDetail';
import SavedListing from './pages/SavedListing/SavedListing';
import BookingPage from './pages/BookingPage';

// Support & Utility Pages
import PaymentMethod from './pages/PaymentMethod';
import SupportPage from './pages/SupportPage';
import SupportInfo from './pages/SupportInfo';
import NotificationPage from './pages/NotificationPage';

// Data & Context Providers
import { SavedListProvider } from './components/context/SavedListContext';
import { SAMPLE_DATA } from './utils/data';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop/>
        <SavedListProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/propertydetail"
              element={<PropertyDetail listings={SAMPLE_DATA} />}
            />
            <Route path="/my-bookings" element={<BookingPage />} />
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
          </Routes>
          <Footer/>
        </SavedListProvider>
      </Router>
    </>
  );
}

export default App;
