# Integração com Supabase - Dashboard

## ✅ O que foi implementado

### 1. Serviços de Dados (`src/lib/services/`)

#### **conversations.ts**
- `getConversations()` - Busca todas as conversas do tenant com última mensagem
- `getConversationById()` - Busca conversa específica
- `updateConversationStatus()` - Atualiza status da conversa

**Status de conversas:**
- `ai_handling` - IA está tratando a conversa
- `human_requested` - Paciente solicitou atendimento humano
- `human_active` - Atendente humano ativo
- `awaiting_close` - Aguardando fechamento
- `closed` - Conversa encerrada

**Campos da tabela `conversations`:**
- `id`, `tenant_id`, `patient_id`
- `status` (enum com valores acima)
- `assigned_user_id` - ID do usuário responsável
- `handoff_reason` - Motivo de transferência para humano
- `last_message_at` - Data da última mensagem (atualizada automaticamente via trigger)
- `created_at`, `closed_at`, `close_reason`
- `context` (JSONB) - Contexto adicional da conversa

#### **messages.ts**
- `getMessagesByConversation()` - Busca todas as mensagens de uma conversa
- `sendMessage()` - Envia nova mensagem
- `updateMessageStatus()` - Atualiza status da mensagem
- `subscribeToMessages()` - Realtime subscription para novas mensagens

**Tipos de mensagem (sender):**
- `patient` - Mensagem do paciente
- `ai` - Mensagem gerada pela IA
- `human` - Mensagem enviada por atendente humano

**Direction:**
- `inbound` - Mensagem recebida
- `outbound` - Mensagem enviada

**Status de mensagens:**
- `pending` - Aguardando envio
- `sent` - Enviada
- `delivered` - Entregue
- `read` - Lida
- `failed` - Falha no envio

**Message types:**
- `text`, `image`, `audio`, `video`, `document`, `sticker`, `location`

**Campos da tabela `messages`:**
- `id`, `tenant_id`, `conversation_id`
- `whatsapp_message_id` - ID da mensagem no WhatsApp
- `direction` (inbound/outbound)
- `sender` (patient/ai/human)
- `sender_user_id` - ID do usuário se sender=human
- `message_type` (text, image, etc)
- `content` - Texto da mensagem
- `media_url` - URL do arquivo de mídia
- `status` (pending, sent, delivered, read, failed)
- `raw_payload` (JSONB) - Payload bruto do WhatsApp
- `created_at`, `deleted_at`

**Trigger automático:**
- `trg_message_updates_conversation` - Atualiza `last_message_at` automaticamente ao inserir mensagem

### 2. Componentes Atualizados

#### **Dashboard Page** (`src/app/dashboard/page.tsx`)
- ✅ Busca conversas reais do Supabase ao invés de mock data
- ✅ Filtra por `tenant_id` do usuário logado
- ✅ Passa `tenantId` e `userId` para ChatWrapper

#### **ChatWrapper** (`src/components/ChatWrapper.tsx`)
- ✅ Recebe `tenantId` e `userId` como props
- ✅ Busca mensagens reais quando conversa é selecionada
- ✅ Inscrição em tempo real para receber novas mensagens automaticamente
- ✅ Envia mensagens para o Supabase com os parâmetros corretos
- 🚧 Upload de arquivos para Supabase Storage ainda não implementado (TODO)

#### **MessageBubble** (`src/components/Chat/MessageBubble.tsx`)
- ✅ Atualizado para usar `ai` ao invés de `bot`
- ✅ Suporta `mediaUrl` do banco de dados
- ✅ Mantém compatibilidade com `attachments` para fallback
- ✅ Status `pending` ao invés de `sending`

#### **ChatHeader** (`src/components/Chat/ChatHeader.tsx`)
- ✅ Atualizado para os novos status de conversa

#### **ConversationList** (`src/components/ConversationList/`)
- ✅ Filtros atualizados para os novos status
- ✅ Labels dos status atualizados
- ✅ Cores dos badges atualizadas

#### **Types** (`src/types/index.ts`)
- ✅ `ConversationStatus` atualizado com novos valores
- ✅ `MessageSender` agora usa `ai` ao invés de `bot`
- ✅ `MessageDirection` adicionado
- ✅ `MessageType` expandido com video, sticker, location
- ✅ `ChatMessage` atualizado com todos os campos do banco
- ✅ Interface `Conversation` atualizada com novos campos

### 3. Estrutura das Tabelas no Supabase

