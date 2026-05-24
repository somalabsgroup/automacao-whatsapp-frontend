import { SupabaseClient } from '@supabase/supabase-js';
import { Conversation, ConversationStatus, AvatarColor } from '@/types';

const avatarColors: AvatarColor[] = ['green', 'orange', 'red', 'purple', 'blue'];

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
        .select('content, created_at, sender')
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
    .select('content, created_at')
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

export async function updateConversationStatus(
  supabase: SupabaseClient,
  conversationId: string,
  status: ConversationStatus
): Promise<void> {
  const { error } = await supabase
    .from('conversations')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', conversationId);

  if (error) throw error;
}
