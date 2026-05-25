<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Rules - Automação WhatsApp Frontend

## 🎯 Projeto Overview
Sistema de automação de atendimento via WhatsApp para clínicas. Interface web para gerenciar conversas, pacientes, profissionais e follow-ups.

## 📚 Stack Tecnológica

### Core
- **Next.js 16.2.6**: App Router, Server Components, Client Components
- **React 19.2.4**: Último stable release
- **TypeScript 5**: Strict mode habilitado
- **Styled Components 6.4.2**: CSS-in-JS com tema

### Estado e Dados
- **Zustand 5.0.13**: State management com persist middleware
- **Supabase**: PostgreSQL + Realtime + Authentication
- **Zod 4.4.3**: Validação de schemas e forms

### UI/UX
- **Lucide React**: Ícones
- **Emoji Picker React**: Seletor de emojis para chat
- **Axios**: HTTP client para APIs externas

## 🏗️ Arquitetura

### Padrão de Componentes
```
SEMPRE seguir esta estrutura:
src/components/NomeComponente/
  ├── index.tsx          # Componente principal (lógica + markup)
  └── styles.ts          # Styled components isolados
```

### Server vs Client Components
```typescript
// SERVER COMPONENT (default no App Router)
// - Pode usar async/await direto
// - Acessa headers(), cookies()
// - Não pode usar hooks (useState, useEffect)
// - Ideal para: páginas, layouts, data fetching inicial
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// CLIENT COMPONENT (precisa de 'use client')
// - Usa hooks React
// - Event handlers (onClick, onChange)
// - Acessa browser APIs (localStorage, window)
'use client';
export default function Component() {
  const [state, setState] = useState();
  return <div onClick={handler} />;
}
```

### Padrão de Páginas
```typescript
// src/app/nome-rota/page.tsx (SEMPRE server component)
import { getPageAuthData } from '@/lib/page-auth';

export default async function NomeRota() {
  // 1. Autenticação centralizada
  const { user, tenant, supabase } = await getPageAuthData();
  
  // 2. Fetch inicial de dados
  const data = await fetchData(supabase, tenant.id);
  
  // 3. Render com sidebar + layout + client component
  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <ClientContent initialData={data} tenantId={tenant.id} />
      </DashboardLayout>
    </>
  );
}
```

## 🔐 Autenticação

### Centralizada com getPageAuthData
```typescript
// SEMPRE use este helper em páginas protegidas
const { user, tenant, supabase } = await getPageAuthData();

// Retorna:
// - user: UserData (id, firstName, lastName, email, imageUrl)
// - tenant: TenantData (id, slug, name)
// - supabase: Cliente Supabase configurado

// Automático:
// - Redirect para /login se não autenticado
// - Valida tenant via header 'x-tenant'
// - Verifica acesso na tabela tenant_users
```

### Stores de Autenticação
```typescript
// useUserStore - persiste no localStorage
const { userData, tenantData, setUserData, setTenantData } = useUserStore();
```

## 💾 Banco de Dados

### Padrão Supabase
```typescript
// SEMPRE use server-side client em server components
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();

// Use client-side APENAS em client components
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

### RLS Policies
```sql
-- Todas as tabelas DEVEM ter:
-- 1. tenant_id para isolamento
-- 2. RLS habilitado
-- 3. Policies baseadas em tenant_users

CREATE POLICY "policy_name" ON table_name
  USING (tenant_id IN (
    SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid()
  ));
```

### Padrão de Service
```typescript
// src/lib/services/nome.ts
export async function getData(supabase: SupabaseClient, tenantId: string) {
  const { data, error } = await supabase
    .from('table')
    .select('*')
    .eq('tenant_id', tenantId);
  
  if (error) throw error;
  return data.map(convertToType);
}
```

## 🔄 Realtime

### Pattern de Realtime
```typescript
// 1. Hook personalizado para gerenciar subscriptions
export function useRealtimeData(initialData: Type[], tenantId: string) {
  const [data, setData] = useState(initialData);
  const supabase = createClient();
  
  useEffect(() => {
    const channel = supabase
      .channel('table-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'table_name',
        filter: `tenant_id=eq.${tenantId}`
      }, (payload) => {
        // Atualizar estado local
      })
      .subscribe();
    
    return () => { channel.unsubscribe(); };
  }, [tenantId]);
  
  return data;
}

// 2. Wrapper client component que usa o hook
'use client';
export default function ContentWrapper({ initialData, tenantId }) {
  const data = useRealtimeData(initialData, tenantId);
  return <Component data={data} />;
}
```

## 🎨 Styled Components

### Convenções
```typescript
// src/components/Component/styles.ts
import styled from 'styled-components';

// 1. Export named (não default)
export const Container = styled.div`
  // styles
`;

// 2. Props dinâmicas com $prefix
export const Button = styled.button<{ $variant: string }>`
  background: ${({ $variant }) => $variant === 'primary' ? '#000' : '#fff'};
`;

