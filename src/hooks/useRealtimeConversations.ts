import { useState, useEffect, useCallback, useRef } from 'react';
import { Conversation } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { subscribeToConversations, getConversationById } from '@/lib/services/conversations';
import { useConversationStore } from '@/stores/useConversationStore';

const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
    
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      
      oscillator2.frequency.value = 1000;
      oscillator2.type = 'sine';
      gainNode2.gain.value = 0.3;
      
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.2);
    }, 100);
  } catch {
    // Erro ao tocar som
  }
};

export function useRealtimeConversations(
  initialConversations: Conversation[],
  tenantId: string
) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const { selectedConversationId } = useConversationStore();
  const supabase = createClient();
  const hasPlayedSound = useRef<Set<string>>(new Set());
  const updateTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  const fetchAndUpdateRef = useRef<((conversationId: string, retryCount: number) => Promise<void>) | null>(null);

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

  const fetchAndUpdate = useCallback(async (conversationId: string, retryCount = 0) => {
    try {
      const updated = await getConversationById(supabase, conversationId, tenantId);
      
      if (updated) {
        setConversations((prev) => {
          const existing = prev.find((c) => c.id === conversationId);
          
          // Se conversa estava fechada e agora está ativa, é uma reabertura (nova mensagem do paciente)
          const wasClosedNowActive = existing?.status === 'closed' && updated.status !== 'closed';
          
          if (wasClosedNowActive && existing && updated.lastMessage === existing.lastMessage && retryCount < 3) {
            if (updateTimeoutRef.current[conversationId]) {
              clearTimeout(updateTimeoutRef.current[conversationId]);
            }
            
            updateTimeoutRef.current[conversationId] = setTimeout(() => {
              fetchAndUpdateRef.current?.(conversationId, retryCount + 1);
            }, 500 * (retryCount + 1));
            
            return prev;
          }
          
          const isNewInboundMessage = 
            existing && 
            (
              (updated.lastMessage !== existing.lastMessage &&
               updated.lastMessageAt > existing.lastMessageAt &&
               (updated.lastMessageDirection === 'inbound' || updated.lastMessageSender === 'patient'))
              ||
              wasClosedNowActive
            );
          
          const hasUnread = isNewInboundMessage && conversationId !== selectedConversationId;
          
          if (isNewInboundMessage) {
            const messageKey = `${conversationId}-${updated.lastMessageAt.getTime()}`;
            if (!hasPlayedSound.current.has(messageKey)) {
              playNotificationSound();
              hasPlayedSound.current.add(messageKey);
              
              setTimeout(() => {
                hasPlayedSound.current.delete(messageKey);
              }, 5 * 60 * 1000);
            }
          }
          
          const index = prev.findIndex((c) => c.id === conversationId);
          
          if (index >= 0) {
            const newConversations = [...prev];
            newConversations[index] = { 
              ...updated, 
              hasNotification: hasUnread ? true : (updated.hasNotification || false)
            };
            
            newConversations.sort((a, b) => 
              b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
            );
            
            return newConversations;
          } else {
            const newConversations = [{ ...updated, hasNotification: hasUnread || false }, ...prev];
            
            newConversations.sort((a, b) => 
              b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
            );
            
            return newConversations;
          }
        });
      }
    } catch {
      // Erro ao atualizar conversa
    }
  }, [supabase, tenantId, selectedConversationId]);

  useEffect(() => {
    fetchAndUpdateRef.current = fetchAndUpdate;
  }, [fetchAndUpdate]);

  const updateConversation = useCallback((conversationId: string) => {
    fetchAndUpdate(conversationId, 0);
  }, [fetchAndUpdate]);

  const removeConversation = useCallback((conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
  }, []);

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) => {
      const index = prev.findIndex((c) => c.id === conversationId);
      if (index >= 0) {
        const newConversations = [...prev];
        newConversations[index] = { ...newConversations[index], hasNotification: false };
        return newConversations;
      }
      return prev;
    });
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
      
      Object.values(updateTimeoutRef.current).forEach(timeout => {
        clearTimeout(timeout);
      });
      updateTimeoutRef.current = {};
    };
  }, [supabase, tenantId, updateConversation, removeConversation]);

  return { conversations, updateConversationStatusLocal, removeConversation, markAsRead };
}
