import React from 'react';
import MessageHeader from './MessageHeader';

interface MessageItemProps {
  avatarUrl: string;
  name: string;
  subject: string;
  date: string;
  selected?: boolean;
  isRecent?: boolean;
  onClick?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  avatarUrl,
  name,
  subject,
  date,
  selected,
  isRecent,
  onClick,
}) => (
  <div
    className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${selected ? 'bg-gray-100' : ''} border-b`}
    onClick={onClick}
  >
    <div className="relative">
      <img
        src={avatarUrl}
        alt={name}
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      {isRecent && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-600 rounded-full border-2 border-white"></div>
      )}
    </div>
    <MessageHeader name={name} subject={subject} date={date} />
  </div>
);

export default MessageItem;
