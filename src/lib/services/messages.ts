import { SupabaseClient } from '@supabase/supabase-js';
import { ChatMessage, MessageSender, MessageStatus, MessageDirection, MessageType } from '@/types';

const PAGE_SIZE = 30;

interface MessageRow {
  id: string;
  tenant_id: string;
  conversation_id: string;
  whatsapp_message_id?: string;
  direction: string;
  sender: string;
  sender_user_id?: string;
  message_type: string;
  content?: string;
  media_url?: string;
  status: string;
  raw_payload?: Record<string, unknown>;
  created_at: string;
  edited_at?: string;
  deleted_at?: string;
}

export interface MessagesPage {
  messages: ChatMessage[];
  hasMore: boolean;
}

function convertMessage(msg: MessageRow): ChatMessage {
  return {
    id: msg.id,
    tenantId: msg.tenant_id,
    conversationId: msg.conversation_id,
    whatsappMessageId: msg.whatsapp_message_id,
    direction: msg.direction as MessageDirection,
    sender: msg.sender as MessageSender,
    senderUserId: msg.sender_user_id,
    type: msg.message_type as MessageType,
    content: msg.content,
    mediaUrl: msg.media_url,
    status: msg.status as MessageStatus,
    timestamp: new Date(msg.created_at),
    editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined,
    deletedAt: msg.deleted_at ? new Date(msg.deleted_at) : undefined,
    rawPayload: msg.raw_payload,
  };
}

export async function getMessagesByConversation(
  supabase: SupabaseClient,
  conversationId: string,
  beforeTimestamp?: string
): Promise<MessagesPage> {
  let query = supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(PAGE_SIZE);

  if (beforeTimestamp) {
    query = query.lt('created_at', beforeTimestamp);
  }

  const { data, error } = await query;

  if (error) throw error;
  if (!data) return { messages: [], hasMore: false };

  const messages = [...data].reverse().map(convertMessage);
  return { messages, hasMore: data.length === PAGE_SIZE };
}

export async function subscribeToMessages(
  supabase: SupabaseClient,
  conversationId: string,
  onNewMessage: (message: ChatMessage) => void
) {
  // Criar canal com nome único para evitar conflitos
  const channelName = `messages:${conversationId}:${Date.now()}`;
  
  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        onNewMessage(convertMessage(payload.new as MessageRow));
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        onNewMessage(convertMessage(payload.new as MessageRow));
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
