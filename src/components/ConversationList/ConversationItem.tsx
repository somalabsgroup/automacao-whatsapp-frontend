'use client';

import { Conversation } from '@/types';
import { useConversationStore } from '@/stores/useConversationStore';
import ConversationAvatar from './ConversationAvatar';
import { ItemContainer, ItemContent, ItemFooter, ItemHeader, ItemMessage, ItemName, ItemTime, NotificationBadge, StatusBadge } from './styles';

interface ConversationItemProps {
  conversation: Conversation;
}

const getStatusLabel = (status: Conversation['status']) => {
  switch (status) {
    case 'ai_handling':
      return 'IA Ativa';
    case 'human_requested':
      return 'AÇÃO HUMANA SOLICITADA';
    case 'human_active':
      return 'Atendimento Humano';
    case 'awaiting_close':
      return 'Aguardando Fechamento';
    case 'closed':
      return 'Encerrado';
    default:
      return status;
  }
};

const getStatusVariant = (status: Conversation['status']) => {
  switch (status) {
    case 'ai_handling':
      return 'success';
    case 'human_requested':
      return 'danger';
    case 'human_active':
      return 'warning';
    case 'awaiting_close':
      return 'warning';
    case 'closed':
      return 'default';
    default:
      return 'default';
  }
};

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const { selectedConversationId, setSelectedConversation } = useConversationStore();
  const isSelected = selectedConversationId === conversation.id;

  const handleClick = () => {
    setSelectedConversation(conversation.id);
  };

  return (
    <ItemContainer onClick={handleClick} $isSelected={isSelected}>
      <ConversationAvatar initials={conversation.initials} color={conversation.avatarColor} />
      
      <ItemContent>
        <ItemHeader>
          <ItemName>{conversation.patientName}</ItemName>
          <ItemTime>{conversation.lastMessageTime}</ItemTime>
        </ItemHeader>
        
        <ItemMessage>{conversation.lastMessage}</ItemMessage>
        
        <ItemFooter>
          <StatusBadge $variant={getStatusVariant(conversation.status)}>
            {getStatusLabel(conversation.status)}
          </StatusBadge>
          
          {conversation.hasNotification && (
            <NotificationBadge>
              {conversation.notificationCount || 1}
            </NotificationBadge>
          )}
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
}
