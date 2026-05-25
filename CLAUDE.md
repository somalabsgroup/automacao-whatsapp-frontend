@AGENTS.md

# Automação WhatsApp - Frontend Documentation

## 📋 Contexto do Projeto

Sistema web para gestão de atendimento automatizado via WhatsApp em clínicas. Integra com Evolution API (instâncias WhatsApp), n8n (automação) e Supabase (banco de dados + realtime).

### Fluxo Geral
1. Cliente envia mensagem pelo WhatsApp
2. Evolution API recebe e envia para n8n
3. n8n processa com IA e decide: responder automaticamente OU solicitar humano
4. Dados salvos no Supabase
5. Frontend mostra em tempo real via Realtime subscriptions
6. Atendentes podem assumir conversas e responder
7. Respostas de atendentes vão: Frontend → n8n → Evolution API → WhatsApp

## 🌐 Integrações Externas

### Evolution API
- **Endpoint**: Configurado via variável de ambiente
- **Usado em**: `src/lib/services/conversations.ts`
- **Função**: Enviar mensagens de texto para WhatsApp
- **Headers necessários**: `apikey` (Evolution API key)

### n8n
- **Integração**: Via webhooks
- **Fluxo**: Evolution → n8n → Supabase
- **Não é chamado diretamente pelo frontend** (exceto sendTextMessage que usa Evolution)

### Supabase
- **Database**: PostgreSQL com RLS
- **Realtime**: Subscriptions via websocket
- **Auth**: Supabase Auth com email/password
- **Storage**: (não implementado ainda)

## 🗄️ Schema do Banco de Dados

### Tabelas Principais

#### `tenants`
```sql
id uuid PRIMARY KEY
slug text UNIQUE          -- URL-friendly identifier
name text
created_at timestamptz
```

#### `users` (Supabase Auth)
- Gerenciado pelo Supabase Auth
- Relacionado via `tenant_users`

#### `tenant_users`
```sql
id uuid PRIMARY KEY
tenant_id uuid REFERENCES tenants
user_id uuid REFERENCES auth.users
role text                 -- 'owner', 'admin', 'user'
created_at timestamptz
```

#### `patients`
```sql
id uuid PRIMARY KEY
tenant_id uuid
name text
phone text                -- Formato WhatsApp (ex: 5511999999999)
email text
created_at timestamptz
updated_at timestamptz
```

#### `conversations`
```sql
id uuid PRIMARY KEY
tenant_id uuid
patient_id uuid REFERENCES patients
patient_name text
patient_phone text
status text               -- 'ai_handling', 'human_requested', 'human_active', 'awaiting_close', 'closed'
last_message text
last_message_at timestamptz
last_message_direction text -- 'inbound', 'outbound'
last_message_sender text      -- 'patient', 'ai', 'human'
created_at timestamptz
updated_at timestamptz
```

#### `messages`
```sql
id uuid PRIMARY KEY
conversation_id uuid REFERENCES conversations
tenant_id uuid
direction text            -- 'inbound', 'outbound'
sender text              -- 'patient', 'ai', 'human'
sender_user_id uuid      -- Se sender = 'human'
type text                -- 'text', 'image', 'audio', 'document'
content text
media_url text
status text              -- 'pending', 'sent', 'delivered', 'read', 'failed'
whatsapp_message_id text -- ID da mensagem no WhatsApp
timestamp timestamptz
created_at timestamptz
```

#### `professionals`
```sql
id uuid PRIMARY KEY
tenant_id uuid
name text
specialty text           -- Ex: 'Dermatologista', 'Cirurgião Plástico'
default_duration integer -- Minutos (ex: 30, 60)
calendar_color_id text   -- '1' a '11' (Google Calendar colors)
working_hours jsonb      -- Formato: { "monday": [{"start":"09:00","end":"18:00"}], ... }
is_active boolean
notes text
created_at timestamptz
updated_at timestamptz
```

### Working Hours Format
```typescript
// UI Format (usado no frontend)
{
  monday: { start: '09:00', end: '18:00', enabled: true },
  tuesday: { start: '09:00', end: '18:00', enabled: true },
  // ...
}

// DB Format (armazenado no PostgreSQL JSONB)
{
  "monday": [{ "start": "09:00", "end": "18:00" }],
  "tuesday": [{ "start": "09:00", "end": "18:00" }],
  // ...
}

// Conversão em: src/lib/services/professionals.ts
```

## 🔐 Autenticação & Autorização

### Fluxo de Login
1. Usuário entra em `/login`
2. Middleware verifica header `x-tenant` (slug)
3. Login via Supabase Auth
4. Valida acesso na tabela `tenant_users`
5. Armazena `userData` e `tenantData` no `useUserStore` (localStorage)
6. Redirect para `/dashboard`

### Middleware
```typescript
// src/middleware.ts
// - Extrai slug da URL (ex: clinica.dominio.com → 'clinica')
// - Adiciona header 'x-tenant' com o slug
// - Todas as páginas podem acessar via headers().get('x-tenant')
```

### Helper Centralizado
```typescript
// src/lib/page-auth.ts
export async function getPageAuthData(): Promise<PageAuthData> {
  const tenantSlug = headers().get('x-tenant');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');
  
  // Fetch tenant e user data
  // Valida acesso via tenant_users
  
  return { user, tenant, supabase };
}
```

