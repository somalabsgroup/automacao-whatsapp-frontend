'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Conversation, ChatMessage } from '@/types';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { MessageCircle, ArrowDown } from 'lucide-react';
import {
  ChatContainer as Container,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  MessagesArea,
  MessagesScroll,
  LoadMoreIndicator,
  DateDivider,
  DateLabel,
  NewMessageButton,
} from './styles';

interface ChatContainerProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  onSendMessage: (content: string, attachments?: File[]) => void;
  onRetryMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onDeleteConversation?: () => void;
  onChangeStatus?: (status: Conversation['status']) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
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
  onChangeStatus,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevConversationIdRef = useRef<string | null>(null);
  const prevScrollHeightRef = useRef(0);
  const prevIsLoadingMoreRef = useRef(false);
  const canLoadMoreRef = useRef(true);
  // Rastreia o ID da última mensagem para detectar novas mensagens vs. load-more (prepend)
  const prevLastMessageIdRef = useRef<string | null>(null);
  // Conversas cujo carregamento inicial já foi processado — separa init de realtime
  const initializedConversationsRef = useRef<Set<string>>(new Set());

  // isNearBottom como state controla visibilidade do botão; ref para uso síncrono no scroll
  const [isNearBottom, setIsNearBottom] = useState(true);
  const isNearBottomRef = useRef(true);
  const [newMessageCount, setNewMessageCount] = useState(0);
  // Bloqueia handleScroll durante animação de scrollToBottom — impede botão de reaparecer
  const isScrollingToBottomRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    isScrollingToBottomRef.current = true;
    isNearBottomRef.current = true;
    setIsNearBottom(true);
    setNewMessageCount(0);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const isNewConversation = conversation?.id !== prevConversationIdRef.current;
    prevConversationIdRef.current = conversation?.id ?? null;

    const convId = conversation?.id;
    const lastMessage = messages[messages.length - 1];
    const lastMessageId = lastMessage?.id ?? null;

    if (isNewConversation || !convId) {
      // Troca de conversa: reseta tudo
      setIsNearBottom(true);
      isNearBottomRef.current = true;
      setNewMessageCount(0);
      initializedConversationsRef.current.delete(convId ?? '');

      if (messages.length > 0) {
        // Mensagens já disponíveis: inicializa baseline imediatamente
        initializedConversationsRef.current.add(convId!);
        prevLastMessageIdRef.current = lastMessageId;
      } else {
        prevLastMessageIdRef.current = null;
      }

      messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
      return;
    }

    const isInitialized = initializedConversationsRef.current.has(convId);

    if (!isInitialized) {
      // Primeira chegada de mensagens após mudança de conversa com messages=[]
      // (caso onde ChatSkeleton é mostrado e Chat remonta)
      if (messages.length > 0) {
        initializedConversationsRef.current.add(convId);
        prevLastMessageIdRef.current = lastMessageId;
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Fase realtime: detecta mensagem nova pelo ID da última mensagem
    // Load-more (prepend) não muda a última mensagem → isNewMessageArrived = false
    const isNewMessageArrived = lastMessageId !== null && lastMessageId !== prevLastMessageIdRef.current;
    prevLastMessageIdRef.current = lastMessageId;

    if (isNewMessageArrived) {
      if (isNearBottomRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setNewMessageCount((prev) => prev + 1);
      }
    }
  }, [messages, conversation?.id]);

  // Restaura posição de scroll após prepend de mensagens antigas
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (prevIsLoadingMoreRef.current && !isLoadingMore && prevScrollHeightRef.current > 0) {
      container.scrollTop = container.scrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    }

    prevIsLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  // Reset ao trocar de conversa — NÃO reseta prevLastMessageIdRef (feito no efeito principal)
  useEffect(() => {
    canLoadMoreRef.current = true;
    isNearBottomRef.current = true;
    setIsNearBottom(true);
    setNewMessageCount(0);
  }, [conversation?.id]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const nearBottom = distanceFromBottom < 100;

    if (isScrollingToBottomRef.current) {
      if (nearBottom) {
        // Animação chegou ao fim — libera o controle
        isScrollingToBottomRef.current = false;
      } else {
        // Ainda animando: ignora eventos intermediários que reverteriam o botão
        return;
      }
    }

    if (nearBottom !== isNearBottomRef.current) {
      isNearBottomRef.current = nearBottom;
      setIsNearBottom(nearBottom);
    }

    if (nearBottom) {
      setNewMessageCount(0);
    }

    if (!hasMore || isLoadingMore) return;

    if (scrollTop < 80) {
      if (!canLoadMoreRef.current) return;
      canLoadMoreRef.current = false;
      prevScrollHeightRef.current = scrollHeight;
      onLoadMore?.();
    } else if (scrollTop > 200) {
      canLoadMoreRef.current = true;
    }
  }, [hasMore, isLoadingMore, onLoadMore]);

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
        onChangeStatus={onChangeStatus}
      />

      <MessagesArea>
        {!isNearBottom && (
          <NewMessageButton onClick={scrollToBottom}>
            <ArrowDown />
            {newMessageCount > 1
              ? `${newMessageCount} novas mensagens`
              : newMessageCount === 1
              ? 'Nova mensagem'
              : 'Ver mensagens recentes'}
          </NewMessageButton>
        )}

        <MessagesScroll ref={scrollRef} onScroll={handleScroll}>
          {isLoadingMore && (
            <LoadMoreIndicator>Carregando mensagens anteriores...</LoadMoreIndicator>
          )}

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
