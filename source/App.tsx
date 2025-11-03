// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './shared/components/ScrollToTop';

// App components
import LoadingManager from './shared/components/LoadingManager';
import AppRoutes from './routes/AppRoutes';

console.log('🔧 App component loaded');

/**
 * Main app content component that orchestrates all the pieces
 */
const AppContent = () => {
  console.log('📄 AppContent rendering...');
  return (
    <LoadingManager>
      <AppRoutes />
    </LoadingManager>
  );
};

function App() {
  console.log('🌐 App component rendering with Router...');
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
