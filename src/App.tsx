
import './index.css'
import BookingPage from './components/pages/booking'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PropertyDetail from './components/pages/PropertyDetail'
function App() {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/propertydetail" element={<PropertyDetail />} />
      <Route path="/BookingPage" element={<BookingPage />} />
      

      </Routes>
    </Router>
    
      
      
    </>
  )
}

export default App
