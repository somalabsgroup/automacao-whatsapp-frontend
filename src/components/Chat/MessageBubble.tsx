'use client';

import { Check, CheckCheck, Clock, AlertCircle, Download, FileText } from 'lucide-react';
import { ChatMessage } from '@/types';
import { 
  MessageContainer,
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
  MessageStatusIcon 
} from './styles';

interface MessageBubbleProps {
  message: ChatMessage;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const getStatusIcon = (status: ChatMessage['status']) => {
  switch (status) {
    case 'sending':
      return <Clock size={14} />;
    case 'sent':
      return <Check size={14} />;
    case 'delivered':
    case 'read':
      return <CheckCheck size={14} />;
    case 'failed':
      return <AlertCircle size={14} />;
    default:
      return null;
  }
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isOwn = message.sender === 'human';
  const isBot = message.sender === 'bot';

  return (
    <MessageContainer $isOwn={isOwn || isBot}>
      <Bubble $sender={message.sender}>
        <MessageContent>
          {/* Renderizar anexos de imagem */}
          {message.attachments?.filter(att => att.type === 'image').map((attachment) => (
            <MessageAttachmentContainer key={attachment.id}>
              <MessageImage src={attachment.url} alt={attachment.fileName || 'Image'} />
            </MessageAttachmentContainer>
          ))}

          {/* Renderizar anexos de documento */}
          {message.attachments?.filter(att => att.type === 'document').map((attachment) => (
            <MessageAttachmentContainer key={attachment.id}>
              <MessageDocument href={attachment.url} download={attachment.fileName}>
                <DocumentIcon>
                  <FileText size={24} />
                </DocumentIcon>
                <DocumentInfo>
                  <DocumentName>{attachment.fileName || 'Documento'}</DocumentName>
                  {attachment.fileSize && (
                    <DocumentSize>{formatFileSize(attachment.fileSize)}</DocumentSize>
                  )}
                </DocumentInfo>
                <Download size={20} />
              </MessageDocument>
            </MessageAttachmentContainer>
          ))}

          {/* Texto da mensagem */}
          {message.content && <MessageText>{message.content}</MessageText>}
        </MessageContent>

        <MessageFooter>
          <MessageTime>{formatTime(message.timestamp)}</MessageTime>
          {isOwn && (
            <MessageStatusIcon $status={message.status}>
              {getStatusIcon(message.status)}
            </MessageStatusIcon>
          )}
        </MessageFooter>
      </Bubble>
    </MessageContainer>
  );
}
