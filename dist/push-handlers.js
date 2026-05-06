// Push notification handlers — imported by the Workbox-generated SW via importScripts()
// Do NOT add install/activate/fetch handlers here; those are owned by Workbox.
/* eslint-disable no-restricted-globals */

self.addEventListener('push', (event) => {
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
      console.error('[SW] Error parsing push data:', e);
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

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus().then(() => {
            if ('navigate' in client) return client.navigate(urlToOpen);
          });
        }
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});

self.addEventListener('notificationclose', (_event) => {
  // Notification dismissed — no action needed
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    // Handle background sync for messages
  }
});
