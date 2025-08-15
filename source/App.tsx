// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './shared/components/ScrollToTop';

// App components
import LoadingManager from './app/LoadingManager';
import AppRoutes from './routes/AppRoutes';

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
