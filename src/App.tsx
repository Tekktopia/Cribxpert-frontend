
import './index.css'
import PaymentMethod from './components/pages/booking/PaymentMethod'
import BookingPage from './components/pages/booking'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PropertyDetail from './components/pages/PropertyDetail'
import { SAMPLE_DATA } from './constants/data'
function App() {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/propertydetail" element={<PropertyDetail listings={SAMPLE_DATA} />} />
      <Route path="/BookingPage" element={<BookingPage />} />
      <Route path="/paymentmethod" element={<PaymentMethod />} />
      

      </Routes>
    </Router>
    
      
      
    </>
  )
}

export default App
