import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from '@/shared/context/SocketContext';
import { socketService } from '@/services/socket.service';
import {
  addTypingUser,
  removeTypingUser,
  addOptimisticMessage,
  removeOptimisticMessage,
  incrementUnreadCount,
  clearUnreadCount,
} from '@/features/messages/messageSlice';
import { messageApi } from '@/features/messages/messageService';
import { MessageItem } from '@/features/messages/messageTypes';

interface UseChatOptions {
  conversationId: string | null;
}

export const useChat = ({ conversationId }: UseChatOptions) => {
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Join conversation room when conversationId changes
  useEffect(() => {
    if (!conversationId || !isConnected) return;

    console.log(`Joining conversation: ${conversationId}`);
    socketService.joinConversation(conversationId, (ok) => {
      if (ok) {
        console.log(`✅ Joined conversation: ${conversationId}`);
        // Clear unread count when joining
        dispatch(clearUnreadCount(conversationId));
      }
    });

    return () => {
      console.log(`Leaving conversation: ${conversationId}`);
      socketService.leaveConversation(conversationId);
    };
  }, [conversationId, isConnected, dispatch]);

  // Listen for new messages
  useEffect(() => {
    if (!isConnected) return;

    const handleNewMessage = (data: {
      conversationId: string;
      message: MessageItem;
      tempId?: string;
    }) => {
      console.log('📩 New message received:', data);

      // Remove optimistic message if it exists
      if (data.tempId) {
        dispatch(
          removeOptimisticMessage({
            conversationId: data.conversationId,
            tempId: data.tempId,
          })
        );
      }

      // Update cache with real message
      dispatch(
        messageApi.util.updateQueryData(
          'getMessages',
          { conversationId: data.conversationId },
          (draft) => {
            // Check if message already exists (avoid duplicates)
            const exists = draft.some((msg) => msg._id === data.message._id);
            if (!exists) {
              draft.push(data.message);
            }
          }
        )
      );

      // Invalidate conversations to update last message
      dispatch(messageApi.util.invalidateTags(['Conversation']));

      // Increment unread count if not in active conversation
      if (conversationId !== data.conversationId) {
        dispatch(incrementUnreadCount(data.conversationId));
      }
    };

    socketService.onNewMessage(handleNewMessage);

    return () => {
      socketService.off('message:new', handleNewMessage);
    };
  }, [isConnected, conversationId, dispatch]);

  // Listen for typing indicators
  useEffect(() => {
    if (!isConnected || !conversationId) return;

    const handleTyping = (data: {
      conversationId: string;
      userId: string;
      isTyping: boolean;
    }) => {
      if (data.conversationId !== conversationId) return;

      if (data.isTyping) {
        dispatch(
          addTypingUser({
            conversationId: data.conversationId,
            user: { userId: data.userId, userName: 'User' },
          })
        );

        // Auto-remove after 3 seconds
        setTimeout(() => {
          dispatch(
            removeTypingUser({
              conversationId: data.conversationId,
              userId: data.userId,
            })
          );
        }, 3000);
      } else {
        dispatch(
          removeTypingUser({
            conversationId: data.conversationId,
            userId: data.userId,
          })
        );
      }
    };

    socketService.onTyping(handleTyping);

    return () => {
      socketService.off('typing', handleTyping);
    };
  }, [isConnected, conversationId, dispatch]);

  // Send message function
  const sendMessage = useCallback(
    (body: string, callback?: (success: boolean) => void) => {
      if (!conversationId || !body.trim()) {
        callback?.(false);
        return;
      }

      const tempId = `temp-${Date.now()}`;

      // Add optimistic message
      const optimisticMessage: MessageItem = {
        _id: tempId,
        conversationId,
        senderId: 'current-user',
        body,
        readBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(
        addOptimisticMessage({
          conversationId,
          message: optimisticMessage,
        })
      );

      // Send via Socket.io
      socketService.sendMessage(
        { conversationId, body, tempId },
        (response) => {
          if (!response.ok) {
            console.error('Failed to send message:', response.error);
            // Remove optimistic message on error
            dispatch(
              removeOptimisticMessage({
                conversationId,
                tempId,
              })
            );
            callback?.(false);
          } else {
            callback?.(true);
          }
        }
      );
    },
    [conversationId, dispatch]
  );

  // Send typing indicator
  const sendTypingIndicator = useCallback(
    (typing: boolean) => {
      if (!conversationId) return;

      setIsTyping(typing);

      // Clear previous timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      if (typing) {
        socketService.sendTypingIndicator(conversationId, true);

        // Auto-stop typing after 3 seconds
        const timeout = setTimeout(() => {
          socketService.sendTypingIndicator(conversationId, false);
          setIsTyping(false);
        }, 3000);

        setTypingTimeout(timeout);
      } else {
        socketService.sendTypingIndicator(conversationId, false);
      }
    },
    [conversationId, typingTimeout]
  );

  // Mark messages as read
  const markAsRead = useCallback(
    (messageIds: string[]) => {
      if (!conversationId || messageIds.length === 0) return;

      socketService.markMessagesAsRead(conversationId, messageIds, (response) => {
        if (response.ok) {
          dispatch(clearUnreadCount(conversationId));
        }
      });
    },
    [conversationId, dispatch]
  );

  return {
    sendMessage,
    sendTypingIndicator,
    markAsRead,
    isTyping,
    isConnected,
  };
};

