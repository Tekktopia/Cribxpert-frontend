// Core styles
import './index.css';

// Routing related imports
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './shared/components/ScrollToTop';
import { InstallPrompt } from './features/InstallPrompt.tsx';

// App components
import LoadingManager from './shared/components/LoadingManager';
import AppRoutes from './routes/AppRoutes';
import { SocketProvider } from './shared/context/SocketContext';
import SplashScreen from './shared/components/SplashScreen';
import { useState, useCallback } from 'react';

console.log('🔧 App component loaded');

/**
 * Main app content component that orchestrates all the pieces
 */
const AppContent = () => {
  // Show the splash on every fresh app open.
  // sessionStorage is cleared when the PWA is closed/killed, so this naturally
  // triggers on each launch without showing again on in-app navigations.
  const [splashDone, setSplashDone] = useState<boolean>(() => {
    return !!sessionStorage.getItem('splash_shown');
  });

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem('splash_shown', '1');
    setSplashDone(true);
  }, []);

  console.log('📄 AppContent rendering...');
  return (
    <>
      {/* Splash renders as a fixed overlay — app loads in the background during the animation */}
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}

      <SocketProvider>
        <LoadingManager>
          <AppRoutes />
          <InstallPrompt />
        </LoadingManager>
      </SocketProvider>
    </>
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
