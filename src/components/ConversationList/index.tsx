'use client';

import { Search, ChevronDown } from 'lucide-react';
import { Conversation } from '@/types';
import { useConversationStore } from '@/stores/useConversationStore';
import ConversationItem from './ConversationItem';
import {
  Container,
  Header,
  Title,
  FilterButton,
  SearchContainer,
  SearchIcon,
  SearchInput,
  ConversationsList,
  EmptyState,
} from './styles';


interface ConversationListProps {
  conversations: Conversation[];
  onMarkAsRead?: (conversationId: string) => void;
}

const filterOptions = {
  all: 'Todas',
  ai_handling: 'IA Ativa',
  human_requested: 'Ação Humana Solicitada',
  human_active: 'Atendimento Humano',
  awaiting_close: 'Aguardando Fechamento',
};

export default function ConversationList({ conversations, onMarkAsRead }: ConversationListProps) {
  const { filter, searchQuery, setSearchQuery } = useConversationStore();

  // Filtrar conversas
  const filteredConversations = conversations.filter((conv) => {
    // Filtro por status
    const matchesFilter = filter === 'all' || conv.status === filter;
    
    // Filtro por busca
    const matchesSearch =
      searchQuery === '' ||
      conv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <Container>
      <Header>
        <Title>Conversas</Title>
        
        <FilterButton>
          {filterOptions[filter]}
          <ChevronDown size={16} />
        </FilterButton>
      </Header>

      <SearchContainer>
        <SearchIcon>
          <Search size={16} />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Buscar conversas..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <ConversationsList>
        {filteredConversations.length === 0 ? (
          <EmptyState>
            {searchQuery ? 'Nenhuma conversa encontrada' : 'Nenhuma conversa'}
          </EmptyState>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem 
              key={conversation.id} 
              conversation={conversation}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        )}
      </ConversationsList>
    </Container>
  );
}
