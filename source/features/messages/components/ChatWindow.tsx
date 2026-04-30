import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Conversation, MessageItem } from '@/features/messages/messageTypes';
import { RootState } from '@/store/store';

interface ChatWindowProps {
  conversation?: Conversation | null;
  messages: MessageItem[];
  isLoading?: boolean;
  onSendMessage: (body: string, callback?: (success: boolean) => void) => void;
  onTyping: (isTyping: boolean) => void;
  onBack?: () => void;
  isMobile?: boolean;
  isConnected?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messages,
  isLoading,
  onSendMessage,
  onTyping,
  onBack,
  isMobile = false,
  isConnected = false,
}) => {
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get current user ID from auth
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  // Get typing users for this conversation
  const typingUsers = useSelector((state: RootState) => {
    const messageState = state.messages as any;
    return conversation ? messageState.typingUsers?.[conversation._id] || [] : [];
  });

  // Get optimistic messages
  const optimisticMessages = useSelector((state: RootState) => {
    const messageState = state.messages as any;
    return conversation ? messageState.optimisticMessages?.[conversation._id] || [] : [];
  });

  // Combine real and optimistic messages
  const allMessages = [...messages, ...optimisticMessages];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  // Get other user info
  const otherUser = conversation?.members.find(member => member._id !== currentUserId) || conversation?.members[0];

  const handleSendMessage = () => {
    if (!messageText.trim() || sending) return;

    setSending(true);
    onSendMessage(messageText, (success) => {
      if (success) {
        setMessageText('');
        onTyping(false);
      }
      setSending(false);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);

    // Send typing indicator
    onTyping(true);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <img
            src="/images/NoMessageIllustration.png"
            alt="No messages"
            className={`${isMobile ? 'w-48' : 'w-60'} mb-6 mx-auto`}
          />
          <span className="text-gray-500 bg-gray-100 px-6 py-3 rounded-lg">
            Select a chat to start messaging
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header */}
      <div className={`flex items-center gap-3 border-b ${isMobile ? 'p-3' : 'p-4'}`}>
        {isMobile && onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to messages"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <img
          src={otherUser?.profilePicture || '/images/Makinwaa.png'}
          alt={otherUser?.firstName || 'User'}
          className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} rounded-full object-cover`}
        />
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-gray-900 truncate ${isMobile ? 'text-lg' : 'text-lg'}`}>
            {otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'User'}
          </div>
          <div className={`text-gray-500 truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {isConnected ? (
              typingUsers.length > 0 ? (
                <span className="text-teal-600">Typing...</span>
              ) : (
                'Online'
              )
            ) : (
              'Offline'
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto bg-white ${isMobile ? 'px-3 py-4' : 'px-4 py-6'}`}
        style={{ minHeight: '400px' }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        ) : allMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {allMessages.map((msg) => {
              const isMe = msg.senderId === currentUserId;
              const messageTime = format(new Date(msg.createdAt), 'HH:mm');
              const isOptimistic = msg._id.startsWith('temp-');

              return (
                <div
                  key={msg._id}
                  className={`flex mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-500">
                          {otherUser?.firstName} - {messageTime}
                        </span>
                      </div>
                      <div
                        className={`bg-[#E8F1F3] text-gray-800 rounded-lg ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                      >
                        {msg.body}
                      </div>
                    </div>
                  )}
                  {isMe && (
                    <div className="flex flex-col items-end max-w-[85%]">
                      <div
                        className={`bg-[#ACD3DC] text-gray-800 rounded-lg ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} ${isOptimistic ? 'opacity-60' : ''}`}
                      >
                        {msg.body}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {messageTime} - You {isOptimistic && '(sending...)'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className={`border-t ${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={messageText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={!isConnected || sending}
            className={`w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100 ${isMobile ? 'px-3 py-3 pr-12 text-sm' : 'px-4 py-3 pr-12'}`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim() || !isConnected || sending}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${isMobile ? 'p-2' : 'p-2'}`}
            aria-label="Send message"
          >
            {sending ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
        {!isConnected && (
          <p className="text-xs text-red-500 mt-2">Reconnecting to server...</p>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
