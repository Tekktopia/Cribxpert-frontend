import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { startAuthListener } from '@/lib/authListener';

// Start Supabase → Redux session bridge immediately (before first render)
startAuthListener(store);
import { initializeListings } from '@/features/properties/listingInitializer';
import ErrorBoundary from './shared/components/ErrorBoundary';

// Log when main.tsx loads
console.log('🚀 Main.tsx loaded, initializing app...');

// Unregister all service workers in development to prevent caching issues
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then((success) => {
        if (success) {
          console.log('✅ Service worker unregistered successfully');
        }
      });
    }
  });
  
  // Also clear service worker cache
  if ('caches' in window) {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('🗑️ Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('✅ All caches cleared');
    });
  }
}

// Initialize listings when the application starts (wrap in try-catch to prevent blocking)
try {
  initializeListings();
  console.log('✅ Listings initialization started');
} catch (error) {
  console.error('❌ Error initializing listings:', error);
}

// Ensure root element exists before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has <div id="root"></div>');
}

console.log('📦 Rendering React app...');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('✅ React app rendered');
