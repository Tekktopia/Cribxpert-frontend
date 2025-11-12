// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './shared/components/ScrollToTop';

// App components
import LoadingManager from './shared/components/LoadingManager';
import AppRoutes from './routes/AppRoutes';
import { SocketProvider } from './shared/context/SocketContext';

/**
 * Main app content component that orchestrates all the pieces
 */
const AppContent = () => {
  return (
    <SocketProvider>
      <LoadingManager>
        <AppRoutes />
      </LoadingManager>
    </SocketProvider>
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
