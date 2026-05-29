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
  | "ai_handling" 
  | "human_requested" 
  | "human_active" 
  | "awaiting_close" 
  | "closed";

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
  patientPhone?: string;
  initials: string;
  avatarColor: AvatarColor;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageDirection?: MessageDirection;
  lastMessageSender?: MessageSender;
  status: ConversationStatus;
  assignedUserId?: string;
  handoffReason?: string;
  lastMessageAt: Date;
  createdAt: Date;
  closedAt?: Date;
  closeReason?: string;
  context?: Record<string, unknown>;
  hasNotification: boolean;
  notificationCount?: number;
  tenantId: string;
}

export type ConversationFilter = "all" | "ai_handling" | "human_requested" | "human_active" | "awaiting_close";

// Chat Message Types
export type MessageSender = "patient" | "ai" | "human";

export type MessageDirection = "inbound" | "outbound";

export type MessageType = "text" | "image" | "audio" | "video" | "document" | "sticker" | "location";

export type MessageStatus = "pending" | "sent" | "delivered" | "read" | "failed";

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
  tenantId: string;
  whatsappMessageId?: string;
  direction: MessageDirection;
  sender: MessageSender;
  senderUserId?: string;
  senderName?: string;
  type: MessageType;
  content?: string;
  mediaUrl?: string;
  attachments?: MessageAttachment[];
  status: MessageStatus;
  timestamp: Date;
  editedAt?: Date;
  deletedAt?: Date;
  rawPayload?: Record<string, unknown>;
  isOptimistic?: boolean;
  error?: string;
}

// Professional Types
export interface WorkingHours {
  monday?: { start: string; end: string; enabled: boolean };
  tuesday?: { start: string; end: string; enabled: boolean };
  wednesday?: { start: string; end: string; enabled: boolean };
  thursday?: { start: string; end: string; enabled: boolean };
  friday?: { start: string; end: string; enabled: boolean };
  saturday?: { start: string; end: string; enabled: boolean };
  sunday?: { start: string; end: string; enabled: boolean };
}

export interface Professional {
  id: string;
  tenantId: string;
  name: string;
  specialty: string;
  defaultDuration: number;
  calendarColorId: string;
  workingHours: WorkingHours;
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfessionalInput {
  name: string;
  specialty: string;
  defaultDuration: number;
  calendarColorId?: string;
  workingHours?: WorkingHours;
  notes?: string;
}

export interface UpdateProfessionalInput extends Partial<CreateProfessionalInput> {
  isActive?: boolean;
}
