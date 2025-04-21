import './index.css';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Onboarding from './pages/Onboarding';

import ProfilePage from './pages/ProfilePage';
import PaymentMethod from './components/pages/booking/PaymentMethod';
import BookingPage from './components/pages/booking';
import SupportPage from './pages/SupportPage';
import Home from './components/pages/Home';
import SavedListing from './pages/SavedListing/SavedListing';
import { SavedListProvider } from './components/context/SavedListContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyDetail from './components/pages/PropertyDetail';
import { SAMPLE_DATA } from './utils/data';
import DiscoverPage from './pages/DiscoverPage';
import SupportInfo from './components/support/SupportInfo';

function App() {
  return (
    <>
      <Router>
         <SavedListProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/propertydetail"
            element={<PropertyDetail listings={SAMPLE_DATA} />}
          />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/paymentmethod" element={<PaymentMethod />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support-info" element={<SupportInfo />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/saved-listing" element={<SavedListing />} />
        </Routes>
        </SavedListProvider>
      </Router>
    </>
  );
}

export default App;
