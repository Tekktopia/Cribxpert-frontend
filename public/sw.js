// Service Worker for Push Notifications
/* eslint-disable no-restricted-globals */

// Service Worker version - increment this to force update
const CACHE_VERSION = 'v1';
const CACHE_NAME = `cribxpert-cache-${CACHE_VERSION}`;

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...', event);
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...', event);
  event.waitUntil(self.clients.claim());
});

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received:', event);

  let data = {
    title: 'New Notification',
    body: 'You have a new notification',
    icon: '/CribXpert.svg',
    badge: '/CribXpert.svg',
    data: {},
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/CribXpert.svg',
    badge: data.badge || '/CribXpert.svg',
    image: data.image,
    vibrate: [200, 100, 200],
    tag: data.tag || 'notification',
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event);

  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          // Focus existing window and navigate to URL
          return client.focus().then(() => {
            if ('navigate' in client) {
              return client.navigate(urlToOpen);
            }
          });
        }
      }
      // No window open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Notification close event
self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification closed:', event);
});

// Background sync (optional - for offline support)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event);
  if (event.tag === 'sync-messages') {
    // Handle background sync
  }
});

// Fetch event (optional - for caching)
self.addEventListener('fetch', (event) => {
  // You can add caching strategy here if needed
  // For now, just pass through to network
  event.respondWith(fetch(event.request));
});

