import React from 'react';
import { Message } from '@/utils/messagesData.tsx';

interface ChatWindowProps {
  selectedChat?: Message | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <span className="text-gray-500 bg-gray-100 px-6 py-3 rounded-lg">
          Select a chat to start messaging
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex items-center gap-3 border-b p-4">
        <img
          src={selectedChat.avatarUrl}
          alt={selectedChat.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-lg text-gray-900">
            {selectedChat.name}
          </div>
          <div className="text-sm text-gray-500">{selectedChat.subject}</div>
        </div>
      </div>
      <div
        className="flex-1 px-4 py-6 overflow-y-auto bg-white"
        style={{ minHeight: '400px' }}
      >
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-6 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isMe && (
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500">
                    {msg.sender} - {msg.time}
                  </span>
                </div>
                <div className="bg-[#E8F1F3] text-gray-800 px-4 py-3 rounded-lg max-w-md">
                  {msg.text}
                </div>
              </div>
            )}
            {msg.isMe && (
              <div className="flex flex-col items-end">
                <div className="bg-[#ACD3DC] text-gray-800 px-4 py-3 rounded-lg max-w-md">
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
      <div className="border-t p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
