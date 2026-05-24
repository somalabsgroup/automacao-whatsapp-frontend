'use client';

import { useState, useEffect } from 'react';
import { useConversationStore } from '@/stores/useConversationStore';
import { Conversation, ChatMessage } from '@/types';
import Chat from '@/components/Chat';
import { createClient } from '@/lib/supabase/client';
import { sendTextMessage } from '@/lib/services/evolution';
import { AxiosError } from 'axios';
import { getMessagesByConversation, subscribeToMessages, createOutboundMessage } from '@/lib/services/messages';

interface ChatWrapperProps {
  conversations: Conversation[];
  tenantId: string;
}

export default function ChatWrapper({ conversations, tenantId }: ChatWrapperProps) {
  const { selectedConversationId } = useConversationStore();
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);
  const conversationMessages = selectedConversationId
    ? messages[selectedConversationId] || []
    : [];

  // Buscar mensagens quando uma conversa é selecionada
  useEffect(() => {
    if (!selectedConversationId) return;

    // Se já temos as mensagens em cache, não buscar novamente
    if (messages[selectedConversationId]) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const fetchedMessages = await getMessagesByConversation(supabase, selectedConversationId);
        setMessages((prev) => ({
          ...prev,
          [selectedConversationId]: fetchedMessages,
        }));
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedConversationId, supabase, messages]);

  // Inscrever-se para novas mensagens em tempo real
  useEffect(() => {
    if (!selectedConversationId) return;

    let unsubscribe: (() => void) | null = null;

    const setupSubscription = async () => {
      unsubscribe = await subscribeToMessages(
        supabase,
        selectedConversationId,
        (newMessage: ChatMessage) => {
          setMessages((prev) => {
            const currentMessages = prev[selectedConversationId] || [];
            
            // Procurar por ID ou por whatsapp_message_id (para evitar duplicatas)
            const existingIndex = currentMessages.findIndex(
              msg => msg.id === newMessage.id || 
              (msg.whatsappMessageId && msg.whatsappMessageId === newMessage.whatsappMessageId)
            );
            
            // Se existe, atualiza (UPDATE do n8n)
            if (existingIndex >= 0) {
              const updated = [...currentMessages];
              updated[existingIndex] = newMessage;
              return {
                ...prev,
                [selectedConversationId]: updated,
              };
            }
            
            // Se não existe, adiciona (INSERT)
            return {
              ...prev,
              [selectedConversationId]: [...currentMessages, newMessage],
            };
          });
        }
      );
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedConversationId, supabase]);

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!selectedConversationId || !selectedConversation) return;

    if (attachments && attachments.length > 0) {
      alert('Upload de arquivos ainda não implementado');
      return;
    }

    const patientPhone = selectedConversation.patientPhone;
    if (!patientPhone) {
      alert('Telefone do paciente não encontrado');
      return;
    }

    try {
      const evolutionResponse = await sendTextMessage({
        tenantId,
        phoneNumber: patientPhone,
        text: content,
      });

      const { data: user } = await supabase.auth.getUser();

      const newMessage = await createOutboundMessage(supabase, {
        tenantId,
        conversationId: selectedConversationId,
        content,
        senderUserId: user.user?.id,
        whatsappMessageId: evolutionResponse?.key?.id,
      });

      setMessages((prev) => ({
        ...prev,
        [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
      }));
      
    } catch (error) {
      let errorMsg = 'Erro ao enviar mensagem';
      if (error instanceof AxiosError) {
        errorMsg = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      
      alert(`Erro: ${errorMsg}`);
    }
  };

  if (loading) {
    return <div>Carregando mensagens...</div>;
  }

  return (
    <Chat
      conversation={selectedConversation || null}
      messages={conversationMessages}
      onSendMessage={handleSendMessage}
      onMenuClick={() => {}}
    />
  );
}
