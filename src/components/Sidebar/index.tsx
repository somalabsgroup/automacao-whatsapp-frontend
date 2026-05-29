'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  UserCog,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useThemeStore } from '@/stores/useThemeStore';
import {
  SidebarContainer,
  SidebarHeader,
  HamburgerButton,
  MenuList,
  MenuItem,
  MenuItemText,
  UserSection,
  UserInfo,
  UserAvatar,
  UserAvatarPlaceholder,
  UserDetails,
  UserName,
  UserEmail,
  LogoutButton,
  ThemeToggleButton,
} from './styles';

interface SidebarProps {
  user?: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    imageUrl?: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { mode, toggleTheme } = useThemeStore();

  const menuItems = [
    {
      name: 'Mensagens',
      href: '/dashboard',
      icon: <MessageSquare size={24} />,
    },
    {
      name: 'Profissionais',
      href: '/profissionais',
      icon: <UserCog size={24} />,
    },
  ];

  const handleLogout = async () => {
    router.push('/login');
  };

  const getUserInitials = () => {
    if (!user) return 'DR';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'DR';
  };

  const getUserFullName = () => {
    if (!user) return 'Dr. Roberto';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Usuário';
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader $isOpen={isOpen}>
        <HamburgerButton onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </HamburgerButton>
      </SidebarHeader>

      <MenuList>
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            href={item.href}
            $active={pathname === item.href}
            $isOpen={isOpen}
            onClick={(e) => {
              e.preventDefault();
              router.push(item.href);
            }}
          >
            {item.icon}
            <MenuItemText $isOpen={isOpen}>{item.name}</MenuItemText>
          </MenuItem>
        ))}
      </MenuList>

      <UserSection $isOpen={isOpen}>
        <UserInfo $isOpen={isOpen}>
          {user?.imageUrl ? (
            <UserAvatar src={user.imageUrl} alt={getUserFullName()} />
          ) : (
            <UserAvatarPlaceholder>{getUserInitials()}</UserAvatarPlaceholder>
          )}
          <UserDetails $isOpen={isOpen}>
            <UserName>{getUserFullName()}</UserName>
            <UserEmail>{user?.email || 'roberto@clinica.com'}</UserEmail>
          </UserDetails>
        </UserInfo>
        <ThemeToggleButton
          onClick={toggleTheme}
          title={mode === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </ThemeToggleButton>
        <LogoutButton onClick={handleLogout} title="Sair">
          <LogOut size={20} />
        </LogoutButton>
      </UserSection>
    </SidebarContainer>
  );
}
