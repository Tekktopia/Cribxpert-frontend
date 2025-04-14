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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyDetail from './components/pages/PropertyDetail';
import { SAMPLE_DATA } from './utils/data';
import DiscoverPage from './pages/DiscoverPage';
import SupportInfo from './components/support/SupportInfo';

function App() {
  return (
    <>
      <Router>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
