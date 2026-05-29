import { SupabaseClient } from '@supabase/supabase-js';
import { Conversation, ConversationStatus, AvatarColor } from '@/types';
import axios, { AxiosError } from 'axios';

const avatarColors: AvatarColor[] = ['green', 'orange', 'red', 'purple', 'blue'];
const N8N_WEBHOOK_URL = 'https://n8n.somaclini.com.br/webhook-test/send-message';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(id: string): AvatarColor {
  const index = parseInt(id.slice(-2), 16) % avatarColors.length;
  return avatarColors[index];
}

export async function getConversations(
  supabase: SupabaseClient,
  tenantId: string
): Promise<Conversation[]> {
  // Buscar conversas com última mensagem
  const { data: conversationsData, error } = await supabase
    .from('conversations')
    .select(`
      id,
      patient_id,
      status,
      assigned_user_id,
      handoff_reason,
      last_message_at,
      created_at,
      closed_at,
      close_reason,
      context,
      patients!inner (
        id,
        name,
        phone
      )
    `)
    .eq('tenant_id', tenantId)
    .order('last_message_at', { ascending: false });

  if (error) throw error;

  if (!conversationsData) return [];

  // Buscar última mensagem de cada conversa
  const conversationsWithMessages = await Promise.all(
    conversationsData.map(async (conv: Record<string, unknown>) => {
      const { data: lastMessage } = await supabase
        .from('messages')
        .select('content, created_at, sender, direction')
        .eq('conversation_id', (conv as { id: string }).id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const patient = Array.isArray((conv as { patients: unknown }).patients) 
        ? ((conv as { patients: unknown[] }).patients[0] as { name?: string; phone?: string })
        : (conv as { patients: { name?: string; phone?: string } }).patients;
      const patientName = patient?.name || 'Desconhecido';
      const patientPhone = patient?.phone;

      const convData = conv as {
        id: string;
        patient_id: string;
        status: string;
        assigned_user_id?: string;
        handoff_reason?: string;
        last_message_at: string;
        created_at: string;
        closed_at?: string;
        close_reason?: string;
        context?: Record<string, unknown>;
      };

      return {
        id: convData.id,
        patientId: convData.patient_id,
        patientName,
        patientPhone,
        initials: getInitials(patientName),
        avatarColor: getAvatarColor(convData.id),
        lastMessage: lastMessage?.content || 'Sem mensagens',
        lastMessageTime: lastMessage?.created_at 
          ? new Date(lastMessage.created_at).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '',
        lastMessageDirection: lastMessage?.direction as 'inbound' | 'outbound' | undefined,
        lastMessageSender: lastMessage?.sender as 'patient' | 'ai' | 'human' | undefined,
        status: convData.status as ConversationStatus,
        assignedUserId: convData.assigned_user_id,
        handoffReason: convData.handoff_reason,
        lastMessageAt: new Date(convData.last_message_at),
        createdAt: new Date(convData.created_at),
        closedAt: convData.closed_at ? new Date(convData.closed_at) : undefined,
        closeReason: convData.close_reason,
        context: convData.context,
        hasNotification: false,
        notificationCount: 0,
        tenantId,
      } as Conversation;
    })
  );

  return conversationsWithMessages;
}

export async function getConversationById(
  supabase: SupabaseClient,
  conversationId: string,
  tenantId: string
): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      id,
      patient_id,
      status,
      assigned_user_id,
      handoff_reason,
      last_message_at,
      created_at,
      closed_at,
      close_reason,
      context,
      patients!inner (
        id,
        name,
        phone
      )
    `)
    .eq('id', conversationId)
    .eq('tenant_id', tenantId)
    .single();

  if (error || !data) return null;

  const { data: lastMessage } = await supabase
    .from('messages')
    .select('content, created_at, sender, direction')
    .eq('conversation_id', data.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const patient = Array.isArray(data.patients) ? data.patients[0] : data.patients;
  const patientName = patient?.name || 'Desconhecido';
  const patientPhone = patient?.phone;

  return {
    id: data.id,
    patientId: data.patient_id,
    patientName,
    patientPhone,
    initials: getInitials(patientName),
    avatarColor: getAvatarColor(data.id),
    lastMessage: lastMessage?.content || 'Sem mensagens',
    lastMessageTime: lastMessage?.created_at 
      ? new Date(lastMessage.created_at).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '',
    lastMessageDirection: lastMessage?.direction as 'inbound' | 'outbound' | undefined,
    lastMessageSender: lastMessage?.sender as 'patient' | 'ai' | 'human' | undefined,
    status: data.status as ConversationStatus,
    assignedUserId: data.assigned_user_id,
    handoffReason: data.handoff_reason,
    lastMessageAt: new Date(data.last_message_at),
    createdAt: new Date(data.created_at),
    closedAt: data.closed_at ? new Date(data.closed_at) : undefined,
    closeReason: data.close_reason,
    context: data.context,
    hasNotification: false,
    notificationCount: 0,
    tenantId,
  };
}



// Callback para notificar mudanças na lista de conversas
interface ConversationListUpdateCallback {
  (event: 'insert' | 'update' | 'delete', conversationId: string): void;
}

/**
 * Subscribe to real-time updates for conversations
 * Listens to both conversation table changes and message table changes
 */
/**
 * Delete a conversation and all its messages
 * Note: Messages will be automatically deleted via CASCADE DELETE if foreign key is configured
 */
export async function closeConversation(
  supabase: SupabaseClient,
  conversationId: string,
  tenantId: string,
  reason?: string
): Promise<void> {
  const { error } = await supabase
    .from('conversations')
    .update({
      status: 'closed',
      closed_at: new Date().toISOString(),
      close_reason: reason || 'Atendimento encerrado pelo atendente',
    })
    .eq('id', conversationId)
    .eq('tenant_id', tenantId);

  if (error) throw error;
}

export async function deleteConversation(
  supabase: SupabaseClient,
  conversationId: string,
  tenantId: string
): Promise<void> {
  // Deleta apenas a conversa - as mensagens serão deletadas automaticamente via CASCADE
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId)
    .eq('tenant_id', tenantId);

  if (error) throw error;
}

export function subscribeToConversations(
  supabase: SupabaseClient,
  tenantId: string,
  onUpdate: ConversationListUpdateCallback
) {
  // Criar nomes únicos para os canais para evitar conflitos
  const timestamp = Date.now();
  
  // Subscribe to conversation table changes
  const conversationChannel = supabase
    .channel(`conversations:${tenantId}:${timestamp}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
        filter: `tenant_id=eq.${tenantId}`,
      },
      (payload) => {
        const convId = (payload.new as { id?: string })?.id || (payload.old as { id?: string })?.id;
        if (convId) {
          if (payload.eventType === 'INSERT') {
            onUpdate('insert', convId);
          } else if (payload.eventType === 'UPDATE') {
            onUpdate('update', convId);
          } else if (payload.eventType === 'DELETE') {
            onUpdate('delete', convId);
          }
        }
      }
    )
    .subscribe();

  // Subscribe to message changes to update last message in conversations
  const messageChannel = supabase
    .channel(`messages:tenant:${tenantId}:${timestamp}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `tenant_id=eq.${tenantId}`,
      },
      (payload) => {
        const conversationId = (payload.new as { conversation_id?: string })?.conversation_id;
        if (conversationId) {
          onUpdate('update', conversationId);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(conversationChannel);
    supabase.removeChannel(messageChannel);
  };
}


type N8NWebhookPayload =
  | {
      action: 'send';
      tenant_id: string;
      conversation_id: string;
      phone_number: string;
      content?: string;
      media_url?: string;
      caption?: string;
      media_type?: 'image' | 'video' | 'audio' | 'document';
      sender_user_id?: string;
    }
  | { action: 'edit'; message_id: string; content: string }
  | { action: 'delete'; message_id: string };

interface N8NWebhookResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

/**
 * Função auxiliar para fazer POST no webhook do n8n
 */
async function postToN8NWebhook(
  payload: N8NWebhookPayload
): Promise<{ data?: N8NWebhookResponse; error?: Error }> {
  try {
    const response = await axios.post<N8NWebhookResponse>(
      N8N_WEBHOOK_URL,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: ('media_url' in payload && payload.media_url) ? 15000 : 10000,
      }
    );

    if (!response.data.success) {
      return {
        error: new Error(response.data.message || 'Falha ao processar mensagem'),
      };
    }

    return { data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: new Error(
          error.response?.data?.message || 
          error.message || 
          'Erro ao comunicar com o servidor'
        ),
      };
    }
    
    return {
      error: error instanceof Error ? error : new Error('Erro desconhecido'),
    };
  }
}

export async function editMessage(messageId: string, content: string): Promise<void> {
  const { error } = await postToN8NWebhook({ action: 'edit', message_id: messageId, content });
  if (error) throw error;
}

export async function deleteMessage(messageId: string): Promise<void> {
  const { error } = await postToN8NWebhook({ action: 'delete', message_id: messageId });
  if (error) throw error;
}

export async function sendTextMessage(
  tenantId: string,
  conversationId: string,
  phoneNumber: string,
  text: string,
  senderUserId?: string
): Promise<void> {
  const payload: N8NWebhookPayload = {
    action: 'send',
    tenant_id: tenantId,
    conversation_id: conversationId,
    phone_number: phoneNumber,
    content: text,
    sender_user_id: senderUserId,
  };

  const { error } = await postToN8NWebhook(payload);
  
  if (error) throw error;
}


