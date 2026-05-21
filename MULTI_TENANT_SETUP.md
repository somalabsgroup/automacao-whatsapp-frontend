# Configuração do Multi-Tenant com Clerk

## Estrutura de Dados

Os tenants (clínicas) são armazenados no `publicMetadata` do usuário no Clerk:

```typescript
{
  "publicMetadata": {
    "tenants": [
      {
        "id": "tenant_123",
        "slug": "clinica-exemplo",
        "role": "owner" | "admin" | "user",
        "name": "Clínica Exemplo"
      }
    ]
  }
}
```

## Configuração no Clerk Dashboard

### 1. Variáveis de Ambiente

Adicione no seu `.env.local` e na **Vercel**:

```bash
CLERK_SECRET_KEY=sk_test_your_secret_key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
BASE_DOMAIN=somaclini.com.br
VITE_BASE_DOMAIN=somaclini.com.br
```

### 2. Configurar Domains no Clerk

No Clerk Dashboard:
1. Vá em **Domains**
2. Adicione os domínios:
   - `somaclini.com.br`
   - `*.somaclini.com.br` (wildcard para subdomínios)
   - `localhost` (desenvolvimento)
   - `*.localhost` (desenvolvimento com subdomínios)

### 3. Gerenciar Usuários e Tenants

#### Adicionar usuário a uma clínica via API:

```typescript
import { addTenantToUser } from "~/utils/tenant-management.server";

await addTenantToUser("user_xxx", {
  id: "tenant_123",
  slug: "clinica-exemplo",
  role: "admin",
  name: "Clínica Exemplo"
});
```

#### Via Clerk Dashboard (manual):

1. Vá em **Users**
2. Selecione o usuário
3. Clique em **Metadata** → **Public metadata**
4. Adicione:
```json
{
  "tenants": [
    {
      "id": "tenant_123",
      "slug": "clinica-exemplo",
      "role": "owner",
      "name": "Clínica Exemplo"
    }
  ]
}
```

## Como Funciona

### URLs e Roteamento

- **Domínio principal**: `somaclini.com.br` → Landing page pública
- **Subdomínio**: `clinica-exemplo.somaclini.com.br` → Dashboard da clínica

### Fluxo de Autenticação

1. Usuário acessa `clinica-exemplo.somaclini.com.br`
2. Middleware verifica autenticação via cookie `__session`
3. Busca usuário no Clerk
4. Verifica se tem `clinica-exemplo` nos tenants do `publicMetadata`
5. Se sim → acessa o dashboard
6. Se não → redireciona para `/unauthorized`

### Roles

- **owner**: Dono da clínica (acesso total)
- **admin**: Administrador (acesso quase total)
- **user**: Usuário comum (acesso limitado)

## Desenvolvimento Local

Para testar com subdomínios localmente:

1. Edite seu arquivo `hosts`:
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - Mac/Linux: `/etc/hosts`

2. Adicione:
```
127.0.0.1 clinica-exemplo.localhost
127.0.0.1 outra-clinica.localhost
```

3. Acesse: `http://clinica-exemplo.localhost:5173`

## Próximos Passos

1. ✅ Integração com Clerk Backend implementada
2. ⏳ Criar API routes para gerenciar tenants
3. ⏳ Criar interface admin para adicionar usuários
4. ⏳ Implementar convites por email
5. ⏳ Adicionar auditoria de acessos

## Troubleshooting

### "Cannot find module '@clerk/backend'"
```bash
npm install @clerk/backend
```

### "CLERK_SECRET_KEY not found"
Configure a variável de ambiente no `.env.local` e na Vercel.

### Cookies não funcionam com subdomínios
Certifique-se de que os domínios estão configurados no Clerk Dashboard.
