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

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.sidebar.scrollThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.sidebar.scrollThumbHover};
  }
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
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  gap: 0.5rem;
`;

export const UserInfo = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
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

export const SidebarIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.sidebar.iconColor};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 32px;
  height: 32px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LogoutButton = styled(SidebarIconButton)`
  &:hover {
    background-color: rgba(239, 68, 68, 0.12);
    color: #ef4444;
  }
`;

export const ThemeToggleButton = styled(SidebarIconButton)`
  &:hover {
    background-color: ${({ theme }) => theme.sidebar.buttonHoverBg};
    color: ${({ theme }) => theme.sidebar.iconHoverColor};
  }
`;
