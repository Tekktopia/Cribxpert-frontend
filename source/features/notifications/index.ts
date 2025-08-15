// Export all notification-related functionality from a single file

import notificationReducer, {
  setNotifications,
  markAsRead,
  addNotification,
  clearNotifications,
  setLoading,
  setError,
  clearError,
} from './notificationSlice';

import {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
  notificationApi,
} from './notificationService';

import type {
  Notification,
  NotificationState,
  NotificationComponentProps,
  GetNotificationsResponse,
  MarkAsReadResponse,
} from './notificationTypes';

// Re-export everything
export {
  // Reducer
  notificationReducer,

  // Actions
  setNotifications,
  markAsRead,
  addNotification,
  clearNotifications,
  setLoading,
  setError,
  clearError,

  // API hooks
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,

  // API slice
  notificationApi,

  // Types
  type Notification,
  type NotificationState,
  type NotificationComponentProps,
  type GetNotificationsResponse,
  type MarkAsReadResponse,
};

export default notificationReducer;
