export interface TenantInfo {
  id: string;
  slug: string;
  role: "owner" | "admin" | "user";
  name?: string;
}

export interface UserWithTenants {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  tenants: TenantInfo[];
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  patientId: string;
  content: string;
  status: "pending" | "sent" | "delivered" | "failed";
  scheduledFor?: Date;
  sentAt?: Date;
  tenantId: string;
  createdAt: Date;
}

export type ConversationStatus = 
  | "bot_active" 
  | "waiting" 
  | "requires_human" 
  | "completed";

export type AvatarColor = 
  | "green" 
  | "orange" 
  | "red" 
  | "purple" 
  | "blue";

export interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  initials: string;
  avatarColor: AvatarColor;
  lastMessage: string;
  lastMessageTime: string;
  status: ConversationStatus;
  hasNotification: boolean;
  notificationCount?: number;
  tenantId: string;
  updatedAt: Date;
}

export type ConversationFilter = "all" | "bot_active" | "waiting" | "requires_human";

// Chat Message Types
export type MessageSender = "patient" | "bot" | "human";

export type MessageType = "text" | "image" | "document" | "audio";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export interface MessageAttachment {
  id: string;
  type: "image" | "document" | "audio";
  url: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  thumbnailUrl?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: MessageSender;
  senderName?: string;
  type: MessageType;
  content: string;
  attachments?: MessageAttachment[];
  status: MessageStatus;
  timestamp: Date;
  isEdited?: boolean;
}
