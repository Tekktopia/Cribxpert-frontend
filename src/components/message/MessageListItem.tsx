import React from 'react';
import MessageHeader from './MessageHeader';

interface MessageListItemProps {
  avatarUrl: string;
  name: string;
  subject: string;
  date: string;
  selected?: boolean;
  onClick?: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  avatarUrl,
  name,
  subject,
  date,
  selected,
  onClick,
}) => (
  <div
    className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${selected ? 'bg-gray-100' : ''}`}
    onClick={onClick}
  >
    <img
      src={avatarUrl}
      alt={name}
      className="w-10 h-10 rounded-full mr-3 object-cover"
    />
    <MessageHeader name={name} subject={subject} date={date} />
  </div>
);

export default MessageListItem;
