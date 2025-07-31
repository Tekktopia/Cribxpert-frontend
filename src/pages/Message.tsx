import React, { useState } from 'react';
import MessageSidebar from '../components/message/MessageSidebar';
import ChatWindow from '../components/message/ChatWindow';
import messages from '@/utils/messagesData';

const Message: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 lg:px-8">
      <div className="flex sticky top-[50px] h-[calc(100vh-50px)] overflow-hidden">
        <MessageSidebar
          messages={messages}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <ChatWindow selectedChat={messages[selectedIdx]} />
      </div>
    </div>
  );
};

export default Message;
