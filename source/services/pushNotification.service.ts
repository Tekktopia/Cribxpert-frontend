// Push Notification Service
import { supabase } from '@/lib/supabase';

const PUSH_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/push`;
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

/**
 * Convert VAPID public key to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Check if push notifications are supported
 */
export function isPushNotificationSupported(): boolean {
  return (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * Check current notification permission
 */
export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  console.log('Notification permission:', permission);
  return permission;
}

/**
 * Register service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    console.log('✅ Service Worker registered:', registration);

    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('✅ Service Worker ready');

    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Get VAPID public key — from env var first, then Edge Function fallback
 */
async function getVapidPublicKey(): Promise<string | null> {
  if (VAPID_PUBLIC_KEY) return VAPID_PUBLIC_KEY;
  try {
    const response = await fetch(`${PUSH_BASE}/vapid-public-key`);
    const data = await response.json();
    return data.publicKey ?? null;
  } catch (error) {
    console.error('Error fetching VAPID public key:', error);
    return null;
  }
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications(
  token: string
): Promise<PushSubscription | null> {
  try {
    // Check support
    if (!isPushNotificationSupported()) {
      console.warn('Push notifications not supported');
      return null;
    }

    // Request permission
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    // Register service worker
    const registration = await registerServiceWorker();
    if (!registration) {
      console.error('Failed to register service worker');
      return null;
    }

    // Get VAPID public key
    const vapidPublicKey = await getVapidPublicKey();
    if (!vapidPublicKey) {
      console.error('Failed to get VAPID public key');
      return null;
    }

    // Subscribe to push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    console.log('✅ Push subscription created:', subscription);

    // Save subscription — try Edge Function first, fall back to Supabase table
    const subJson = subscription.toJSON();
    try {
      const res = await fetch(`${PUSH_BASE}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(subJson),
      });
      if (!res.ok) throw new Error(`Edge Function returned ${res.status}`);
    } catch {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('push_subscriptions').upsert({
          user_id: user.id,
          endpoint: subJson.endpoint,
          p256dh: (subJson.keys as Record<string, string>)?.p256dh ?? '',
          auth: (subJson.keys as Record<string, string>)?.auth ?? '',
        }, { onConflict: 'endpoint' });
      }
    }

    console.log('✅ Subscription saved');

    return subscription;
  } catch (error) {
    console.error('❌ Error subscribing to push notifications:', error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPush(token: string): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      console.log('No active subscription found');
      return true;
    }

    // Unsubscribe from push manager
    const successful = await subscription.unsubscribe();

    if (successful) {
      try {
        await fetch(`${PUSH_BASE}/unsubscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
      } catch {
        await supabase.from('push_subscriptions').delete().eq('endpoint', subscription.endpoint);
      }

      console.log('✅ Unsubscribed from push notifications');
    }

    return successful;
  } catch (error) {
    console.error('❌ Error unsubscribing from push:', error);
    return false;
  }
}

/**
 * Get current push subscription
 */
export async function getCurrentSubscription(): Promise<PushSubscription | null> {
  try {
    if (!('serviceWorker' in navigator)) {
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    return subscription;
  } catch (error) {
    console.error('Error getting current subscription:', error);
    return null;
  }
}

/**
 * Check if user is currently subscribed
 */
export async function isSubscribed(): Promise<boolean> {
  const subscription = await getCurrentSubscription();
  return subscription !== null;
}

