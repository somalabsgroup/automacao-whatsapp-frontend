'use client';

import { useEffect, useRef } from 'react';
import { Conversation, ChatMessage } from '@/types';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { MessageCircle } from 'lucide-react';
import { 
  ChatContainer as Container,
  EmptyState, 
  EmptyStateIcon, 
  EmptyStateText, 
  MessagesArea, 
  MessagesScroll, 
  DateDivider, 
  DateLabel
} from './styles';

interface ChatContainerProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  onSendMessage: (content: string, attachments?: File[]) => void;
  onRetryMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onDeleteConversation?: () => void;
  onCloseConversation?: () => void;
}

const formatDate = (date: Date) => {
  const today = new Date();
  const messageDate = new Date(date);
  
  if (messageDate.toDateString() === today.toDateString()) {
    return 'Hoje';
  }
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return 'Ontem';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(messageDate);
};

const groupMessagesByDate = (messages: ChatMessage[]) => {
  const groups: { date: string; messages: ChatMessage[] }[] = [];
  
  messages.forEach((message) => {
    const dateKey = formatDate(message.timestamp);
    const existingGroup = groups.find((g) => g.date === dateKey);
    
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groups.push({ date: dateKey, messages: [message] });
    }
  });
  
  return groups;
};

export default function ChatContainer({
  conversation,
  messages,
  onSendMessage,
  onRetryMessage,
  onEditMessage,
  onDeleteMessage,
  onDeleteConversation,
  onCloseConversation,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <Container>
        <EmptyState>
          <EmptyStateIcon>
            <MessageCircle size={64} />
          </EmptyStateIcon>
          <EmptyStateText>
            Selecione uma conversa para começar
          </EmptyStateText>
        </EmptyState>
      </Container>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Container>
      <ChatHeader
        conversation={conversation}
        onDeleteConversation={onDeleteConversation}
        onCloseConversation={onCloseConversation}
      />

      <MessagesArea>
        <MessagesScroll>
          {messageGroups.map((group) => (
            <div key={group.date}>
              <DateDivider>
                <DateLabel>{group.date}</DateLabel>
              </DateDivider>
              
              {group.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onRetry={onRetryMessage}
                  onEdit={onEditMessage}
                  onDelete={onDeleteMessage}
                />
              ))}
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </MessagesScroll>
      </MessagesArea>

      <MessageInput
        onSendMessage={onSendMessage}
        placeholder="Digite sua mensagem..."
      />
    </Container>
  );
}
