import { SupabaseClient } from '@supabase/supabase-js';
import { ChatMessage, MessageSender, MessageStatus, MessageDirection, MessageType } from '@/types';

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
  deleted_at?: string;
}

export async function getMessagesByConversation(
  supabase: SupabaseClient,
  conversationId: string
): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  if (!data) return [];

  return data.map((msg: MessageRow) => ({
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
    deletedAt: msg.deleted_at ? new Date(msg.deleted_at) : undefined,
    rawPayload: msg.raw_payload,
  }));
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
        const msg = payload.new as MessageRow;
        const newMessage: ChatMessage = {
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
          deletedAt: msg.deleted_at ? new Date(msg.deleted_at) : undefined,
          rawPayload: msg.raw_payload,
        };
        onNewMessage(newMessage);
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
        const msg = payload.new as MessageRow;
        const updatedMessage: ChatMessage = {
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
          deletedAt: msg.deleted_at ? new Date(msg.deleted_at) : undefined,
          rawPayload: msg.raw_payload,
        };
        onNewMessage(updatedMessage);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
