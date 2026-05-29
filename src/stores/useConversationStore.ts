import { create } from 'zustand';
import { ConversationFilter } from '@/types';

interface ConversationState {
  selectedConversationId: string | null;
  filter: ConversationFilter;
  searchQuery: string;
  setSelectedConversation: (id: string | null) => void;
  setFilter: (filter: ConversationFilter) => void;
  setSearchQuery: (query: string) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  selectedConversationId: null,
  filter: 'all',
  searchQuery: '',
  setSelectedConversation: (id) => set({ selectedConversationId: id }),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
