// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// App components
import LoadingManager from './components/app/LoadingManager';
import AppProviders from './components/app/AppProviders';
import AppRoutes from './components/app/AppRoutes';

/**
 * Main app content component that orchestrates all the pieces
 */
const AppContent = () => {
  return (
    <LoadingManager>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
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
