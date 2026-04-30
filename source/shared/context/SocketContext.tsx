import React, { createContext, useContext, useEffect } from 'react';
import { subscribeToPushNotifications } from '@/services/pushNotification.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface SocketContextType {
  socket: null;
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
  const token = useSelector((state: RootState) => state.auth.session?.access_token ?? null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    subscribeToPushNotifications(token)
      .then((subscription) => {
        if (subscription) console.log('✅ Push notifications enabled');
      })
      .catch((error) => {
        console.log('Push notifications not enabled:', error);
      });
  }, [isAuthenticated, token]);

  const value: SocketContextType = {
    socket: null,
    isConnected: false,
    reconnect: () => {},
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

