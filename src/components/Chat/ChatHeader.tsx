'use client';

import { MoreVertical, User } from 'lucide-react';
import { Conversation } from '@/types';
import { ActionButton, HeaderContainer, HeaderLeft, HeaderRight, PatientAvatar, PatientInfo, PatientName, PatientPhone, StatusIndicator } from './styles';


interface ChatHeaderProps {
  conversation: Conversation;
  onMenuClick?: () => void;
}

const getStatusText = (status: Conversation['status']) => {
  switch (status) {
    case 'bot_active':
      return 'Bot Ativo';
    case 'waiting':
      return 'Aguardando';
    case 'requires_human':
      return 'Requer Atenção';
    case 'completed':
      return 'Concluído';
    default:
      return '';
  }
};

const getStatusColor = (status: Conversation['status']) => {
  switch (status) {
    case 'bot_active':
      return '#10b981';
    case 'waiting':
      return '#f59e0b';
    case 'requires_human':
      return '#ef4444';
    case 'completed':
      return '#6b7280';
    default:
      return '#6b7280';
  }
};

export default function ChatHeader({ conversation, onMenuClick }: ChatHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <PatientAvatar $color={conversation.avatarColor}>
          <User size={20} strokeWidth={2.5} />
        </PatientAvatar>
        
        <PatientInfo>
          <PatientName>{conversation.patientName}</PatientName>
          <PatientPhone>
            <StatusIndicator $color={getStatusColor(conversation.status)} />
            {getStatusText(conversation.status)}
          </PatientPhone>
        </PatientInfo>
      </HeaderLeft>

      <HeaderRight>
        <ActionButton onClick={onMenuClick} title="Mais opções">
          <MoreVertical size={20} />
        </ActionButton>
      </HeaderRight>
    </HeaderContainer>
  );
}
