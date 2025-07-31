import React from 'react';

interface MessageHeaderProps {
  name: string;
  subject: string;
  date: string;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  name,
  subject,
  date,
}) => (
  <div className="flex flex-col">
    <span className="font-semibold leading-tight">{name}</span>
    <span className="text-sm text-gray-500 leading-tight">{subject}</span>
    <span className="text-xs text-gray-400 leading-tight">{date}</span>
  </div>
);

export default MessageHeader;
