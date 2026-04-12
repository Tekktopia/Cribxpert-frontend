// Message Types
export interface MessageItem {
  _id: string;
  conversationId: string;
  senderId: string;
  body: string;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

export interface Conversation {
  _id: string;
  members: ConversationMember[];
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  unreadCount?: number;
  lastMessage?: MessageItem;
}

// API Response Types
export interface GetConversationsResponse {
  conversations: Conversation[];
}

export interface GetMessagesResponse {
  messages: MessageItem[];
}

export interface CreateConversationResponse {
  conversation: Conversation;
}

export interface SendMessageResponse {
  message: MessageItem;
}

// Request Types
export interface CreateConversationRequest {
  otherUserId: string;
  listingId?: string;
}

export interface SendMessageRequest {
  conversationId: string;
  body: string;
}

export interface GetMessagesRequest {
  conversationId: string;
  limit?: number;
  before?: string;
}

