import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.conversation.containerBg};
  transition: background-color 0.2s ease;
`;

export const Header = styled.div`
  padding: 1rem 1rem 0.875rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.bg.primary} 0%, ${theme.bg.secondary} 100%)`};
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
`;

export const FilterButton = styled.button<{ $isOpen?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.875rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.bg.secondary} 0%, ${theme.bg.tertiary} 100%)`};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    background: ${({ theme }) => theme.bg.tertiary};
    border-color: ${({ theme }) => theme.brand.primary}40;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  svg {
    color: ${({ theme }) => theme.text.muted};
    transition: transform 0.3s;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.dropdown.bg};
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  z-index: 100;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FilterOption = styled.button<{ $isActive?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${({ $isActive, theme }) => 
    $isActive ? `${theme.brand.primary}10` : 'transparent'};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  font-size: 0.875rem;
  font-weight: ${({ $isActive }) => $isActive ? 600 : 500};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.brand.primary : theme.text.primary};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.dropdown.hoverBg};
  }

  svg {
    color: ${({ theme }) => theme.brand.primary};
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
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.bg.primary};
    border-color: ${({ theme }) => theme.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.brand.primary}15`};
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
  gap: 0.75rem;
  padding: 0.875rem;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.brand.primary};
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    background-color: ${({ $isSelected, $hasUnread, theme }) => {
      if ($hasUnread) return theme.conversation.unreadHover;
      if ($isSelected) return theme.conversation.selectedBg;
      return theme.conversation.hoverBg;
    }};

    &::before {
      opacity: ${({ $hasUnread }) => ($hasUnread ? 0 : 0.3)};
    }
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
  gap: 0.375rem;
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
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.3125rem 0.625rem;
  border-radius: 0.5rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 0.2s;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: linear-gradient(135deg, ${theme.status.success.bg} 0%, ${theme.status.success.bg}dd 100%);
          color: ${theme.status.success.text};
          border: 1px solid ${theme.status.success.border};
          box-shadow: 0 2px 4px ${theme.status.success.bg}25;
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, ${theme.status.warning.bg} 0%, ${theme.status.warning.bg}dd 100%);
          color: ${theme.status.warning.text};
          border: 1px solid ${theme.status.warning.border};
          box-shadow: 0 2px 4px ${theme.status.warning.bg}25;
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, ${theme.status.danger.bg} 0%, ${theme.status.danger.bg}dd 100%);
          color: ${theme.status.danger.text};
          border: 1px solid ${theme.status.danger.border};
          box-shadow: 0 2px 4px ${theme.status.danger.bg}25;
        `;
      default:
        return `
          background: linear-gradient(135deg, ${theme.status.default.bg} 0%, ${theme.status.default.bg}dd 100%);
          color: ${theme.status.default.text};
          border: 1px solid ${theme.status.default.border};
          box-shadow: 0 2px 4px ${theme.status.default.bg}25;
        `;
    }
  }}

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 4px currentColor;
    animation: ${({ $variant }) => 
      $variant === 'success' || $variant === 'danger' ? 'pulse 2s ease-in-out infinite' : 'none'};
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(0.9);
    }
  }
`;

export const NotificationBadge = styled.div`
  min-width: 22px;
  height: 22px;
  padding: 0 0.375rem;
  border-radius: 11px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
  animation: bounce 0.5s ease;

  @keyframes bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
  }
`;