## 🎯 Features Implementadas

### ✅ Dashboard
- Header com métricas em tempo real
- Lista de conversas com filtros e busca
- Chat interface com mensagens
- Envio de mensagens de texto
- Status visual de conversas
- Realtime updates (conversas e mensagens)

### ✅ Profissionais
- Listagem com filtro ativo/inativo
- Formulário de cadastro/edição
- Validação com Zod
- Horários de trabalho por dia da semana
- Cores do Google Calendar (11 opções)
- Ativar/Desativar profissional
- CRUD completo

### ✅ Autenticação
- Login com email/password
- Multi-tenant via subdomain
- Validação de acesso por tenant
- Armazenamento persistente de sessão

### 🚧 Em Desenvolvimento / Próximos Passos
- [ ] Pacientes: CRUD completo
- [ ] Follow-ups: Agendamento e visualização
- [ ] Relatórios: Analytics e métricas
- [ ] Configurações: Preferências do tenant
- [ ] Upload de arquivos no chat
- [ ] Notificações push
- [ ] Histórico de conversas arquivadas

## 🎨 Design System

### Cores de Avatar (Conversas)
```typescript
const AVATAR_COLORS = {
  green: '#10b981',
  orange: '#f97316',
  red: '#ef4444',
  purple: '#a855f7',
  blue: '#3b82f6',
};
```

### Cores do Google Calendar (Profissionais)
```typescript
const CALENDAR_COLORS = {
  '1': '#ac725e', '2': '#d06b64', '3': '#f83a22',
  '4': '#fa573c', '5': '#ff6f00', '6': '#ffad46',
  '7': '#42d692', '8': '#16a765', '9': '#7bd148',
  '10': '#b3dc6c', '11': '#fbe983',
};
```

### Status Badges
```typescript
// Conversas
ai_handling → Verde (#10b981)
human_requested → Laranja (#f97316)
human_active → Azul (#3b82f6)
awaiting_close → Cinza (#6b7280)
closed → Cinza escuro (#374151)

// Mensagens
pending → Amarelo
sent → Azul
delivered → Verde
read → Verde escuro
failed → Vermelho
```

## 📱 Responsividade

### Breakpoints
```css
Desktop: > 1024px   (sidebar 256px, conversas 360px, chat flex)
Tablet:  768-1024px (sidebar 80px, conversas 300px, chat flex)
Mobile:  < 768px    (sidebar hidden, conversas fullscreen OU chat fullscreen)
```

### Sidebar
- Desktop: 256px aberta, 80px fechada
- Mobile: Sempre fechada (só ícones)

### ContentLayout (Dashboard)
- Desktop: Conversas + Chat lado a lado
- Tablet: Conversas + Chat lado a lado (conversas 300px)
- Mobile: Toggle entre Conversas OU Chat

## 🔄 Estado Global (Zustand)

### useConversationStore
```typescript
{
  selectedConversationId: string | null,
  filter: ConversationFilter,
  searchQuery: string,
  setSelectedConversation: (id) => void,
  setSearchQuery: (query) => void,
}
```

### useSidebarStore
```typescript
{
  isOpen: boolean,
  toggle: () => void,
}
```

### useUserStore (com persist)
```typescript
{
  userData: UserData | null,
  tenantData: TenantData | null,
  setUserData: (data) => void,
  setTenantData: (data) => void,
  clearData: () => void,
}
```

## 🧪 Testing Notes

### Dados de Teste
- Mock data em `src/utils/mockData.ts`
- Usado para desenvolvimento offline

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
EVOLUTION_API_URL=https://evolution.api.com
EVOLUTION_API_KEY=xxx
```

## 🚀 Deployment

### Build
```bash
npm run build
# Gera .next/ com SSR + Static exports
```

### Verificações Pré-Deploy
- [ ] Todas as variáveis de ambiente configuradas
- [ ] RLS policies habilitadas em todas as tabelas
- [ ] Migration scripts executados no Supabase
- [ ] TypeScript sem erros (`tsc --noEmit`)
- [ ] ESLint sem warnings críticos

## 📚 Referências

### Documentação Oficial
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Styled Components](https://styled-components.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Zod](https://zod.dev)

### APIs Externas
- [Evolution API](https://doc.evolution-api.com)
- [n8n Documentation](https://docs.n8n.io)

## 🐛 Troubleshooting Comum

### "clerk_org_id does not exist"
- **Causa**: RLS policies antigas referenciando coluna inexistente
- **Solução**: Executar `remove-clerk-references.sql` no SQL Editor

### "Cannot read properties of undefined (reading 'map')"
- **Causa**: Dados iniciais não chegaram do servidor
- **Solução**: Adicionar loading state ou default value `[]`

### Realtime não atualiza
- **Verificar**: RLS policies permitem SELECT para o usuário atual
- **Verificar**: Filter do channel está correto (`tenant_id=eq.${id}`)
- **Verificar**: Subscription está sendo unsubscribed no cleanup

### Build falha com "Module not found"
- **Verificar**: Imports usam `@/` alias (configurado no tsconfig.json)
- **Verificar**: Extensões `.ts` e `.tsx` estão corretas
- **Verificar**: Client components tem 'use client' no topo

---

**Última atualização**: Maio 2026
**Versão**: 0.1.0
**Desenvolvido por**: SomaLabs
