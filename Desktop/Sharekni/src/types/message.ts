export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  startupName: string;
  startupLogo?: string;
  lastMessage?: Message;
  unreadCount: number;
}