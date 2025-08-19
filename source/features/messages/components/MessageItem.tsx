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
  isMobile?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  avatarUrl,
  name,
  subject,
  date,
  selected,
  isRecent,
  onClick,
  isMobile = false,
}) => (
  <div
    className={`flex items-center ${isMobile ? 'p-3' : 'p-4'} cursor-pointer hover:bg-gray-100 active:bg-gray-200 ${selected ? 'bg-gray-100' : ''} border-b transition-colors duration-150`}
    onClick={onClick}
  >
    <div className="relative">
      <img
        src={avatarUrl}
        alt={name}
        className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} rounded-full mr-3 object-cover`}
      />
      {isRecent && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-600 rounded-full border-2 border-white"></div>
      )}
    </div>
    <MessageHeader
      name={name}
      subject={subject}
      date={date}
      isMobile={isMobile}
    />
  </div>
);

export default MessageItem;
