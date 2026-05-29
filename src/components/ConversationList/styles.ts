import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.conversation.containerBg};
  transition: background-color 0.2s ease;
`;

export const Header = styled.div`
  padding: 0.875rem 1rem 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 0.625rem;
`;

export const FilterButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.bg.secondary};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.bg.tertiary};
    border-color: ${({ theme }) => theme.border.strong};
  }

  svg {
    color: ${({ theme }) => theme.text.muted};
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1.75rem;
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

export const ConversationsList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text.muted};
  font-size: 0.875rem;
`;

export const ItemContainer = styled.button<{
  $isSelected: boolean;
  $hasUnread?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem;
  border: none;
  border-left: 3px solid
    ${({ $hasUnread, theme }) =>
      $hasUnread ? theme.brand.primary : 'transparent'};
  border-bottom: 1px solid ${({ theme }) => theme.conversation.itemBorder};
  background-color: ${({ $isSelected, $hasUnread, theme }) => {
    if ($hasUnread) return theme.conversation.unreadBg;
    if ($isSelected) return theme.conversation.selectedBg;
    return 'transparent';
  }};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background-color: ${({ $isSelected, $hasUnread, theme }) => {
      if ($hasUnread) return theme.conversation.unreadHover;
      if ($isSelected) return theme.conversation.selectedBg;
      return theme.conversation.hoverBg;
    }};
  }

  &:active {
    background-color: ${({ theme }) => theme.conversation.selectedBg};
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
  color: ${({ $hasUnread, theme }) =>
    $hasUnread ? theme.conversation.unreadText : theme.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

export const ItemTime = styled.span<{ $hasUnread?: boolean }>`
  font-size: 0.75rem;
  font-weight: ${({ $hasUnread }) => ($hasUnread ? 600 : 400)};
  color: ${({ $hasUnread, theme }) =>
    $hasUnread ? theme.conversation.unreadText : theme.text.muted};
  margin-left: 0.5rem;
  flex-shrink: 0;
`;

export const ItemMessage = styled.p<{ $hasUnread?: boolean }>`
  font-size: 0.875rem;
  font-weight: ${({ $hasUnread }) => ($hasUnread ? 600 : 400)};
  color: ${({ $hasUnread, theme }) =>
    $hasUnread ? theme.text.secondary : theme.text.muted};
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

export const StatusBadge = styled.span<{ $variant?: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid;
  line-height: 1;
  display: inline-block;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background-color: ${theme.status.success.bg};
          color: ${theme.status.success.text};
          border-color: ${theme.status.success.border};
        `;
      case 'warning':
        return `
          background-color: ${theme.status.warning.bg};
          color: ${theme.status.warning.text};
          border-color: ${theme.status.warning.border};
        `;
      case 'danger':
        return `
          background-color: ${theme.status.danger.bg};
          color: ${theme.status.danger.text};
          border-color: ${theme.status.danger.border};
        `;
      default:
        return `
          background-color: ${theme.status.default.bg};
          color: ${theme.status.default.text};
          border-color: ${theme.status.default.border};
        `;
    }
  }}
`;

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
