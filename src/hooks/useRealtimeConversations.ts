import { useState, useEffect, useCallback } from 'react';
import { Conversation } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { subscribeToConversations, getConversationById } from '@/lib/services/conversations';

export function useRealtimeConversations(
  initialConversations: Conversation[],
  tenantId: string
) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const supabase = createClient();

  // Atualizar status localmente (apenas visual)
  const updateConversationStatusLocal = useCallback((conversationId: string, status: Conversation['status']) => {
    setConversations((prev) => {
      const index = prev.findIndex((c) => c.id === conversationId);
      if (index >= 0) {
        const newConversations = [...prev];
        newConversations[index] = { ...newConversations[index], status };
        return newConversations;
      }
      return prev;
    });
  }, []);

  const updateConversation = useCallback(
    async (conversationId: string) => {
      try {
        const updated = await getConversationById(supabase, conversationId, tenantId);
        
        if (updated) {
          setConversations((prev) => {
            const index = prev.findIndex((c) => c.id === conversationId);
            
            if (index >= 0) {
              const newConversations = [...prev];
              newConversations[index] = updated;
              
              newConversations.sort((a, b) => 
                b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
              );
              
              return newConversations;
            } else {
              const newConversations = [updated, ...prev];
              
              newConversations.sort((a, b) => 
                b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
              );
              
              return newConversations;
            }
          });
        }
      } catch (error) {
        console.error('Error updating conversation:', error);
      }
    },
    [supabase, tenantId]
  );

  const removeConversation = useCallback((conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToConversations(
      supabase,
      tenantId,
      (event, conversationId) => {
        if (event === 'delete') {
          removeConversation(conversationId);
        } else {
          updateConversation(conversationId);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [supabase, tenantId, updateConversation, removeConversation]);

  return { conversations, updateConversationStatusLocal, removeConversation };
}