// 3. Responsive com media queries
export const Card = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
```

### Tema e Cores
```typescript
// Cores padrão do projeto
const colors = {
  primary: '#14b8a6',      // Teal
  success: '#10b981',      // Green
  warning: '#f59e0b',      // Amber
  error: '#ef4444',        // Red
  info: '#3b82f6',         // Blue
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    // ...
    900: '#111827',
  }
};
```

## 📝 Formulários com Zod

### Pattern
```typescript
import { z } from 'zod';

// 1. Schema Zod
const schema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido'),
});

// 2. Validação no submit
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  try {
    const validated = schema.parse(formData);
    await saveData(validated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach(issue => {
        setErrors(prev => ({ ...prev, [issue.path[0]]: issue.message }));
      });
    }
  }
};
```

## 🚨 Regras Críticas

### SEMPRE
1. **Use getPageAuthData()** em todas as páginas protegidas
2. **'use client'** no topo se usar hooks ou event handlers
3. **tenant_id** em TODAS as queries ao banco
4. **Componentes + styles.ts separados** (nunca inline styles)
5. **Conversão de tipos** do DB para interface TypeScript
6. **Loading states** em todas as operações assíncronas
7. **Error handling** com try/catch e mensagens ao usuário
8. **Realtime** via hooks customizados (não direto nos components)

### NUNCA
1. ❌ Chamadas diretas ao Supabase em componentes (use services)
2. ❌ Hardcode de tenant_id ou user_id
3. ❌ useState para dados que vêm do servidor sem realtime
4. ❌ Fetch de dados em client components (use server component)
5. ❌ Criar tabelas sem RLS policies
6. ❌ Expor variáveis de ambiente no client (use NEXT_PUBLIC_ prefix)
7. ❌ Múltiplos arquivos de estilo por componente

## 📊 Tipos e Interfaces

### Conversão DB → TypeScript
```typescript
// SEMPRE converta tipos ao buscar do banco
function convertFromDB(dbRow: any): TypeScriptType {
  return {
    ...dbRow,
    createdAt: new Date(dbRow.created_at),  // snake_case → camelCase
    workingHours: convertWorkingHours(dbRow.working_hours), // JSONB → Object
  };
}
```

### Status de Conversa
```typescript
type ConversationStatus = 
  | 'ai_handling'      // Bot está atendendo
  | 'human_requested'  // Cliente pediu humano
  | 'human_active'     // Humano está atendendo
  | 'awaiting_close'   // Esperando encerramento
  | 'closed';          // Finalizada
```

## 🎭 UX Patterns

### Mensagens Otimistas
```typescript
// 1. Adicionar ao estado imediatamente
const optimisticMsg = { id: `temp-${Date.now()}`, ...data, isOptimistic: true };
setMessages(prev => [...prev, optimisticMsg]);

// 2. Enviar ao servidor
await sendToServer(data);

// 3. Realtime substitui a mensagem otimista pela real
```

### Status Visual sem Persistência
```typescript
// Atualização APENAS no estado local (não salva no banco)
const updateStatusLocal = (id: string, status: Status) => {
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, status } : item
  ));
};
```

## 🔧 Performance

### useMemo para Cálculos
```typescript
const metrics = useMemo(() => {
  const total = conversations.length;
  const active = conversations.filter(c => c.status === 'active').length;
  return { total, active };
}, [conversations]); // Recalcula apenas quando conversations muda
```

### Scroll Optimization
```typescript
// DashboardLayout: scroll vertical permitido
overflow-y: auto;
overflow-x: hidden;

// ContentLayout (chat): sem scroll (painéis internos controlam)
overflow: hidden;
```

## 📂 Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router (pages)
│   ├── (auth)/            # Grupo de rotas (sem afetar URL)
│   │   ├── layout.tsx     # Layout específico de auth
│   │   └── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── profissionais/page.tsx
│   ├── layout.tsx         # Root layout
│   └── globals.css
├── components/            # Componentes React
│   ├── Chat/
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   ├── MessageBubble.tsx
│   │   └── MessageInput.tsx
│   └── ...
├── lib/                   # Utilidades e configurações
│   ├── services/         # Services do Supabase
│   ├── supabase/         # Clients Supabase
│   ├── auth.ts           # Helpers de auth
│   └── page-auth.ts      # getPageAuthData()
├── stores/               # Zustand stores
├── types/                # TypeScript interfaces
└── utils/                # Funções auxiliares
```

## 🔍 Debugging

### Supabase RLS Issues
```sql
-- Ver policies ativas
SELECT * FROM pg_policies WHERE tablename = 'table_name';

-- Testar policy manualmente
SELECT * FROM table_name WHERE tenant_id IN (
  SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid()
);
```

### Next.js Build Errors
- Sempre verifique se client components tem 'use client'
- Server components NÃO podem passar funções como props
- Use router.refresh() após mutations no servidor
