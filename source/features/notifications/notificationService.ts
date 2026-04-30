import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { GetNotificationsResponse, MarkAsReadResponse, Notification } from './notificationTypes';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Notification'],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getUserNotifications: builder.query<GetNotificationsResponse, string>({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        const notifications: Notification[] = (data ?? []).map((n) => ({
          _id: n.id,
          userId: n.user_id,
          title: n.title,
          description: n.description ?? n.message ?? '',
          category: n.category ?? 'general',
          status: n.is_read ? 'read' : 'unread',
          listing: n.listing_id ?? undefined,
          createdAt: n.created_at,
          updatedAt: n.updated_at ?? n.created_at,
          __v: 0,
        }));
        return { data: { notifications } };
      },
      providesTags: ['Notification'],
    }),

    markNotificationAsRead: builder.mutation<MarkAsReadResponse, string>({
      queryFn: async (notificationId) => {
        const { data, error } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', notificationId)
          .select('*')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        const notification: Notification = {
          _id: data.id,
          userId: data.user_id,
          title: data.title,
          description: data.description ?? data.message ?? '',
          category: data.category ?? 'general',
          status: 'read',
          listing: data.listing_id ?? undefined,
          createdAt: data.created_at,
          updatedAt: data.updated_at ?? data.created_at,
          __v: 0,
        };
        return { data: { message: 'Notification marked as read', notification } };
      },
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationApi;
