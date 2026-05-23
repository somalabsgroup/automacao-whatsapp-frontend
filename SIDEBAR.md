# Componente Sidebar

## Visão Geral

Sidebar responsiva com controle de estado via Zustand e estilização com styled-components.

## Funcionalidades

- ✅ Botão hamburger para expandir/colapsar
- ✅ Menu de navegação com ícones
- ✅ Informações do usuário autenticado (nome, email, foto)
- ✅ Botão de logout
- ✅ Estado persistido no localStorage via Zustand
- ✅ Animações suaves de transição
- ✅ Totalmente tipado com TypeScript

## Estrutura de Arquivos

```
src/
├── stores/
│   └── useSidebarStore.ts          # Store Zustand para controle de estado
├── components/
│   ├── Sidebar/
│   │   ├── index.tsx               # Componente principal
│   │   └── styles.ts               # Styled components
│   └── DashboardLayout/
│       └── index.tsx               # Layout wrapper com margem dinâmica
└── lib/
    └── registry.tsx                # Registry para styled-components
```

## Como Usar

### 1. Adicionar Sidebar em uma página

```tsx
import Sidebar from '@/components/Sidebar'
import DashboardLayout from '@/components/DashboardLayout'

export default function MinhaPage() {
  const userData = {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@exemplo.com',
    imageUrl: 'https://...',
  }

  return (
    <>
      <Sidebar user={userData} />
      <DashboardLayout>
        {/* Seu conteúdo aqui */}
      </DashboardLayout>
    </>
  )
}
```

### 2. Controlar estado da Sidebar programaticamente

```tsx
'use client'

import { useSidebarStore } from '@/stores/useSidebarStore'

export function MeuComponente() {
  const { isOpen, toggleSidebar, openSidebar, closeSidebar } = useSidebarStore()

  return (
    <div>
      <button onClick={toggleSidebar}>Toggle</button>
      <button onClick={openSidebar}>Abrir</button>
      <button onClick={closeSidebar}>Fechar</button>
      <p>Sidebar está {isOpen ? 'aberta' : 'fechada'}</p>
    </div>
  )
}
```

## Itens do Menu

Os itens do menu são configurados no componente Sidebar:

- Dashboard (`/dashboard`)
- Conversas (`/conversas`)
- Follow-ups (`/follow-ups`)
- Pacientes (`/pacientes`)
- Relatórios (`/relatorios`)
- Configurações (`/configuracoes`)

## Personalização

### Alterar cores

Edite [styles.ts](src/components/Sidebar/styles.ts):

```ts
export const MenuItem = styled.a<{ $active?: boolean; $isOpen: boolean }>`
  color: ${({ $active }) => ($active ? '#2563eb' : '#6b7280')};
  background-color: ${({ $active }) => ($active ? '#eff6ff' : 'transparent')};
  // ...
`
```

### Adicionar novos itens de menu

Edite o array `menuItems` em [Sidebar/index.tsx](src/components/Sidebar/index.tsx):

```tsx
const menuItems = [
  // ... itens existentes
  {
    name: 'Novo Item',
    href: '/novo-item',
    icon: (
      <svg>...</svg>
    ),
  },
]
```

## Responsividade

- **Desktop**: Sidebar fixa à esquerda
- **Expansão**: 256px (aberta) / 80px (fechada)
- **Transição**: 0.3s ease

## Estado Persistido

O estado da sidebar (aberta/fechada) é salvo no localStorage e restaurado automaticamente ao recarregar a página.

## Integração com Supabase

A Sidebar busca automaticamente os dados do usuário autenticado via Supabase. Certifique-se de que a tabela `profiles` tenha os campos:

- `first_name`
- `last_name`
- `image_url`

## Logout

O botão de logout redireciona para `/login`. Para adicionar lógica de logout do Supabase, edite a função `handleLogout` em [Sidebar/index.tsx](src/components/Sidebar/index.tsx):

```tsx
const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
```
