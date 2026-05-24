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
    case 'ai_handling':
      return 'IA Ativa';
    case 'human_requested':
      return 'Ação Humana Solicitada';
    case 'human_active':
      return 'Atendimento Humano';
    case 'awaiting_close':
      return 'Aguardando Fechamento';
    case 'closed':
      return 'Encerrado';
    default:
      return '';
  }
};

const getStatusColor = (status: Conversation['status']) => {
  switch (status) {
    case 'ai_handling':
      return '#10b981';
    case 'human_requested':
      return '#ef4444';
    case 'human_active':
      return '#f59e0b';
    case 'awaiting_close':
      return '#f59e0b';
    case 'closed':
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
