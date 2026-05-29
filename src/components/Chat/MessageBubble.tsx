'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Check, CheckCheck, Clock, AlertCircle, Download, FileText,
  RefreshCw, MoreVertical, Pencil, Trash2, Trash
} from 'lucide-react';
import { ChatMessage } from '@/types';
import {
  MessageContainer,
  MessageMenuTrigger,
  MessageMenuDropdown,
  MessageMenuItem,
  MessageBubble as Bubble,
  MessageContent,
  MessageAttachmentContainer,
  MessageImage,
  MessageDocument,
  DocumentIcon,
  DocumentInfo,
  DocumentName,
  DocumentSize,
  MessageText,
  MessageFooter,
  MessageTime,
  EditedLabel,
  DeletedLabel,
  MessageStatusIcon,
  RetryButton,
  EditTextarea,
  EditActions,
  EditButton,
} from './styles';

interface MessageBubbleProps {
  message: ChatMessage;
  onRetry?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onEdit?: (messageId: string, newContent: string) => void;
}

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const getStatusIcon = (status: ChatMessage['status']) => {
  switch (status) {
    case 'pending':   return <Clock size={14} />;
    case 'sent':      return <Check size={14} />;
    case 'delivered':
    case 'read':      return <CheckCheck size={14} />;
    case 'failed':    return <AlertCircle size={14} />;
    default:          return null;
  }
};

export default function MessageBubble({ message, onRetry, onDelete, onEdit }: MessageBubbleProps) {
  const isOwn      = message.sender === 'human';
  const isAi       = message.sender === 'ai';
  const hasError   = message.status === 'failed' && message.error;
  const isDeleted  = !!message.deletedAt;

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content ?? '');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef  = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) return;
      setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Auto-focus textarea when editing starts
  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
      // Move cursor to end
      const len = textareaRef.current?.value.length ?? 0;
      textareaRef.current?.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleToggleMenu = () => setMenuOpen(v => !v);

  const handleStartEdit = () => {
    setEditContent(message.content ?? '');
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(message.content ?? '');
  };

  const handleSaveEdit = () => {
    const trimmed = editContent.trim();
    if (!trimmed || trimmed === message.content) {
      handleCancelEdit();
      return;
    }
    onEdit?.(message.id, trimmed);
    setIsEditing(false);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    }
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const bubbleContent = isEditing ? (
    <MessageContent>
      <EditTextarea
        ref={textareaRef}
        value={editContent}
        onChange={e => setEditContent(e.target.value)}
        onKeyDown={handleTextareaKeyDown}
        rows={2}
      />
      <EditActions>
        <EditButton onClick={handleCancelEdit}>Cancelar</EditButton>
        <EditButton $primary onClick={handleSaveEdit}>Salvar</EditButton>
      </EditActions>
    </MessageContent>
  ) : (
    <>
      <MessageContent>
        {message.mediaUrl && (message.type === 'image' || message.mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) && (
          <MessageAttachmentContainer>
            <MessageImage src={message.mediaUrl} alt="Image" />
          </MessageAttachmentContainer>
        )}
        {message.mediaUrl && message.type !== 'image' && !message.mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
          <MessageAttachmentContainer>
            <MessageDocument href={message.mediaUrl} download>
              <DocumentIcon><FileText size={24} /></DocumentIcon>
              <DocumentInfo><DocumentName>Documento</DocumentName></DocumentInfo>
              <Download size={20} />
            </MessageDocument>
          </MessageAttachmentContainer>
        )}
        {message.attachments?.filter(a => a.type === 'image').map(a => (
          <MessageAttachmentContainer key={a.id}>
            <MessageImage src={a.url} alt={a.fileName || 'Image'} />
          </MessageAttachmentContainer>
        ))}
        {message.attachments?.filter(a => a.type === 'document').map(a => (
          <MessageAttachmentContainer key={a.id}>
            <MessageDocument href={a.url} download={a.fileName}>
              <DocumentIcon><FileText size={24} /></DocumentIcon>
              <DocumentInfo>
                <DocumentName>{a.fileName || 'Documento'}</DocumentName>
                {a.fileSize && <DocumentSize>{formatFileSize(a.fileSize)}</DocumentSize>}
              </DocumentInfo>
              <Download size={20} />
            </MessageDocument>
          </MessageAttachmentContainer>
        ))}
        {message.content && <MessageText>{message.content}</MessageText>}
      </MessageContent>

      <MessageFooter>
        {isDeleted && (
          <DeletedLabel><Trash size={9} />excluída</DeletedLabel>
        )}
        {!isDeleted && message.editedAt && <EditedLabel>editado</EditedLabel>}
        <MessageTime>{formatTime(message.timestamp)}</MessageTime>
        {isOwn && !isDeleted && (
          <MessageStatusIcon $status={message.status}>
            {getStatusIcon(message.status)}
          </MessageStatusIcon>
        )}
      </MessageFooter>
    </>
  );

  return (
    <MessageContainer $isOwn={isOwn || isAi}>
      {hasError && onRetry && (
        <RetryButton onClick={() => onRetry(message.id)} title={message.error || 'Tentar novamente'}>
          <RefreshCw size={14} />
        </RetryButton>
      )}

      <Bubble $sender={message.sender} $hasError={!!hasError} $isDeleted={isDeleted}>
        {isOwn && !isEditing && !isDeleted && (
          <>
            <MessageMenuTrigger
              ref={triggerRef}
              onClick={handleToggleMenu}
              aria-label="Opções da mensagem"
            >
              <MoreVertical size={11} />
            </MessageMenuTrigger>

            {menuOpen && (
              <MessageMenuDropdown ref={dropdownRef}>
                <MessageMenuItem onClick={handleStartEdit}>
                  <Pencil size={14} />
                  Editar
                </MessageMenuItem>
                <MessageMenuItem
                  $danger
                  onClick={() => { setMenuOpen(false); onDelete?.(message.id); }}
                >
                  <Trash2 size={14} />
                  Excluir
                </MessageMenuItem>
              </MessageMenuDropdown>
            )}
          </>
        )}

        {bubbleContent}
      </Bubble>
    </MessageContainer>
  );
}
