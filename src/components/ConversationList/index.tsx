'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { Conversation } from '@/types';
import { useConversationStore } from '@/stores/useConversationStore';
import ConversationItem from './ConversationItem';
import {
  Container,
  Header,
  Title,
  FilterButton,
  FilterDropdown,
  FilterOption,
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

const filterOptions = [
  { value: 'all', label: 'Todas', count: 0 },
  { value: 'ai_handling', label: 'IA Ativa', count: 0 },
  { value: 'human_requested', label: 'Ação Humana', count: 0 },
  { value: 'human_active', label: 'Atendimento Humano', count: 0 },
  { value: 'awaiting_close', label: 'Aguardando Fechamento', count: 0 },
];

export default function ConversationList({ conversations, onMarkAsRead }: ConversationListProps) {
  const { filter, searchQuery, setFilter, setSearchQuery } = useConversationStore();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calcular contadores para cada filtro
  const filterOptionsWithCounts = filterOptions.map(option => {
    if (option.value === 'all') {
      return { ...option, count: conversations.length };
    }
    return {
      ...option,
      count: conversations.filter(conv => conv.status === option.value).length
    };
  });

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

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
        
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <FilterButton onClick={() => setShowFilterDropdown(!showFilterDropdown)} $isOpen={showFilterDropdown}>
            {filterOptionsWithCounts.find(opt => opt.value === filter)?.label || 'Todas'}
            <ChevronDown size={16} />
          </FilterButton>

          {showFilterDropdown && (
            <FilterDropdown>
              {filterOptionsWithCounts.map(option => (
                <FilterOption
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value as Conversation['status'] | 'all');
                    setShowFilterDropdown(false);
                  }}
                  $isActive={filter === option.value}
                >
                  <span>{option.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ opacity: 0.6, fontSize: '0.8125rem' }}>({option.count})</span>
                    {filter === option.value && <Check size={16} />}
                  </div>
                </FilterOption>
              ))}
            </FilterDropdown>
          )}
        </div>
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
