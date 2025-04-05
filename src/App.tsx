import './index.css';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PaymentMethod from './pages/booking/PaymentMethod';
import PropertyDetail from './pages/PropertyDetail';
import BookingPage from './pages/booking';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SupportPage from './pages/SupportPage';
import SupportInfo from './components/support/SupportInfo';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propertydetail" element={<PropertyDetail />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/paymentmethod" element={<PaymentMethod />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support-info" element={<SupportInfo />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
