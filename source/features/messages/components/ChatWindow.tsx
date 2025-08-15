import React from 'react';
import { Message } from '@/utils/messagesData.tsx';

interface ChatWindowProps {
  selectedChat?: Message | null;
  selectedTab?: string;
  hasUnread?: boolean;
  onBack?: () => void;
  isMobile?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  selectedTab,
  hasUnread,
  onBack,
  isMobile = false,
}) => {
  // Show empty state if Unread tab is selected and no unread messages
  if (selectedTab === 'Unread' && !hasUnread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
        <img
          src="/images/No-Notification.png"
          alt="No Unread"
          className={`${isMobile ? 'w-48' : 'w-60'} mb-6`}
        />
        <h2
          className={`font-semibold mb-2 text-center ${isMobile ? 'text-xl' : 'text-2xl'}`}
        >
          No Unread Messages yet!
        </h2>
        <p
          className={`text-gray-500 mb-4 text-center ${isMobile ? 'text-sm' : 'text-base'}`}
        >
          Clear Filter To View Unread Messages
        </p>
        <button
          className={`rounded bg-gray-100 border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-200 transition ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'}`}
          onClick={() => window.location.reload()} // You may want to lift state up and clear filter instead
        >
          Clear filters
        </button>
      </div>
    );
  }

  if (!selectedChat) {
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
      <div
        className={`flex items-center gap-3 border-b ${isMobile ? 'p-3' : 'p-4'}`}
      >
        {/* Back button for mobile */}
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
          src={selectedChat.avatarUrl}
          alt={selectedChat.name}
          className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} rounded-full object-cover`}
        />
        <div className="flex-1 min-w-0">
          <div
            className={`font-semibold text-gray-900 truncate ${isMobile ? 'text-lg' : 'text-lg'}`}
          >
            {selectedChat.name}
          </div>
          <div
            className={`text-gray-500 truncate ${isMobile ? 'text-sm' : 'text-sm'}`}
          >
            {selectedChat.subject}
          </div>
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-auto bg-white ${isMobile ? 'px-3 py-4' : 'px-4 py-6'}`}
        style={{ minHeight: '400px' }}
      >
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-4 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isMe && (
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500">
                    {msg.sender} - {msg.time}
                  </span>
                </div>
                <div
                  className={`bg-[#E8F1F3] text-gray-800 rounded-lg ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                >
                  {msg.text}
                </div>
              </div>
            )}
            {msg.isMe && (
              <div className="flex flex-col items-end max-w-[85%]">
                <div
                  className={`bg-[#ACD3DC] text-gray-800 rounded-lg ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {msg.time} - {msg.isMe ? 'You' : msg.sender}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`border-t ${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Type a message..."
            className={`w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 ${isMobile ? 'px-3 py-3 text-sm' : 'px-4 py-3'}`}
          />
          {isMobile && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
              aria-label="Send message"
            >
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
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatWindow;
