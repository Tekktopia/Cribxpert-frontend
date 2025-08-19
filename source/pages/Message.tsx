import React, { useState } from 'react';
import MessageSidebar from '@/features/messages/components/MessageSidebar';
import ChatWindow from '@/features/messages/components/ChatWindow';
import messages from '@/utils/messagesData';

const Message: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);

  const selectedChat = selectedIdx !== null ? messages[selectedIdx] : null;

  const handleSelectMessage = (idx: number) => {
    setSelectedIdx(idx);
    setShowChat(true);
  };

  const handleBackToMessages = () => {
    setShowChat(false);
    setSelectedIdx(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="md:hidden flex sticky top-[50px] h-[calc(100vh-50px)] overflow-hidden">
        {!showChat ? (
          <MessageSidebar
            messages={messages}
            selectedIdx={selectedIdx}
            setSelectedIdx={handleSelectMessage}
            isMobile={true}
          />
        ) : (
          <ChatWindow
            selectedChat={selectedChat}
            onBack={handleBackToMessages}
            isMobile={true}
          />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex sticky top-[50px] h-[calc(100vh-50px)] overflow-hidden px-4 lg:px-8">
        <MessageSidebar
          messages={messages}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          isMobile={false}
        />
        <ChatWindow selectedChat={selectedChat} isMobile={false} />
      </div>
    </div>
  );
};

export default Message;
