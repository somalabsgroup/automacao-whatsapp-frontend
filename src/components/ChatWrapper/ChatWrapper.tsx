'use client';

import { useState, useEffect } from 'react';
import { useConversationStore } from '@/stores/useConversationStore';
import { Conversation, ChatMessage } from '@/types';
import Chat from '@/components/Chat';
import { createClient } from '@/lib/supabase/client';
import { sendTextMessage, deleteConversation, closeConversation } from '@/lib/services/conversations';
import { getMessagesByConversation, subscribeToMessages } from '@/lib/services/messages';

interface ChatWrapperProps {
  conversations: Conversation[];
  tenantId: string;
  onConversationStatusChange?: (conversationId: string, status: Conversation['status']) => void;
  onConversationDeleted?: (conversationId: string) => void;
}

export default function ChatWrapper({ conversations, tenantId, onConversationStatusChange, onConversationDeleted }: ChatWrapperProps) {
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
            
            // Remover mensagem otimística se a mensagem real chegou
            const optimisticMessages = currentMessages.filter(
              msg => !msg.isOptimistic || msg.status === 'failed'
            );
            
            // Se não existe, adiciona (INSERT)
            return {
              ...prev,
              [selectedConversationId]: [...optimisticMessages, newMessage],
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

    const { data: user } = await supabase.auth.getUser();
    
    // Criar mensagem otimista (ID temporário com prefixo "temp-")
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      conversationId: selectedConversationId,
      tenantId,
      direction: 'outbound',
      sender: 'human',
      senderUserId: user.user?.id,
      type: 'text',
      content,
      status: 'pending',
      timestamp: new Date(),
      isOptimistic: true,
    };

    // Adicionar mensagem otimista imediatamente ao estado
    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), optimisticMessage],
    }));

    // Atualizar status da conversa para "em atendimento humano" (apenas visual)
    if (onConversationStatusChange) {
      onConversationStatusChange(selectedConversationId, 'human_active');
    }

    try {
      await sendTextMessage(
        tenantId,
        selectedConversationId,
        patientPhone,
        content,
        user.user?.id
      );

      
    } catch (error) {
      let errorMsg = 'Erro ao enviar mensagem';
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      
      // Atualizar mensagem otimista para mostrar erro
      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];
        const updatedMessages = currentMessages.map((msg) =>
          msg.id === tempId
            ? { ...msg, status: 'failed' as const, error: errorMsg }
            : msg
        );
        return {
          ...prev,
          [selectedConversationId]: updatedMessages,
        };
      });
    }
  };

  const handleRetryMessage = async (messageId: string) => {
    if (!selectedConversationId || !selectedConversation) return;

    const message = messages[selectedConversationId]?.find((m) => m.id === messageId);
    if (!message || !message.content) return;

    const patientPhone = selectedConversation.patientPhone;
    if (!patientPhone) {
      alert('Telefone do paciente não encontrado');
      return;
    }

    // Atualizar status para pending enquanto tenta reenviar
    setMessages((prev) => {
      const currentMessages = prev[selectedConversationId] || [];
      const updatedMessages = currentMessages.map((msg) =>
        msg.id === messageId
          ? { ...msg, status: 'pending' as const, error: undefined }
          : msg
      );
      return {
        ...prev,
        [selectedConversationId]: updatedMessages,
      };
    });

    try {
      const { data: user } = await supabase.auth.getUser();

      await sendTextMessage(
        tenantId,
        selectedConversationId,
        patientPhone,
        message.content,
        user.user?.id
      );

      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];
        const updatedMessages = currentMessages.filter((msg) => msg.id !== messageId);
        return {
          ...prev,
          [selectedConversationId]: updatedMessages,
        };
      });
      
    } catch (error) {
      let errorMsg = 'Erro ao reenviar mensagem';
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      
      // Atualizar mensagem para mostrar erro novamente
      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];
        const updatedMessages = currentMessages.map((msg) =>
          msg.id === messageId
            ? { ...msg, status: 'failed' as const, error: errorMsg }
            : msg
        );
        return {
          ...prev,
          [selectedConversationId]: updatedMessages,
        };
      });
    }
  };

  const handleCloseConversation = async () => {
    if (!selectedConversationId) return;

    try {
      await closeConversation(supabase, selectedConversationId, tenantId);
      
      // Atualizar status da conversa localmente (realtime também vai atualizar)
      if (onConversationStatusChange) {
        onConversationStatusChange(selectedConversationId, 'closed');
      }
      
    } catch (error) {
      console.error('Error closing conversation:', error);
      alert('Erro ao encerrar atendimento. Tente novamente.');
    }
  };

  const handleDeleteConversation = async () => {
    if (!selectedConversationId) return;

    try {
      await deleteConversation(supabase, selectedConversationId, tenantId);
      
      // Remover da lista imediatamente (não espera realtime)
      if (onConversationDeleted) {
        onConversationDeleted(selectedConversationId);
      }
      
      // Limpar mensagens locais
      setMessages((prev) => {
        const newMessages = { ...prev };
        delete newMessages[selectedConversationId];
        return newMessages;
      });

      // Desselecionar conversa
      useConversationStore.getState().setSelectedConversation(null);
      
    } catch (error) {
      console.error('Error deleting conversation:', error);
      alert('Erro ao excluir conversa. Tente novamente.');
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
      onRetryMessage={handleRetryMessage}
      onDeleteConversation={handleDeleteConversation}
      onCloseConversation={handleCloseConversation}
    />
  );
}
