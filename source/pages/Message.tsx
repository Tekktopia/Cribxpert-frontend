import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MessageSidebar from '@/features/messages/components/MessageSidebar';
import ChatWindow from '@/features/messages/components/ChatWindow';
import { useGetConversationsQuery, useGetMessagesQuery } from '@/features/messages';
import { setActiveConversation } from '@/features/messages/messageSlice';
import { useChat } from '@/hooks/useChat';

const Message: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  // Fetch conversations from backend
  const { data: conversations = [], isLoading: loadingConversations } = useGetConversationsQuery();

  // Fetch messages for selected conversation
  const { data: messages = [], isLoading: loadingMessages } = useGetMessagesQuery(
    { conversationId: selectedConversationId! },
    { skip: !selectedConversationId }
  );

  // Get active conversation from Redux (for future use)
  // const activeConversationId = useSelector(
  //   (state: RootState) => state.messages.activeConversationId
  // );

  // Initialize chat hook
  const { sendMessage, sendTypingIndicator, markAsRead, isConnected } = useChat({
    conversationId: selectedConversationId,
  });

  const selectedConversation = conversations.find(
    (conv) => conv._id === selectedConversationId
  );

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    dispatch(setActiveConversation(conversationId));
    setShowChat(true);
  };

  const handleBackToMessages = () => {
    setShowChat(false);
    setSelectedConversationId(null);
    dispatch(setActiveConversation(null));
  };

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (selectedConversationId && messages.length > 0) {
      const unreadMessageIds = messages
        .filter((msg) => msg.readBy.length === 0 && msg.senderId !== 'current-user')
        .map((msg) => msg._id);

      if (unreadMessageIds.length > 0) {
        markAsRead(unreadMessageIds);
      }
    }
  }, [selectedConversationId, messages, markAsRead]);

  if (loadingConversations) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="md:hidden flex sticky top-[50px] h-[calc(100vh-50px)] overflow-hidden">
        {!showChat ? (
          <MessageSidebar
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            isMobile={true}
          />
        ) : (
          <ChatWindow
            conversation={selectedConversation || null}
            messages={messages}
            isLoading={loadingMessages}
            onSendMessage={sendMessage}
            onTyping={sendTypingIndicator}
            onBack={handleBackToMessages}
            isMobile={true}
            isConnected={isConnected}
          />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex sticky top-[50px] h-[calc(100vh-50px)] overflow-hidden px-4 lg:px-8">
        <MessageSidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          isMobile={false}
        />
        <ChatWindow
          conversation={selectedConversation || null}
          messages={messages}
          isLoading={loadingMessages}
          onSendMessage={sendMessage}
          onTyping={sendTypingIndicator}
          isMobile={false}
          isConnected={isConnected}
        />
      </div>
    </div>
  );
};

export default Message;
