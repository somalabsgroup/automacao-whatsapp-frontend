'use client';

import { useState } from 'react';
import { Plus, Edit2, UserX, UserCheck, Users, Search } from 'lucide-react';
import { Professional } from '@/types';
import {
  ListContainer,
  ListHeader,
  ListTitle,
  HeaderActions,
  AddButton,
  FilterButton,
  SearchContainer,
  SearchIcon,
  SearchInput,
  ListContent,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  ProfessionalName,
  ProfessionalSpecialty,
  ColorBadge,
  StatusBadge,
  StatusDot,
  ActionsCell,
  IconButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from './styles';

interface ProfessionalListProps {
  professionals: Professional[];
  onAdd: () => void;
  onEdit: (professional: Professional) => void;
  onToggleActive: (professional: Professional) => void;
  showInactive: boolean;
  onToggleShowInactive: () => void;
}

const CALENDAR_COLORS: Record<string, string> = {
  '1': '#7986CB',
  '2': '#33B679',
  '3': '#8E24AA',
  '4': '#E67C73',
  '5': '#F6BF26',
  '6': '#F4511E',
  '7': '#039BE5',
  '8': '#616161',
  '9': '#3F51B5',
  '10': '#0B8043',
  '11': '#D50000',
};

export default function ProfessionalList({
  professionals,
  onAdd,
  onEdit,
  onToggleActive,
  showInactive,
  onToggleShowInactive,
}: ProfessionalListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfessionals = professionals
    .filter((p) => showInactive || p.isActive)
    .filter((p) => {
      if (searchQuery === '') return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.specialty.toLowerCase().includes(query)
      );
    });

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  return (
    <ListContainer>
      <HeaderActions>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar por nome ou especialidade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <FilterButton $active={showInactive} onClick={onToggleShowInactive}>
            {showInactive ? 'Exibir Apenas Ativos' : 'Exibir Todos'}
          </FilterButton>
          <AddButton onClick={onAdd}>
            <Plus size={18} />
            Novo Profissional
          </AddButton>
        </div>
      </HeaderActions>

      <ListContent>
        {filteredProfessionals.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Users size={48} />
            </EmptyIcon>
            <EmptyTitle>Nenhum profissional cadastrado</EmptyTitle>
            <EmptyDescription>
              {searchQuery ? 'Nenhum profissional encontrado com esse termo' : 'Comece cadastrando o primeiro profissional da clínica'}
            </EmptyDescription>
            <AddButton onClick={onAdd}>
              <Plus size={18} />
              Cadastrar Profissional
            </AddButton>
          </EmptyState>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Profissional</TableHeader>
                <TableHeader>Especialidade</TableHeader>
                <TableHeader>Duração Padrão</TableHeader>
                <TableHeader>Cor</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {filteredProfessionals.map((professional) => (
                <TableRow key={professional.id} $inactive={!professional.isActive}>
                  <TableCell>
                    <ProfessionalName>{professional.name}</ProfessionalName>
                    {professional.notes && (
                      <ProfessionalSpecialty>{professional.notes}</ProfessionalSpecialty>
                    )}
                  </TableCell>
                  <TableCell>{professional.specialty}</TableCell>
                  <TableCell>{formatDuration(professional.defaultDuration)}</TableCell>
                  <TableCell>
                    <ColorBadge $color={CALENDAR_COLORS[professional.calendarColorId] || '#039BE5'} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge $active={professional.isActive}>
                      <StatusDot $active={professional.isActive} />
                      {professional.isActive ? 'Ativo' : 'Inativo'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionsCell>
                      <IconButton
                        onClick={() => onEdit(professional)}
                        title="Editar profissional"
                      >
                        <Edit2 size={16} />
                      </IconButton>
                      <IconButton
                        onClick={() => onToggleActive(professional)}
                        title={professional.isActive ? 'Desativar profissional' : 'Ativar profissional'}
                      >
                        {professional.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                      </IconButton>
                    </ActionsCell>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </ListContent>
    </ListContainer>
  );
}
