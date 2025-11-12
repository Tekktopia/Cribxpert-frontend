import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { socketService } from '@/services/socket.service';
import { subscribeToPushNotifications } from '@/services/pushNotification.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  reconnect: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  reconnect: () => {},
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Get auth token from Redux store
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const connectSocket = useCallback(() => {
    if (!token || !isAuthenticated) {
      console.log('No token or not authenticated, skipping socket connection');
      return;
    }

    try {
      const socketInstance = socketService.connect(token);
      setSocket(socketInstance);

      // Listen to connection status
      socketInstance.on('connect', () => {
        console.log('Socket connected in context');
        setIsConnected(true);
      });

      socketInstance.on('disconnect', () => {
        console.log('Socket disconnected in context');
        setIsConnected(false);
      });
    } catch (error) {
      console.error('Failed to connect socket:', error);
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && token) {
      connectSocket();

      // Subscribe to push notifications in background
      subscribeToPushNotifications(token)
        .then((subscription) => {
          if (subscription) {
            console.log('✅ Push notifications enabled');
          }
        })
        .catch((error) => {
          console.log('Push notifications not enabled:', error);
          // Don't show error to user - push notifications are optional
        });
    }

    // Cleanup on unmount or when user logs out
    return () => {
      if (!isAuthenticated) {
        socketService.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [isAuthenticated, token, connectSocket]);

  const reconnect = useCallback(() => {
    socketService.disconnect();
    connectSocket();
  }, [connectSocket]);

  const value: SocketContextType = {
    socket,
    isConnected,
    reconnect,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

