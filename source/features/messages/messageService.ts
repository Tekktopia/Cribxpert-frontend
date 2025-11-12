import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';
import {
  Conversation,
  MessageItem,
  GetConversationsResponse,
  GetMessagesResponse,
  CreateConversationRequest,
  CreateConversationResponse,
  SendMessageRequest,
  SendMessageResponse,
  GetMessagesRequest,
} from './messageTypes';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery,
  tagTypes: ['Conversation', 'Message'],
  endpoints: (builder) => ({
    // GET /message/conversations - Get all conversations for current user
    getConversations: builder.query<Conversation[], void>({
      query: () => '/message/conversations',
      transformResponse: (response: GetConversationsResponse) => response.conversations,
      providesTags: ['Conversation'],
    }),

    // POST /message/conversations - Create or get existing conversation
    createConversation: builder.mutation<Conversation, CreateConversationRequest>({
      query: (data) => ({
        url: '/message/conversations',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: CreateConversationResponse) => response.conversation,
      invalidatesTags: ['Conversation'],
    }),

    // GET /message/history/:conversationId - Get message history
    getMessages: builder.query<MessageItem[], GetMessagesRequest>({
      query: ({ conversationId, limit = 50, before }) => ({
        url: `/message/history/${conversationId}`,
        params: { limit, before },
      }),
      transformResponse: (response: GetMessagesResponse) => response.messages,
      providesTags: (_result, _error, arg) => [
        { type: 'Message', id: arg.conversationId },
      ],
    }),

    // POST /message/send - Send a message (REST fallback, prefer Socket.io)
    sendMessage: builder.mutation<MessageItem, SendMessageRequest>({
      query: (data) => ({
        url: '/message/send',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: SendMessageResponse) => response.message,
      // Optimistically update cache
      async onQueryStarted({ conversationId, body }, { dispatch, queryFulfilled }) {
        const tempMessage: MessageItem = {
          _id: `temp-${Date.now()}`,
          conversationId,
          senderId: 'current-user', // Will be replaced
          body,
          readBy: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Optimistically add message to cache
        const patchResult = dispatch(
          messageApi.util.updateQueryData(
            'getMessages',
            { conversationId },
            (draft) => {
              draft.push(tempMessage);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (_error) {
          // Rollback on error
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Message', id: arg.conversationId },
        'Conversation',
      ],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = messageApi;

