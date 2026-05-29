'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, User, Trash2, CheckCircle } from 'lucide-react';
import { Conversation } from '@/types';
import { ActionButton, HeaderContainer, HeaderLeft, HeaderRight, PatientAvatar, PatientInfo, PatientName, PatientPhone, StatusIndicator, DropdownMenu, DropdownItem } from './styles';


interface ChatHeaderProps {
  conversation: Conversation;
  onDeleteConversation?: () => void;
  onCloseConversation?: () => void;
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

export default function ChatHeader({ conversation, onDeleteConversation, onCloseConversation }: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleCloseClick = () => {
    setShowMenu(false);
    if (onCloseConversation) {
      if (confirm('Deseja encerrar este atendimento? O cliente poderá iniciar um novo atendimento ao enviar outra mensagem.')) {
        onCloseConversation();
      }
    }
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    if (onDeleteConversation) {
      if (confirm('Tem certeza que deseja excluir esta conversa e todas as mensagens? Esta ação não pode ser desfeita.')) {
        onDeleteConversation();
      }
    }
  };

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
        <ActionButton 
          ref={buttonRef}
          onClick={() => setShowMenu(!showMenu)} 
          title="Mais opções"
        >
          <MoreVertical size={20} />
        </ActionButton>
        
        {showMenu && (
          <DropdownMenu ref={menuRef}>
            {conversation.status !== 'closed' && onCloseConversation && (
              <DropdownItem onClick={handleCloseClick}>
                <CheckCircle size={16} />
                Encerrar Atendimento
              </DropdownItem>
            )}
            <DropdownItem onClick={handleDeleteClick} $danger>
              <Trash2 size={16} />
              Excluir Conversa
            </DropdownItem>
          </DropdownMenu>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
}
