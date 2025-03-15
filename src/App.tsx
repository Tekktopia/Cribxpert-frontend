import './index.css';
import PaymentMethod from './pages/booking/PaymentMethod';
import BookingPage from './pages/booking';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyDetail from './pages/PropertyDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SignUpPage from './pages/SignUpPage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propertydetail" element={<PropertyDetail />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/paymentmethod" element={<PaymentMethod />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up-page" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
