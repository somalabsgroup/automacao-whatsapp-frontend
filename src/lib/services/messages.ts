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

export async function createOutboundMessage(
  supabase: SupabaseClient,
  params: {
    tenantId: string;
    conversationId: string;
    content: string;
    senderUserId?: string;
    whatsappMessageId?: string;
  }
): Promise<ChatMessage> {
  const { tenantId, conversationId, content, senderUserId, whatsappMessageId } = params;

  const { data: message, error: messageError } = await supabase
    .from('messages')
    .insert({
      tenant_id: tenantId,
      conversation_id: conversationId,
      content,
      sender: 'human',
      sender_user_id: senderUserId,
      status: 'pending',
      direction: 'outbound',
      message_type: 'text',
      whatsapp_message_id: whatsappMessageId,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (messageError) throw messageError;

  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId);

  return {
    id: message.id,
    conversationId: message.conversation_id,
    tenantId: message.tenant_id,
    content: message.content || '',
    sender: message.sender as MessageSender,
    senderUserId: message.sender_user_id,
    status: message.status as MessageStatus,
    direction: message.direction as MessageDirection,
    type: message.message_type as MessageType,
    timestamp: new Date(message.created_at),
    whatsappMessageId: message.whatsapp_message_id,
  };
}

export async function updateMessageStatus(
  supabase: SupabaseClient,
  messageId: string,
  status: MessageStatus
): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .update({ status })
    .eq('id', messageId);

  if (error) throw error;
}

export async function subscribeToMessages(
  supabase: SupabaseClient,
  conversationId: string,
  onNewMessage: (message: ChatMessage) => void
) {
  const channel = supabase
    .channel(`messages:${conversationId}`)
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
