'use client';

import { Conversation } from '@/types';
import { useConversationStore } from '@/stores/useConversationStore';
import ConversationAvatar from './ConversationAvatar';
import { ItemContainer, ItemContent, ItemFooter, ItemHeader, ItemMessage, ItemName, ItemTime, NotificationBadge, StatusBadge } from './styles';

interface ConversationItemProps {
  conversation: Conversation;
  onMarkAsRead?: (conversationId: string) => void;
}

const getStatusLabel = (status: Conversation['status']) => {
  switch (status) {
    case 'ai_handling':
      return 'IA';
    case 'human_requested':
      return 'Urgente';
    case 'human_active':
      return 'Em Atendimento';
    case 'awaiting_close':
      return 'Aguardando';
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

export default function ConversationItem({ conversation, onMarkAsRead }: ConversationItemProps) {
  const { selectedConversationId, setSelectedConversation } = useConversationStore();
  const isSelected = selectedConversationId === conversation.id;
  const hasUnread = conversation.hasNotification;

  const handleClick = () => {
    setSelectedConversation(conversation.id);
    if (hasUnread && onMarkAsRead) {
      onMarkAsRead(conversation.id);
    }
  };

  return (
    <ItemContainer onClick={handleClick} $isSelected={isSelected} $hasUnread={hasUnread}>
      <ConversationAvatar initials={conversation.initials} color={conversation.avatarColor} />
      
      <ItemContent>
        <ItemHeader>
          <ItemName $hasUnread={hasUnread}>{conversation.patientName}</ItemName>
          <ItemTime $hasUnread={hasUnread}>{conversation.lastMessageTime}</ItemTime>
        </ItemHeader>
        
        <ItemMessage $hasUnread={hasUnread}>{conversation.lastMessage}</ItemMessage>
        
        <ItemFooter>
          <StatusBadge $variant={getStatusVariant(conversation.status)}>
            {getStatusLabel(conversation.status)}
          </StatusBadge>
          
          {hasUnread && (
            <NotificationBadge>
              {conversation.notificationCount || 1}
            </NotificationBadge>
          )}
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
}
