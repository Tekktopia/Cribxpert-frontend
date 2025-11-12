import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5500';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  /**
   * Initialize and connect to Socket.io server
   * @param token - JWT token for authentication
   */
  connect(token: string): Socket {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return this.socket;
    }

    console.log('Connecting to socket server...');

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.setupEventListeners();

    return this.socket;
  }

  /**
   * Setup default event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  /**
   * Disconnect from socket server
   */
  disconnect(): void {
    if (this.socket) {
      console.log('Disconnecting socket...');
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Get current socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Emit an event to the server
   */
  emit(event: string, data?: any, callback?: (response: any) => void): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data, callback);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  }

  /**
   * Listen to an event from the server
   */
  on(event: string, callback: (data: any) => void): void {
    this.socket?.on(event, callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback?: (data: any) => void): void {
    this.socket?.off(event, callback);
  }

  // ==================== MESSAGING METHODS ====================

  /**
   * Join a conversation room
   */
  joinConversation(conversationId: string, callback?: (ok: boolean) => void): void {
    this.emit('conversation:join', { conversationId }, callback);
  }

  /**
   * Leave a conversation room
   */
  leaveConversation(conversationId: string, callback?: (ok: boolean) => void): void {
    this.emit('conversation:leave', { conversationId }, callback);
  }

  /**
   * Send a message
   */
  sendMessage(
    payload: {
      conversationId: string;
      body: string;
      tempId?: string;
    },
    callback?: (response: {
      ok: boolean;
      message?: any;
      error?: string;
      tempId?: string;
    }) => void
  ): void {
    this.emit('message:send', payload, callback);
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(conversationId: string, isTyping: boolean): void {
    this.emit('typing', { conversationId, isTyping });
  }

  /**
   * Mark messages as read
   */
  markMessagesAsRead(
    conversationId: string,
    messageIds: string[],
    callback?: (response: { ok: boolean }) => void
  ): void {
    this.emit('message:read', { conversationId, messageIds }, callback);
  }

  /**
   * Listen for new messages
   */
  onNewMessage(callback: (data: {
    conversationId: string;
    message: any;
    tempId?: string;
  }) => void): void {
    this.on('message:new', callback);
  }

  /**
   * Listen for typing indicators
   */
  onTyping(callback: (data: {
    conversationId: string;
    userId: string;
    isTyping: boolean;
  }) => void): void {
    this.on('typing', callback);
  }

  /**
   * Listen for read receipts
   */
  onMessageRead(callback: (data: {
    conversationId: string;
    messageIds: string[];
    userId: string;
  }) => void): void {
    this.on('message:read', callback);
  }

  // ==================== NOTIFICATION METHODS ====================

  /**
   * Listen for new notifications
   */
  onNewNotification(callback: (notification: any) => void): void {
    this.on('notification:new', callback);
  }

  /**
   * Listen for notification updates
   */
  onNotificationUpdate(callback: (notification: any) => void): void {
    this.on('notification:update', callback);
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;

