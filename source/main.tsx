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

// In development: unregister all service workers and clear caches to prevent stale-cache issues
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then((success) => {
        if (success) {
          console.log('✅ Service worker unregistered successfully');
        }
      });
    }
  });

  if ('caches' in window) {
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          console.log('🗑️ Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      )
    ).then(() => {
      console.log('✅ All caches cleared');
    });
  }
}

// In production: register the service worker (injectRegister is null so we do it manually)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
      console.error('❌ Service worker registration failed:', err);
    });
  });
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
