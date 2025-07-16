// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// App components
import LoadingManager from './components/app/LoadingManager';
import AppRoutes from './components/app/AppRoutes';

/**
 * Main app content component that orchestrates all the pieces
 */
const AppContent = () => {
  return (
    <LoadingManager>
      <AppRoutes />
    </LoadingManager>
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
