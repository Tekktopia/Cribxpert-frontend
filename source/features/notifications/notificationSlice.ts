import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState, Notification } from './notificationTypes';
import { notificationApi } from './notificationService';

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => n.status === "unread").length;
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification && notification.status === "unread") {
        notification.status = "read";
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },

    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (action.payload.status === "unread") {
        state.unreadCount += 1;
      }
    },

    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user notifications matchers
      .addMatcher(
        notificationApi.endpoints.getUserNotifications.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        notificationApi.endpoints.getUserNotifications.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.notifications = payload.notifications;
          state.unreadCount = payload.notifications.filter(
            (n) => !n.status || n.status === 'unread'
          ).length;
          state.error = null;
        }
      )
      .addMatcher(
        notificationApi.endpoints.getUserNotifications.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Failed to fetch notifications';
        }
      )

      // Mark notification as read matchers
      .addMatcher(
        notificationApi.endpoints.markNotificationAsRead.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        notificationApi.endpoints.markNotificationAsRead.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          // Update the notification in the state
          const notification = state.notifications.find(
            (n) => n._id === payload.notification._id
          );
          if (notification && notification.status === "unread") {
            notification.status = "read";
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.error = null;
        }
      )
      .addMatcher(
        notificationApi.endpoints.markNotificationAsRead.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Failed to mark notification as read';
        }
      );
  },
});

export const {
  setNotifications,
  markAsRead,
  addNotification,
  clearNotifications,
  setLoading,
  setError,
  clearError,
} = notificationSlice.actions;

export default notificationSlice.reducer;
