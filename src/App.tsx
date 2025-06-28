// Core styles
import './index.css';
import { useState } from 'react';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// App components
import LoadingManager from './components/app/LoadingManager';
import DataPreloader from './components/app/DataPreloader';
import AppProviders from './components/app/AppProviders';
import AppRoutes from './components/app/AppRoutes';

/**
 * Main app content component that orchestrates all the pieces
 */
const AppContent = () => {
  const [dataLoading, setDataLoading] = useState(false);

  return (
    <LoadingManager dataLoading={dataLoading}>
      <DataPreloader onLoadingChange={setDataLoading}>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </DataPreloader>
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
