// Notification type definitions
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type:
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'booking'
    | 'payment'
    | 'review';
  category?: 'booking' | 'payment' | 'review' | 'general';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API response types
export interface GetNotificationsResponse {
  message: string;
  notifications: Notification[];
}

export interface MarkAsReadResponse {
  message: string;
  notification: Notification;
}

// Notification state interface
export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

// Props for notification components
export interface NotificationComponentProps {
  notifications: Notification[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  onMarkAsRead: (notificationId: string) => void;
}
