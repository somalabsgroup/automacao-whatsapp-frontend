"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, UserCog, LogOut, Sun, Moon, ChevronDown } from "lucide-react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useThemeStore } from "@/stores/useThemeStore";
import {
  SidebarContainer,
  SidebarHeader,
  HamburgerButton,
  MenuList,
  MenuItem,
  MenuItemText,
  UserSection,
  UserAvatar,
  UserAvatarPlaceholder,
  UserDetails,
  UserName,
  UserEmail,
  UserMenuButton,
  UserDropdown,
  DropdownItem,
  DropdownDivider,
  DropdownIconBox,
} from "./styles";

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu]);

  const menuItems = [
    {
      name: "Mensagens",
      href: "/dashboard",
      icon: <MessageSquare size={24} />,
    },
    {
      name: "Profissionais",
      href: "/profissionais",
      icon: <UserCog size={24} />,
    },
  ];

  const handleLogout = async () => {
    router.push("/login");
  };

  const getUserInitials = () => {
    if (!user) return "DR";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "DR";
  };

  const getUserFullName = () => {
    if (!user) return "Dr. Roberto";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Usuário";
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

      <UserSection $isOpen={isOpen} ref={dropdownRef}>
        <UserMenuButton
          $isOpen={isOpen}
          onClick={() => setShowUserMenu(!showUserMenu)}
          aria-label="Menu do usuário"
          aria-expanded={showUserMenu}
        >
          {user?.imageUrl ? (
            <UserAvatar src={user.imageUrl} alt={getUserFullName()} />
          ) : (
            <UserAvatarPlaceholder>{getUserInitials()}</UserAvatarPlaceholder>
          )}
          <UserDetails $isOpen={isOpen}>
            <UserName>{getUserFullName()}</UserName>
            <UserEmail>{user?.email || "roberto@clinica.com"}</UserEmail>
          </UserDetails>
          {isOpen && (
            <ChevronDown
              size={16}
              style={{
                transition: "transform 0.2s",
                transform: showUserMenu ? "rotate(180deg)" : "rotate(0deg)",
                marginLeft: "auto",
                minWidth: "16px",
              }}
            />
          )}
        </UserMenuButton>

        {showUserMenu && (
          <UserDropdown $isOpen={isOpen}>
            <DropdownItem onClick={toggleTheme}>
              <DropdownIconBox>{mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}</DropdownIconBox>
              <span>{mode === "dark" ? "Modo Claro" : "Modo Escuro"}</span>
            </DropdownItem>

            <DropdownDivider />

            <DropdownItem $danger onClick={handleLogout}>
              <DropdownIconBox>
                <LogOut size={18} />
              </DropdownIconBox>
              <span>Sair</span>
            </DropdownItem>
          </UserDropdown>
        )}
      </UserSection>
    </SidebarContainer>
  );
}
