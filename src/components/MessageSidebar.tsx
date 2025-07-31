import React, { useState } from 'react';
import MessageListItem from './MessageListItem';

const messages = [
  {
    avatarUrl: '/public/images/Makinwaa.png',
    name: 'James Mordi',
    subject: 'Makinwaa’s Cottage Inquiry',
    date: 'Jan 20 2025',
    timeAgo: '2 hrs ago',
  },
  // Add more messages as needed
];

const MessageSidebar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="w-80 border-r h-full flex flex-col bg-white">
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
      <div className="overflow-y-auto flex-1">
        {messages.map((msg, idx) => (
          <MessageListItem
            key={idx}
            avatarUrl={msg.avatarUrl}
            name={msg.name}
            subject={msg.subject}
            date={`${msg.date} • ${msg.timeAgo}`}
            selected={selectedIdx === idx}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
