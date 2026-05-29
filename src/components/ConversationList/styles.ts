import styled from 'styled-components';

// Container Principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
`;

// Header
export const Header = styled.div`
  padding: 0.875rem 1rem 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.625rem;
`;

export const FilterButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }

  svg {
    color: #6b7280;
  }
`;

// Search
export const SearchContainer = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1.75rem;
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

// Lista de Conversas
export const ConversationsList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #14b8a6;
  }
`;

export const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
`;

// Item de Conversa
export const ItemContainer = styled.button<{ $isSelected: boolean; $hasUnread?: boolean }>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem;
  border: none;
  border-left: 3px solid ${({ $hasUnread }) => ($hasUnread ? '#14b8a6' : 'transparent')};
  border-bottom: 1px solid #f3f4f6;
  background-color: ${({ $isSelected, $hasUnread }) => {
    if ($hasUnread) return '#ccfbf1'; // Teal mais forte para mensagem não lida
    if ($isSelected) return '#f0fdfa';
    return 'transparent';
  }};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background-color: ${({ $isSelected, $hasUnread }) => {
      if ($hasUnread) return '#99f6e4'; // Hover mais forte quando não lida
      if ($isSelected) return '#f0fdfa';
      return '#f9fafb';
    }};
  }

  &:active {
    background-color: #f0fdfa;
  }
`;

export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.125rem;
`;

export const ItemName = styled.h3<{ $hasUnread?: boolean }>`
  font-size: 0.875rem;
  font-weight: ${({ $hasUnread }) => ($hasUnread ? 700 : 500)};
  color: ${({ $hasUnread }) => ($hasUnread ? '#0f766e' : '#111827')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

export const ItemTime = styled.span<{ $hasUnread?: boolean }>`
  font-size: 0.75rem;
  font-weight: ${({ $hasUnread }) => ($hasUnread ? 600 : 400)};
  color: ${({ $hasUnread }) => ($hasUnread ? '#0f766e' : '#6b7280')};
  margin-left: 0.5rem;
  flex-shrink: 0;
`;

export const ItemMessage = styled.p<{ $hasUnread?: boolean }>`
  font-size: 0.875rem;
  font-weight: ${({ $hasUnread }) => ($hasUnread ? 600 : 400)};
  color: ${({ $hasUnread }) => ($hasUnread ? '#374151' : '#6b7280')};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  word-break: break-word;
`;

export const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Status Badge
export const StatusBadge = styled.span<{ $variant?: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid;
  line-height: 1;
  display: inline-block;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return `
          background-color: #d1fae5;
          color: #059669;
          border-color: #10b981;
        `;
      case 'warning':
        return `
          background-color: #fed7aa;
          color: #ea580c;
          border-color: #f97316;
        `;
      case 'danger':
        return `
          background-color: #fee2e2;
          color: #dc2626;
          border-color: #ef4444;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #6b7280;
          border-color: #d1d5db;
        `;
    }
  }}
`;

// Notification Badge
export const NotificationBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
`;
