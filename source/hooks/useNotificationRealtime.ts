import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/lib/supabase';
import { addNotification } from '@/features/notifications/notificationSlice';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { notificationApi } from '@/features/notifications/notificationService';
import { AppDispatch } from '@/store/store';
import { Notification } from '@/features/notifications/notificationTypes';

export function useNotificationRealtime() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser?.id) return;

    const channel = supabase
      .channel(`notifications:${currentUser.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${currentUser.id}`,
        },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          const notification: Notification = {
            _id: row.id as string,
            userId: row.user_id as string,
            title: row.title as string,
            description: (row.description as string) ?? '',
            category: (row.category as Notification['category']) ?? 'general',
            status: 'unread',
            listing: row.listing_id as string | undefined,
            createdAt: row.created_at as string,
            updatedAt: (row.updated_at as string) ?? (row.created_at as string),
            __v: 0,
          };
          // Add to Redux state immediately (instant bell update)
          dispatch(addNotification(notification));
          // Also invalidate RTK Query cache so NotificationPage refreshes
          dispatch(notificationApi.util.invalidateTags(['Notification']));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser?.id, dispatch]);
}
