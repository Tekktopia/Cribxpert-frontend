import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import {
  Conversation,
  MessageItem,
  CreateConversationRequest,
  SendMessageRequest,
  GetMessagesRequest,
} from './messageTypes';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Conversation', 'Message'],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      queryFn: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { data: [] };
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            id, created_at, updated_at, last_message_at,
            members:conversation_members(
              user:profiles!user_id(id, full_name, email, profile_image)
            ),
            lastMessage:messages(id, body, sender_id, created_at)
          `)
          .order('last_message_at', { ascending: false });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };

        const conversations: Conversation[] = (data ?? []).map((c) => {
          const members = ((c.members as Array<{ user: Record<string, string> }>) ?? [])
            .map((m) => m.user)
            .filter(Boolean)
            .map((u) => ({
              _id: u.id,
              firstName: (u.full_name ?? '').split(' ')[0] ?? '',
              lastName: (u.full_name ?? '').split(' ').slice(1).join(' ') ?? '',
              email: u.email ?? '',
              profilePicture: u.profile_image ?? undefined,
            }));
          const msgs = (c.lastMessage as Array<Record<string, string>> | null) ?? [];
          const last = msgs.sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )[0];
          return {
            _id: c.id,
            members,
            lastMessageAt: c.last_message_at ?? c.updated_at ?? c.created_at,
            createdAt: c.created_at,
            updatedAt: c.updated_at,
            lastMessage: last
              ? {
                  _id: last.id,
                  conversationId: c.id,
                  senderId: last.sender_id,
                  body: last.body,
                  readBy: [],
                  createdAt: last.created_at,
                  updatedAt: last.created_at,
                }
              : undefined,
          };
        });
        return { data: conversations };
      },
      providesTags: ['Conversation'],
    }),

    createConversation: builder.mutation<Conversation, CreateConversationRequest>({
      queryFn: async ({ otherUserId }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: { status: 'CUSTOM_ERROR', error: 'Not authenticated' } };

        // Check if conversation already exists
        const { data: existing } = await supabase
          .from('conversation_members')
          .select('conversation_id')
          .eq('user_id', user.id);

        if (existing && existing.length > 0) {
          const myConversationIds = existing.map((e) => e.conversation_id);
          const { data: match } = await supabase
            .from('conversation_members')
            .select('conversation_id')
            .eq('user_id', otherUserId)
            .in('conversation_id', myConversationIds);
          if (match && match.length > 0) {
            const convId = match[0].conversation_id;
            const { data: conv, error: convErr } = await supabase
              .from('conversations')
              .select(`id, created_at, updated_at, last_message_at,
                members:conversation_members(user:profiles!user_id(id, full_name, email, profile_image))`)
              .eq('id', convId)
              .single();
            if (!convErr && conv) {
              const members = ((conv.members as Array<{ user: Record<string, string> }>) ?? [])
                .map((m) => m.user).filter(Boolean)
                .map((u) => ({
                  _id: u.id,
                  firstName: (u.full_name ?? '').split(' ')[0] ?? '',
                  lastName: (u.full_name ?? '').split(' ').slice(1).join(' ') ?? '',
                  email: u.email ?? '',
                  profilePicture: u.profile_image ?? undefined,
                }));
              return {
                data: {
                  _id: conv.id, members,
                  lastMessageAt: conv.last_message_at ?? conv.updated_at ?? conv.created_at,
                  createdAt: conv.created_at, updatedAt: conv.updated_at,
                },
              };
            }
          }
        }

        // Create new conversation
        const { data: newConv, error: createErr } = await supabase
          .from('conversations')
          .insert({})
          .select('id')
          .single();
        if (createErr) return { error: { status: 'CUSTOM_ERROR', error: createErr.message } };

        await supabase.from('conversation_members').insert([
          { conversation_id: newConv.id, user_id: user.id },
          { conversation_id: newConv.id, user_id: otherUserId },
        ]);

        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, email, profile_image')
          .in('id', [user.id, otherUserId]);

        const members = (profiles ?? []).map((u) => ({
          _id: u.id,
          firstName: (u.full_name ?? '').split(' ')[0] ?? '',
          lastName: (u.full_name ?? '').split(' ').slice(1).join(' ') ?? '',
          email: u.email ?? '',
          profilePicture: u.profile_image ?? undefined,
        }));

        return {
          data: {
            _id: newConv.id,
            members,
            lastMessageAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };
      },
      invalidatesTags: ['Conversation'],
    }),

    getMessages: builder.query<MessageItem[], GetMessagesRequest>({
      queryFn: async ({ conversationId, limit = 50, before }) => {
        let query = supabase
          .from('messages')
          .select('id, conversation_id, sender_id, body, created_at, updated_at')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: false })
          .limit(limit);
        if (before) query = query.lt('created_at', before);
        const { data, error } = await query;
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        const messages: MessageItem[] = (data ?? []).reverse().map((m) => ({
          _id: m.id,
          conversationId: m.conversation_id,
          senderId: m.sender_id,
          body: m.body,
          readBy: [],
          createdAt: m.created_at,
          updatedAt: m.updated_at ?? m.created_at,
        }));
        return { data: messages };
      },
      providesTags: (_result, _error, arg) => [{ type: 'Message', id: arg.conversationId }],
    }),

    sendMessage: builder.mutation<MessageItem, SendMessageRequest>({
      queryFn: async ({ conversationId, body }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: { status: 'CUSTOM_ERROR', error: 'Not authenticated' } };
        const { data, error } = await supabase
          .from('messages')
          .insert({ conversation_id: conversationId, sender_id: user.id, body })
          .select('*')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };

        // Update last_message_at on conversation
        await supabase
          .from('conversations')
          .update({ last_message_at: data.created_at })
          .eq('id', conversationId);

        return {
          data: {
            _id: data.id,
            conversationId: data.conversation_id,
            senderId: data.sender_id,
            body: data.body,
            readBy: [],
            createdAt: data.created_at,
            updatedAt: data.updated_at ?? data.created_at,
          },
        };
      },
      async onQueryStarted({ conversationId, body }, { dispatch, queryFulfilled }) {
        const tempMessage: MessageItem = {
          _id: `temp-${Date.now()}`,
          conversationId,
          senderId: 'current-user',
          body,
          readBy: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const patchResult = dispatch(
          messageApi.util.updateQueryData('getMessages', { conversationId }, (draft) => {
            draft.push(tempMessage);
          })
        );
        try {
          await queryFulfilled;
        } catch {
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
