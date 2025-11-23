// Service Worker Disabler for Development
// This script unregisters any existing service workers on page load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().then((success) => {
          if (success) {
            console.log('[SW] Service worker unregistered');
          }
        }).catch((error) => {
          console.error('[SW] Error unregistering service worker:', error);
        });
      });
    });
  });
}

// Clear all caches
if ('caches' in window) {
  window.addEventListener('load', () => {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  });
}

