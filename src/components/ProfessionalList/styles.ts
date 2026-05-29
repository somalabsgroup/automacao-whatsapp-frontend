import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ListHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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
  color: #111827;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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
  background-color: #14b8a6;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0f9688;
  }

  &:active {
    background-color: #0d7a6f;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.625rem 1rem;
  background-color: ${({ $active }) => ($active ? '#14b8a6' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#374151')};
  border: 1px solid ${({ $active }) => ($active ? '#14b8a6' : '#e5e7eb')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#0f9688' : '#f9fafb')};
    border-color: ${({ $active }) => ($active ? '#0f9688' : '#d1d5db')};
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
  color: #9ca3af;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.25rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
  transition: all 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    background-color: #ffffff;
    border-color: #14b8a6;
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
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableRow = styled.tr<{ $inactive?: boolean }>`
  border-bottom: 1px solid #e5e7eb;
  opacity: ${({ $inactive }) => ($inactive ? 0.6 : 1)};
  transition: background-color 0.15s;

  &:hover {
    background-color: #f9fafb;
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
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #111827;
`;

export const ProfessionalName = styled.div`
  font-weight: 500;
  color: #111827;
`;

export const ProfessionalSpecialty = styled.div`
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 0.125rem;
`;

export const ColorBadge = styled.div<{ $color: string }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 0.25rem;
  background-color: ${({ $color }) => $color};
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px #e5e7eb;
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  background-color: ${({ $active }) => ($active ? '#d1fae5' : '#fee2e2')};
  color: ${({ $active }) => ($active ? '#065f46' : '#991b1b')};
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
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  &:active {
    background-color: #e5e7eb;
  }
`;

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: #6b7280;
`;

export const EmptyIcon = styled.div`
  margin: 0 auto 1rem;
  color: #d1d5db;
`;

export const EmptyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

export const EmptyDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
`;
