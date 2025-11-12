import React, { useState } from 'react';
import { format } from 'date-fns';
import MessageItem from './MessageItem';
import { Conversation } from '@/features/messages/messageTypes';

interface MessageSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  isMobile?: boolean;
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  isMobile = false,
}) => {
  const [selectedTab, setSelectedTab] = useState('All');

  // Filter conversations based on selected tab
  const filteredConversations =
    selectedTab === 'Unread'
      ? conversations.filter((conv) => (conv.unreadCount || 0) > 0)
      : conversations;

  // Helper to get other user in conversation
  const getOtherUser = (conversation: Conversation) => {
    // Assuming current user is not in the members list or we filter them out
    return conversation.members[0]; // Simplified - you may need to filter current user
  };

  return (
    <div
      className={`${isMobile ? 'w-full' : 'min-w-80'} border-r h-full flex flex-col bg-white`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <circle cx="8" cy="8" r="2" />
              <line x1="4" y1="16" x2="20" y2="16" />
              <circle cx="16" cy="16" r="2" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex space-x-2 px-4 mb-2">
        <button
          className={`px-3 py-1 rounded ${selectedTab === 'All' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setSelectedTab('All')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${selectedTab === 'Unread' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setSelectedTab('Unread')}
        >
          Unread
        </button>
      </div>
      <div className="overflow-y-auto scrollbar-hide flex-1">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <img
              src="/images/NoMessageIllustration.png"
              alt="No messages"
              className="w-32 mb-4"
            />
            <p className="text-gray-500">
              {selectedTab === 'Unread' ? 'No unread messages' : 'No conversations yet'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const otherUser = getOtherUser(conversation);
            const lastMessagePreview = conversation.lastMessage?.body || 'No messages yet';
            const formattedDate = format(new Date(conversation.lastMessageAt), 'MMM dd, yyyy');

            return (
              <MessageItem
                key={conversation._id}
                avatarUrl={otherUser.profilePicture || '/images/Makinwaa.png'}
                name={`${otherUser.firstName} ${otherUser.lastName}`}
                subject={lastMessagePreview}
                date={formattedDate}
                selected={selectedConversationId === conversation._id}
                onClick={() => onSelectConversation(conversation._id)}
                isRecent={(conversation.unreadCount || 0) > 0}
                isMobile={isMobile}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;
