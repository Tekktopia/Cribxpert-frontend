import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import * as pushService from '@/services/pushNotification.service';

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Check support and subscription status
  useEffect(() => {
    const checkSupport = async () => {
      const supported = pushService.isPushNotificationSupported();
      setIsSupported(supported);

      if (supported) {
        const currentPermission = pushService.getNotificationPermission();
        setPermission(currentPermission);

        if (currentPermission === 'granted') {
          const subscribed = await pushService.isSubscribed();
          setIsSubscribed(subscribed);
        }
      }
    };

    checkSupport();
  }, []);

  // Auto-subscribe when user logs in
  useEffect(() => {
    const autoSubscribe = async () => {
      if (
        isAuthenticated &&
        token &&
        isSupported &&
        permission === 'granted' &&
        !isSubscribed
      ) {
        console.log('Auto-subscribing to push notifications...');
        await subscribe();
      }
    };

    autoSubscribe();
  }, [isAuthenticated, token, isSupported, permission, isSubscribed]);

  const subscribe = useCallback(async () => {
    if (!token) {
      setError('User not authenticated');
      return false;
    }

    if (!isSupported) {
      setError('Push notifications not supported');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const subscription = await pushService.subscribeToPushNotifications(token);

      if (subscription) {
        setIsSubscribed(true);
        setPermission('granted');
        console.log('✅ Successfully subscribed to push notifications');
        return true;
      } else {
        setError('Failed to subscribe to push notifications');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to subscribe';
      setError(errorMessage);
      console.error('Error subscribing:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, isSupported]);

  const unsubscribe = useCallback(async () => {
    if (!token) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const success = await pushService.unsubscribeFromPush(token);

      if (success) {
        setIsSubscribed(false);
        console.log('✅ Successfully unsubscribed from push notifications');
        return true;
      } else {
        setError('Failed to unsubscribe from push notifications');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to unsubscribe';
      setError(errorMessage);
      console.error('Error unsubscribing:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const requestPermission = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newPermission = await pushService.requestNotificationPermission();
      setPermission(newPermission);

      if (newPermission === 'granted') {
        // Auto-subscribe after granting permission
        await subscribe();
        return true;
      } else {
        setError('Notification permission denied');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to request permission';
      setError(errorMessage);
      console.error('Error requesting permission:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [subscribe]);

  return {
    isSupported,
    isSubscribed,
    permission,
    loading,
    error,
    subscribe,
    unsubscribe,
    requestPermission,
  };
};

