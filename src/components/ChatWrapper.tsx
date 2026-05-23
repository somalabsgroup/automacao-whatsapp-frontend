'use client';

import { useState } from 'react';
import { useConversationStore } from '@/stores/useConversationStore';
import { Conversation, ChatMessage } from '@/types';
import Chat from '@/components/Chat';
import { mockMessages } from '@/utils/mockData';

interface ChatWrapperProps {
  conversations: Conversation[];
}

export default function ChatWrapper({ conversations }: ChatWrapperProps) {
  const { selectedConversationId } = useConversationStore();
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(mockMessages);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);
  const conversationMessages = selectedConversationId
    ? messages[selectedConversationId] || []
    : [];

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!selectedConversationId) return;

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      conversationId: selectedConversationId,
      sender: 'human',
      type: attachments && attachments.length > 0 ? 'image' : 'text',
      content,
      status: 'sending',
      timestamp: new Date(),
      attachments: attachments?.map((file, index) => ({
        id: `att${Date.now()}-${index}`,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      })),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
    }));

    // Simular envio bem-sucedido após 1 segundo
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedConversationId]: prev[selectedConversationId].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        ),
      }));
    }, 1000);
  };

  return (
    <Chat
      conversation={selectedConversation || null}
      messages={conversationMessages}
      onSendMessage={handleSendMessage}
      onMenuClick={() => console.log('Menu clicked')}
    />
  );
}
