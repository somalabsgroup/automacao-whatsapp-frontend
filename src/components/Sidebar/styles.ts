import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ $isOpen }) => ($isOpen ? '256px' : '80px')};
  background-color: ${({ theme }) => theme.sidebar.bg};
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, background-color 0.2s ease;
  z-index: 1000;
`;

export const SidebarHeader = styled.div<{ $isOpen: boolean }>`
  padding: 0rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-end' : 'center')};
  min-height: 32px;
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.sidebar.iconColor};
  transition: color 0.2s, background-color 0.2s;
  border-radius: 0.375rem;

  &:hover {
    color: ${({ theme }) => theme.sidebar.iconHoverColor};
    background-color: ${({ theme }) => theme.sidebar.buttonHoverBg};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const MenuList = styled.nav`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const MenuItem = styled.a<{ $active?: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.75rem;
  color: ${({ $active, theme }) => ($active ? theme.sidebar.activeText : theme.sidebar.itemText)};
  background-color: ${({ $active, theme }) =>
    $active ? theme.sidebar.activeBg : 'transparent'};
  border-radius: 0.5rem;
  border-left: 3px solid
    ${({ $active, theme }) => ($active ? theme.sidebar.activeText : 'transparent')};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.sidebar.activeHoverBg : theme.sidebar.hoverBg};
    color: ${({ $active, theme }) =>
      $active ? theme.sidebar.activeText : theme.sidebar.hoverText};
  }

  svg {
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-right: ${({ $isOpen }) => ($isOpen ? '0.75rem' : '0')};
  }
`;

export const MenuItemText = styled.span<{ $isOpen: boolean }>`
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: opacity 0.2s;
  overflow: hidden;
  white-space: nowrap;
`;

export const UserSection = styled.div<{ $isOpen: boolean }>`
  border-top: 1px solid ${({ theme }) => theme.sidebar.border};
  padding: 1rem;
  position: relative;
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.brand.primary};
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.3);
`;

export const UserAvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #0f766e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.25);
`;

export const UserDetails = styled.div<{ $isOpen: boolean }>`
  flex: 1;
  min-width: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: opacity 0.2s;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.sidebar.userName};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.sidebar.userEmail};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserMenuButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${({ $isOpen }) => ($isOpen ? '0.5rem' : '0')};
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.sidebar.userName};

  &:hover {
    background: ${({ theme, $isOpen }) => ($isOpen ? theme.sidebar.buttonHoverBg : 'transparent')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const UserDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: ${({ $isOpen }) => ($isOpen ? '1rem' : '0.5rem')};
  right: ${({ $isOpen }) => ($isOpen ? 'auto' : '0.5rem')};
  width: ${({ $isOpen }) => ($isOpen ? 'calc(100% - 2rem)' : 'auto')};
  min-width: ${({ $isOpen }) => ($isOpen ? 'auto' : '220px')};
  background: ${({ theme }) => theme.dropdown.bg};
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  overflow: hidden;
  z-index: 1000;
  animation: slideUp 0.2s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme, $danger }) => ($danger ? '#ef4444' : theme.dropdown.text)};
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: ${({ theme, $danger }) =>
      $danger ? theme.dropdown.dangerHoverBg : theme.dropdown.hoverBg};
  }

  &:active {
    background: ${({ theme, $danger }) =>
      $danger ? theme.dropdown.dangerActiveBg : theme.dropdown.activeBg};
  }

  span {
    flex: 1;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.dropdown.border};
  margin: 0.25rem 0;
`;

export const DropdownIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.dropdown.activeBg};
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;
