import "./index.css";
import PaymentMethod from "./pages/booking/PaymentMethod";
import BookingPage from "./pages/booking";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyDetail from "./pages/PropertyDetail";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/propertydetail' element={<PropertyDetail />} />
          <Route path='/BookingPage' element={<BookingPage />} />
          <Route path='/paymentmethod' element={<PaymentMethod />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
