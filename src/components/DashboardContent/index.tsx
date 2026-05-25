'use client';

import { useMemo } from 'react';
import { useRealtimeConversations } from '@/hooks/useRealtimeConversations';
import { Conversation } from '@/types';
import ConversationList from '../ConversationList';
import ContentLayout from '../ContentLayout';
import ChatWrapper from '../ChatWrapper';
import Header, { HeaderMetric } from '../Header';

interface DashboardContentProps {
  initialConversations: Conversation[];
  tenantId: string;
}

export default function DashboardContent({
  initialConversations,
  tenantId,
}: DashboardContentProps) {
  const { conversations, updateConversationStatusLocal } = useRealtimeConversations(initialConversations, tenantId);

  const metrics: HeaderMetric[] = useMemo(() => {
    const totalConversations = conversations.length;
    const awaitingAction = conversations.filter(
      (conv) => conv.status === 'human_requested' || conv.status === 'human_active'
    ).length;

    return [
      {
        label: 'Total Conversas',
        value: totalConversations,
        variant: 'info' as const,
      },
      {
        label: 'Aguardando Ação',
        value: awaitingAction,
        variant: 'warning' as const,
      },
      { label: 'Follow-ups Hoje', value: 8, variant: 'default' as const },
      { label: 'Bot Ativo', value: 'Online', variant: 'success' as const },
    ];
  }, [conversations]);

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Gerencie as conversas e o atendimento da clínica"
        metrics={metrics}
      />
      <ContentLayout 
        conversationList={<ConversationList conversations={conversations} />}
      >
        <ChatWrapper 
          conversations={conversations} 
          tenantId={tenantId}
          onConversationStatusChange={updateConversationStatusLocal}
        />
      </ContentLayout>
    </>
  );
}
