import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';
import {
//   Notification,
  GetNotificationsResponse,
  MarkAsReadResponse,
} from './notificationTypes';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    // GET /notification/user/{userId} - Get all notifications for a specific user
    getUserNotifications: builder.query<GetNotificationsResponse, string>({
      query: (userId) => `/notification/user/${userId}`,
      providesTags: ['Notification'],
    }),

    // PATCH /notification/read/{notificationId} - Mark a notification as read
    markNotificationAsRead: builder.mutation<MarkAsReadResponse, string>({
      query: (notificationId) => ({
        url: `/notification/read/${notificationId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationApi;
