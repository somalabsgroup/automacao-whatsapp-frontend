"use client";

import { useState, useEffect, useRef } from "react";
import { useConversationStore } from "@/stores/useConversationStore";
import { Conversation, ChatMessage } from "@/types";
import Chat from "@/components/Chat";
import { createClient } from "@/lib/supabase/client";
import {
  sendTextMessage,
  editMessage,
  deleteMessage,
  deleteConversation,
  updateConversationStatus,
} from "@/lib/services/conversations";

const logError = (label: string, error: unknown) => {
  if (error && typeof error === "object" && "message" in error) {
    console.error(label, (error as { message: string; code?: string; details?: string }).message, error);
  } else {
    console.error(label, error);
  }
};
import { getMessagesByConversation, subscribeToMessages } from "@/lib/services/messages";
import ChatSkeleton from "@/components/Chat/ChatSkeleton";

interface PaginationState {
  hasMore: boolean;
  oldestTimestamp: string | null;
  isLoadingMore: boolean;
}

interface ChatWrapperProps {
  conversations: Conversation[];
  tenantId: string;
  onConversationStatusChange?: (conversationId: string, status: Conversation["status"]) => void;
  onConversationDeleted?: (conversationId: string) => void;
}

export default function ChatWrapper({
  conversations,
  tenantId,
  onConversationStatusChange,
  onConversationDeleted,
}: ChatWrapperProps) {
  const { selectedConversationId } = useConversationStore();
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [pagination, setPagination] = useState<Record<string, PaginationState>>({});
  const [loading, setLoading] = useState(false);
  const [supabase] = useState(() => createClient());
  const loadedConversationsRef = useRef<Set<string>>(new Set());
  const isLoadingMoreRef = useRef(false);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);
  const conversationMessages = selectedConversationId ? messages[selectedConversationId] || [] : [];

  const currentPagination = selectedConversationId ? pagination[selectedConversationId] : undefined;

  // Buscar mensagens quando uma conversa é selecionada
  useEffect(() => {
    if (!selectedConversationId) return;

    // Guard via Set — não dispara novamente quando `messages` state atualiza por realtime
    if (loadedConversationsRef.current.has(selectedConversationId)) return;
    loadedConversationsRef.current.add(selectedConversationId);

    const loadMessages = async () => {
      setLoading(true);
      try {
        const { messages: fetched, hasMore } = await getMessagesByConversation(supabase, selectedConversationId);
        setMessages((prev) => ({
          ...prev,
          [selectedConversationId]: fetched,
        }));
        setPagination((prev) => ({
          ...prev,
          [selectedConversationId]: {
            hasMore,
            oldestTimestamp: fetched[0]?.timestamp.toISOString() ?? null,
            isLoadingMore: false,
          },
        }));
      } catch {
        loadedConversationsRef.current.delete(selectedConversationId);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedConversationId, supabase]);

  const handleLoadMore = async () => {
    if (!selectedConversationId) return;
    const pag = pagination[selectedConversationId];
    if (!pag?.hasMore || !pag.oldestTimestamp) return;

    // Guard síncrono: bloqueia chamadas concorrentes antes do React processar o state
    if (isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;

    setPagination((prev) => ({
      ...prev,
      [selectedConversationId]: { ...prev[selectedConversationId], isLoadingMore: true },
    }));

    try {
      const { messages: older, hasMore } = await getMessagesByConversation(
        supabase,
        selectedConversationId,
        pag.oldestTimestamp,
      );

      setMessages((prev) => ({
        ...prev,
        [selectedConversationId]: [...older, ...(prev[selectedConversationId] || [])],
      }));

      setPagination((prev) => ({
        ...prev,
        [selectedConversationId]: {
          hasMore,
          oldestTimestamp: older[0]?.timestamp.toISOString() ?? pag.oldestTimestamp,
          isLoadingMore: false,
        },
      }));
    } catch {
      setPagination((prev) => ({
        ...prev,
        [selectedConversationId]: { ...prev[selectedConversationId], isLoadingMore: false },
      }));
    } finally {
      isLoadingMoreRef.current = false;
    }
  };

  // Inscrever-se para novas mensagens em tempo real
  useEffect(() => {
    if (!selectedConversationId) return;

    const unsubscribe = subscribeToMessages(supabase, selectedConversationId, (newMessage: ChatMessage) => {
      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];

        const existingIndex = currentMessages.findIndex(
          (msg) =>
            msg.id === newMessage.id ||
            (msg.whatsappMessageId && msg.whatsappMessageId === newMessage.whatsappMessageId),
        );

        if (existingIndex >= 0) {
          const updated = [...currentMessages];
          updated[existingIndex] = newMessage;
          return { ...prev, [selectedConversationId]: updated };
        }

        const withoutOptimistic = currentMessages.filter((msg) => !msg.isOptimistic || msg.status === "failed");
        return { ...prev, [selectedConversationId]: [...withoutOptimistic, newMessage] };
      });
    });

    return () => {
      unsubscribe();
      // Remove da cache para forçar re-fetch na próxima vez que for selecionada,
      // garantindo que mensagens recebidas enquanto outra conversa estava ativa sejam carregadas.
      loadedConversationsRef.current.delete(selectedConversationId);
    };
  }, [selectedConversationId, supabase]);

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!selectedConversationId || !selectedConversation) return;

    if (attachments && attachments.length > 0) {
      alert("Upload de arquivos ainda não implementado");
      return;
    }

    const patientPhone = selectedConversation.patientPhone;
    if (!patientPhone) {
      alert("Telefone do paciente não encontrado");
      return;
    }

    const { data: user } = await supabase.auth.getUser();

    // Criar mensagem otimista (ID temporário com prefixo "temp-")
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      conversationId: selectedConversationId,
      tenantId,
      direction: "outbound",
      sender: "human",
      senderUserId: user.user?.id,
      type: "text",
      content,
      status: "pending",
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
      onConversationStatusChange(selectedConversationId, "human_active");
    }

    try {
      await sendTextMessage(tenantId, selectedConversationId, patientPhone, content, user.user?.id);
    } catch (error) {
      let errorMsg = "Erro ao enviar mensagem";
      if (error instanceof Error) {
        errorMsg = error.message;
      }

      // Atualizar mensagem otimista para mostrar erro
      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];
        const updatedMessages = currentMessages.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" as const, error: errorMsg } : msg,
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
      alert("Telefone do paciente não encontrado");
      return;
    }

    // Atualizar status para pending enquanto tenta reenviar
    setMessages((prev) => {
      const currentMessages = prev[selectedConversationId] || [];
      const updatedMessages = currentMessages.map((msg) =>
        msg.id === messageId ? { ...msg, status: "pending" as const, error: undefined } : msg,
      );
      return {
        ...prev,
        [selectedConversationId]: updatedMessages,
      };
    });

    try {
      const { data: user } = await supabase.auth.getUser();

      await sendTextMessage(tenantId, selectedConversationId, patientPhone, message.content, user.user?.id);

      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];
        const updatedMessages = currentMessages.filter((msg) => msg.id !== messageId);
        return {
          ...prev,
          [selectedConversationId]: updatedMessages,
        };
      });
    } catch (error) {
      let errorMsg = "Erro ao reenviar mensagem";
      if (error instanceof Error) {
        errorMsg = error.message;
      }

      // Atualizar mensagem para mostrar erro novamente
      setMessages((prev) => {
        const currentMessages = prev[selectedConversationId] || [];
        const updatedMessages = currentMessages.map((msg) =>
          msg.id === messageId ? { ...msg, status: "failed" as const, error: errorMsg } : msg,
        );
        return {
          ...prev,
          [selectedConversationId]: updatedMessages,
        };
      });
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (!selectedConversationId) return;

    const previous = messages[selectedConversationId] || [];

    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: (prev[selectedConversationId] || []).map((msg) =>
        msg.id === messageId ? { ...msg, content: newContent, editedAt: new Date() } : msg,
      ),
    }));

    try {
      await editMessage(messageId, newContent);
    } catch (error) {
      logError("Error updating message:", error);
      setMessages((prev) => ({ ...prev, [selectedConversationId]: previous }));
      alert("Erro ao editar mensagem. Tente novamente.");
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!selectedConversationId) return;

    const previous = messages[selectedConversationId] || [];

    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: (prev[selectedConversationId] || []).map((msg) =>
        msg.id === messageId ? { ...msg, deletedAt: new Date() } : msg,
      ),
    }));

    try {
      await deleteMessage(messageId);
    } catch (error) {
      logError("Error deleting message:", error);
      setMessages((prev) => ({ ...prev, [selectedConversationId]: previous }));
      alert("Erro ao excluir mensagem. Tente novamente.");
    }
  };

  const handleChangeStatus = async (status: Conversation["status"]) => {
    if (!selectedConversationId) return;

    try {
      await updateConversationStatus(supabase, selectedConversationId, tenantId, status);

      // Atualizar status da conversa localmente (realtime também vai atualizar)
      if (onConversationStatusChange) {
        onConversationStatusChange(selectedConversationId, status);
      }
    } catch (error) {
      logError("Error updating conversation status:", error);
      alert("Erro ao atualizar status da conversa. Tente novamente.");
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
      logError("Error deleting conversation:", error);
      alert("Erro ao excluir conversa. Tente novamente.");
    }
  };

  if (loading) {
    return <ChatSkeleton />;
  }

  return (
    <Chat
      conversation={selectedConversation || null}
      messages={conversationMessages}
      onSendMessage={handleSendMessage}
      onRetryMessage={handleRetryMessage}
      onEditMessage={handleEditMessage}
      onDeleteMessage={handleDeleteMessage}
      onDeleteConversation={handleDeleteConversation}
      onChangeStatus={handleChangeStatus}
      hasMore={currentPagination?.hasMore ?? false}
      isLoadingMore={currentPagination?.isLoadingMore ?? false}
      onLoadMore={handleLoadMore}
    />
  );
}
