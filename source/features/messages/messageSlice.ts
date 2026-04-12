import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageItem } from './messageTypes';

interface TypingUser {
  userId: string;
  userName: string;
}

interface MessageState {
  activeConversationId: string | null;
  typingUsers: Record<string, TypingUser[]>; // conversationId -> typing users
  optimisticMessages: Record<string, MessageItem[]>; // conversationId -> messages
  unreadCounts: Record<string, number>; // conversationId -> count
}

const initialState: MessageState = {
  activeConversationId: null,
  typingUsers: {},
  optimisticMessages: {},
  unreadCounts: {},
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
    },

    addTypingUser: (
      state,
      action: PayloadAction<{ conversationId: string; user: TypingUser }>
    ) => {
      const { conversationId, user } = action.payload;
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = [];
      }
      const exists = state.typingUsers[conversationId].some(
        (u) => u.userId === user.userId
      );
      if (!exists) {
        state.typingUsers[conversationId].push(user);
      }
    },

    removeTypingUser: (
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>
    ) => {
      const { conversationId, userId } = action.payload;
      if (state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = state.typingUsers[
          conversationId
        ].filter((u) => u.userId !== userId);
      }
    },

    addOptimisticMessage: (
      state,
      action: PayloadAction<{ conversationId: string; message: MessageItem }>
    ) => {
      const { conversationId, message } = action.payload;
      if (!state.optimisticMessages[conversationId]) {
        state.optimisticMessages[conversationId] = [];
      }
      state.optimisticMessages[conversationId].push(message);
    },

    removeOptimisticMessage: (
      state,
      action: PayloadAction<{ conversationId: string; tempId: string }>
    ) => {
      const { conversationId, tempId } = action.payload;
      if (state.optimisticMessages[conversationId]) {
        state.optimisticMessages[conversationId] = state.optimisticMessages[
          conversationId
        ].filter((msg) => msg._id !== tempId);
      }
    },

    clearOptimisticMessages: (state, action: PayloadAction<string>) => {
      delete state.optimisticMessages[action.payload];
    },

    setUnreadCount: (
      state,
      action: PayloadAction<{ conversationId: string; count: number }>
    ) => {
      const { conversationId, count } = action.payload;
      state.unreadCounts[conversationId] = count;
    },

    incrementUnreadCount: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      state.unreadCounts[conversationId] =
        (state.unreadCounts[conversationId] || 0) + 1;
    },

    clearUnreadCount: (state, action: PayloadAction<string>) => {
      state.unreadCounts[action.payload] = 0;
    },

    resetMessageState: () => initialState,
  },
});

export const {
  setActiveConversation,
  addTypingUser,
  removeTypingUser,
  addOptimisticMessage,
  removeOptimisticMessage,
  clearOptimisticMessages,
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  resetMessageState,
} = messageSlice.actions;

export default messageSlice.reducer;

