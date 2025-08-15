import React, { useState } from 'react';
import MessageSidebar from '@/features/messages/components/MessageSidebar';
import ChatWindow from '@/features/messages/components/ChatWindow';
import messages from '@/utils/messagesData';

const Message: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const selectedChat = selectedIdx !== null ? messages[selectedIdx] : null;
  return (
    <div className="flex flex-col min-h-screen bg-white px-4 lg:px-8">
      <div className="flex sticky top-[50px] h-[calc(100vh-50px)] overflow-hidden">
        <MessageSidebar
          messages={messages}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Message;