#### **conversations**
```sql
create table public.conversations (
  id uuid not null default gen_random_uuid (),
  tenant_id uuid not null,
  patient_id uuid not null,
  status text not null default 'ai_handling'::text,
  assigned_user_id uuid null,
  handoff_reason text null,
  last_message_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  closed_at timestamp with time zone null,
  close_reason text null,
  context jsonb not null default '{}'::jsonb,
  -- constraints e indexes omitidos para brevidade
)
```

#### **messages**
```sql
create table public.messages (
  id uuid not null default gen_random_uuid (),
  tenant_id uuid not null,
  conversation_id uuid not null,
  whatsapp_message_id text null,
  direction text not null,
  sender text not null,
  sender_user_id uuid null,
  message_type text not null default 'text'::text,
  content text null,
  media_url text null,
  status text not null default 'pending'::text,
  raw_payload jsonb null,
  created_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null,
  -- constraints e indexes omitidos para brevidade
)
```

**Trigger importante:**
```sql
create trigger trg_message_updates_conversation
after INSERT on messages for EACH row
execute FUNCTION update_conversation_last_message ();
```

## 🚧 Próximas etapas necessárias

### 1. Row Level Security (RLS)

Adicionar policies para segurança:

```sql
-- Conversas: apenas do tenant do usuário
CREATE POLICY "Users can view conversations from their tenant"
  ON conversations FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid()
  ));

-- Mensagens: apenas de conversas do tenant
CREATE POLICY "Users can view messages from their tenant conversations"
  ON messages FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM conversations WHERE tenant_id IN (
      SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can insert messages to their tenant conversations"
  ON messages FOR INSERT
  WITH CHECK (conversation_id IN (
    SELECT id FROM conversations WHERE tenant_id IN (
      SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid()
    )
  ));
```

### 2. Realtime

Habilitar realtime para a tabela `messages`:

```sql
-- No dashboard do Supabase:
-- Database > Replication > Enable realtime for 'messages' table
```

### 3. Storage para arquivos (opcional)

Se for usar upload de arquivos:

```sql
-- Criar bucket para attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('message-media', 'message-media', true);

-- Policy para upload
CREATE POLICY "Users can upload attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'message-media' AND auth.role() = 'authenticated');
```

### 4. Implementar upload de arquivos

No `ChatWrapper.tsx`, substituir o TODO por código real de upload:

```typescript
// Upload para Supabase Storage
const file = attachments[0];
const fileExt = file.name.split('.').pop();
const fileName = `${Date.now()}.${fileExt}`;
const { data, error } = await supabase.storage
  .from('message-media')
  .upload(`${tenantId}/${fileName}`, file);

if (!error && data) {
  const { data: { publicUrl } } = supabase.storage
    .from('message-media')
    .getPublicUrl(data.path);
  
  mediaUrl = publicUrl;
}
```

### 5. Métricas do Header

Adicionar queries para buscar:
- Total de conversas ativas
- Conversas aguardando ação humana
- Follow-ups hoje
- Status do sistema

### 6. Tratamento de erros

Adicionar:
- Notificações toast para erros
- Loading states mais elaborados
- Retry logic para falhas de rede
- Skeleton loaders enquanto carrega

### 7. Criar função update_conversation_last_message

Se ainda não existir, criar a função PostgreSQL usada pelo trigger:

```sql
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## 🧪 Como testar

1. Certifique-se que tem dados nas tabelas `conversations`, `messages` e `patients`
2. Acesse o dashboard através do subdomínio correto (ex: clinica-exemplo.seudominio.com)
3. As conversas devem aparecer na lista filtradas pelo tenant
4. Ao clicar em uma conversa, as mensagens devem carregar do banco
5. Envie uma mensagem - deve aparecer em tempo real
6. Abra a mesma conversa em outra aba - mensagens devem sincronizar

## 📝 Notas Importantes

- ✅ O código já está preparado para realtime, mas precisa habilitar no Supabase
- 🚧 Anexos de arquivos ainda não fazem upload para Storage - implementar
- ✅ A cor do avatar é gerada com base no ID da conversa
- ✅ As iniciais são extraídas automaticamente do nome do paciente
- ✅ O trigger `trg_message_updates_conversation` atualiza `last_message_at` automaticamente
- ✅ Status de mensagens alinhado com WhatsApp (pending → sent → delivered → read)
- ✅ Direção das mensagens (inbound/outbound) facilita queries e relatórios
- ✅ `raw_payload` armazena o payload completo do WhatsApp para auditoria
- ✅ Soft delete com `deleted_at` permite recuperação de mensagens
