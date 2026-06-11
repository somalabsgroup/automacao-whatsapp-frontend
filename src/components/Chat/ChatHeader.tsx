'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, User, Trash2, ChevronDown, Check } from 'lucide-react';
import { Conversation } from '@/types';
import { ActionButton, HeaderContainer, HeaderLeft, HeaderRight, PatientAvatar, PatientInfo, PatientName, PatientPhone, StatusIndicator, StatusButton, StatusDropdown, StatusDropdownItem, DropdownMenu, DropdownItem } from './styles';


interface ChatHeaderProps {
  conversation: Conversation;
  onDeleteConversation?: () => void;
  onChangeStatus?: (status: Conversation['status']) => void;
}

const STATUS_OPTIONS: Conversation['status'][] = [
  'ai_handling',
  'human_requested',
  'human_active',
  'awaiting_close',
  'closed',
];

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

export default function ChatHeader({ conversation, onDeleteConversation, onChangeStatus }: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);

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

      if (
        showStatusMenu &&
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(event.target as Node)
      ) {
        setShowStatusMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, showStatusMenu]);

  const handleStatusSelect = (status: Conversation['status']) => {
    setShowStatusMenu(false);
    if (status === conversation.status) return;

    if (
      status === 'closed' &&
      !confirm('Deseja encerrar este atendimento? O cliente poderá iniciar um novo atendimento ao enviar outra mensagem.')
    ) {
      return;
    }

    onChangeStatus?.(status);
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
          {onChangeStatus ? (
            <StatusButton
              ref={statusButtonRef}
              type="button"
              onClick={() => setShowStatusMenu((v) => !v)}
            >
              <StatusIndicator $color={getStatusColor(conversation.status)} />
              {getStatusText(conversation.status)}
              <ChevronDown size={14} />
            </StatusButton>
          ) : (
            <PatientPhone>
              <StatusIndicator $color={getStatusColor(conversation.status)} />
              {getStatusText(conversation.status)}
            </PatientPhone>
          )}

          {showStatusMenu && (
            <StatusDropdown ref={statusMenuRef}>
              {STATUS_OPTIONS.map((status) => (
                <StatusDropdownItem
                  key={status}
                  $active={status === conversation.status}
                  onClick={() => handleStatusSelect(status)}
                >
                  <StatusIndicator $color={getStatusColor(status)} />
                  {getStatusText(status)}
                  {status === conversation.status && <Check size={14} />}
                </StatusDropdownItem>
              ))}
            </StatusDropdown>
          )}
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
