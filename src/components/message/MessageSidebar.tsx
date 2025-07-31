import React, { useState } from 'react';
import MessageListItem from './MessageListItem';

interface Message {
  id: string;
  avatarUrl: string;
  name: string;
  subject: string;
  date: string;
  messages: Array<{
    sender: string;
    text: string;
    time: string;
    isMe?: boolean;
  }>;
}

interface MessageSidebarProps {
  messages: Message[];
  selectedIdx: number;
  setSelectedIdx: (idx: number) => void;
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({
  messages,
  selectedIdx,
  setSelectedIdx,
}) => {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <div className="min-w-80 border-r h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        <button className="p-2">
          {/* Search icon */}
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>
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
      <div className="overflow-y-scroll max-h-screen flex-1">
        {messages.map((msg, idx) => (
          <MessageListItem
            key={msg.id || idx}
            avatarUrl={msg.avatarUrl}
            name={msg.name}
            subject={msg.subject}
            date={`${msg.date}`}
            selected={selectedIdx === idx}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
