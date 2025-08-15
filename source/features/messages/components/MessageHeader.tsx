import React from 'react';

interface MessageHeaderProps {
  name: string;
  subject: string;
  date: string;
  isMobile?: boolean;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  name,
  subject,
  date,
  isMobile = false,
}) => (
  <div className="flex flex-col flex-1 min-w-0">
    <div className="flex justify-between items-center w-full">
      <span
        className={`font-semibold leading-tight truncate ${isMobile ? 'text-base' : 'text-sm'}`}
      >
        {name}
      </span>
      <span
        className={`text-xs text-gray-400 leading-tight ml-2 flex-shrink-0 ${isMobile ? 'text-xs' : 'text-xs'}`}
      >
        {date}
      </span>
    </div>
    <span
      className={`text-gray-500 leading-tight mt-1 truncate ${isMobile ? 'text-sm' : 'text-sm'}`}
    >
      {subject}
    </span>
  </div>
);

export default MessageHeader;
