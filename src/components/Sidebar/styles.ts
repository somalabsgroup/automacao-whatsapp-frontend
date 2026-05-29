import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ $isOpen }) => ($isOpen ? '256px' : '80px')};
  background-color: #111827;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
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
  color: #6b7280;
  transition: color 0.2s, background-color 0.2s;
  border-radius: 0.375rem;

  &:hover {
    color: #f9fafb;
    background-color: rgba(255, 255, 255, 0.08);
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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const MenuItem = styled.a<{ $active?: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.75rem;
  color: ${({ $active }) => ($active ? '#14b8a6' : '#9ca3af')};
  background-color: ${({ $active }) => ($active ? 'rgba(20, 184, 166, 0.12)' : 'transparent')};
  border-radius: 0.5rem;
  border-left: 3px solid ${({ $active }) => ($active ? '#14b8a6' : 'transparent')};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? 'rgba(20, 184, 166, 0.18)' : 'rgba(255, 255, 255, 0.06)'};
    color: ${({ $active }) => ($active ? '#14b8a6' : '#e5e7eb')};
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
  border-top: 1px solid rgba(255, 255, 255, 0.08);
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
  background-color: #14b8a6;
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
  color: #f9fafb;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 32px;
  height: 32px;

  &:hover {
    background-color: rgba(239, 68, 68, 0.12);
    color: #ef4444;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
