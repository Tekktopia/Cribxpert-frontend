
import './index.css'

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
      </Routes>
    </Router>
    
      
      
    </>
  )
}

export default App
