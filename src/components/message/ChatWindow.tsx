import React from 'react';

interface ChatWindowProps {
  selectedChat?: {
    avatarUrl: string;
    name: string;
    subject: string;
    messages: Array<{
      sender: string;
      text: string;
      time: string;
      isMe?: boolean;
    }>;
  } | null;
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
        className="flex-1 px-8 py-6 overflow-y-auto"
        style={{ minHeight: '400px' }}
      >
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-6 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isMe && (
              <img
                src={selectedChat.avatarUrl}
                alt={selectedChat.name}
                className="w-6 h-6 rounded-full mr-2 self-end"
              />
            )}
            <div
              className={`max-w-lg px-5 py-3 rounded-lg text-sm ${msg.isMe ? 'bg-[#96BEC6] text-black' : 'bg-[#E6EFF1] text-black'}`}
            >
              {msg.text}
              <div className="text-xs text-gray-400 mt-2 flex justify-between">
                <span>{msg.sender}</span>
                <span>
                  {msg.time}
                  {msg.isMe ? ' • You' : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
