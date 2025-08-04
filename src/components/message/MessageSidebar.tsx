import React, { useState } from 'react';
import MessageItem from './MessageItem';
import { Message } from '@/utils/messagesData.tsx';

interface MessageSidebarProps {
  messages: Message[];
  selectedIdx: number | null;
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
      <div className="overflow-y-auto flex-1">
        {messages.map((msg, idx) => (
          <MessageItem
            key={msg.id || idx}
            avatarUrl={msg.avatarUrl}
            name={msg.name}
            subject={msg.subject}
            date={`${msg.date}`}
            selected={selectedIdx === idx}
            onClick={() => setSelectedIdx(idx)}
            isRecent={idx < 1} // Make the first message appear as recent
          />
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
