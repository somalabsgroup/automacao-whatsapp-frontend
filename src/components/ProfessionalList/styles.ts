import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: ${({ theme }) => theme.card.bg};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.card.shadow};
  overflow: hidden;
  transition: background-color 0.2s ease;
`;

export const ListHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const ListTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: ${({ theme }) => theme.brand.primary};
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.brand.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.brand.active};
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.625rem 1rem;
  background-color: ${({ $active, theme }) =>
    $active ? theme.brand.primary : theme.bg.primary};
  color: ${({ $active, theme }) => ($active ? '#ffffff' : theme.text.secondary)};
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.brand.primary : theme.border.default)};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.brand.hover : theme.bg.secondary};
    border-color: ${({ $active, theme }) =>
      $active ? theme.brand.hover : theme.border.strong};
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text.placeholder};
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.25rem;
  background-color: ${({ theme }) => theme.bg.secondary};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.bg.primary};
    border-color: ${({ theme }) => theme.brand.primary};
  }
`;

export const ListContent = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.table.headBg};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

export const TableRow = styled.tr<{ $inactive?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  opacity: ${({ $inactive }) => ($inactive ? 0.6 : 1)};
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.table.rowHoverBg};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.primary};
`;

export const ProfessionalName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
`;

export const ProfessionalSpecialty = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.muted};
  margin-top: 0.125rem;
`;

export const ColorBadge = styled.div<{ $color: string }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 0.25rem;
  background-color: ${({ $color }) => $color};
  border: 2px solid ${({ theme }) => theme.bg.primary};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.border.default};
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  background-color: ${({ $active, theme }) =>
    $active ? theme.status.success.bg : theme.status.danger.bg};
  color: ${({ $active, theme }) =>
    $active ? theme.status.success.text : theme.status.danger.text};
`;

export const StatusDot = styled.span<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#10b981' : '#ef4444')};
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const IconButton = styled.button`
  padding: 0.375rem;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text.muted};
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.bg.tertiary};
    color: ${({ theme }) => theme.text.primary};
  }

  &:active {
    background-color: ${({ theme }) => theme.border.default};
  }
`;

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text.muted};
`;

export const EmptyIcon = styled.div`
  margin: 0 auto 1rem;
  color: ${({ theme }) => theme.border.strong};
`;

export const EmptyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  margin: 0 0 0.5rem 0;
`;

export const EmptyDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.muted};
  margin: 0 0 1.5rem 0;
`;
