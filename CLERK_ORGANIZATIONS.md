# Configuração do Clerk com Organizations (Plano Free)

## ✅ Por que usar Organizations?

- **✅ Disponível no plano FREE do Clerk**
- **Nativo e otimizado** - melhor que public metadata
- **Gerenciamento simplificado** - Clerk gerencia membros automaticamente
- **Roles integrados** - admin, member nativos
- **Melhor performance** - dados já no sessionClaims

## ⚙️ Passo a Passo: Configuração no Clerk Dashboard

### 1. **Habilitar Organizations**

**Caminho:** `Organizations` → `Settings`

Configure:
- ✅ **Enable organizations**
- ✅ **Require a unique organization slug**
- ⚠️ **Disable personal accounts** (opcional - desabilite se não quiser que usuários criem orgs)

### 2. **Allowed Origins (CORS)**

**Caminho:** `Settings` → `General` → `Allowed Origins`

Adicione:
```
https://somaclini.com.br
https://*.somaclini.com.br
http://localhost:3000
```

### 3. **Satellite Domains** (Recomendado)

**Caminho:** `Settings` → `Domains` → `Satellite`

Adicione:
```
*.somaclini.com.br
```

### 4. **Desabilitar Sign-ups**

**Caminho:** `Settings` → `Restrictions`

Configure:
- ✅ **Disable sign-ups** (apenas admin convida)
- ✅ **Email verification required**

## 🏢 Como Criar Organizations

### Via Dashboard:

1. **Acesse:** `Organizations` → `Create organization`
2. **Preencha:**
   - **Name:** "Clínica Teste"  
   - **Slug:** `clinica-teste` ⚠️ **DEVE SER IGUAL AO SUBDOMÍNIO**
3. **Clique:** `Create`

### Via API:

```typescript
import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient();
const org = await client.organizations.createOrganization({
  name: "Clínica Teste",
  slug: "clinica-teste", // = subdomínio
  createdBy: adminUserId
});
```

## 👥 Como Adicionar Usuários

### Via Dashboard:

1. **Acesse** a organização criada
2. **Members** → `Invite member`
3. Digite o **email**
4. Escolha o **role** (admin/member)
5. **Send invitation**

### Via API:

```typescript
// Adicionar membro existente
await client.organizations.createOrganizationMembership({
  organizationId: "org_xxx",
  userId: "user_xxx",
  role: "admin" // ou "member"
});

// Criar convite por email
await client.organizations.createOrganizationInvitation({
  organizationId: "org_xxx",
  emailAddress: "usuario@exemplo.com",
  role: "member"
});
```

## 🔒 Como Funciona a Validação

```
1. Usuário acessa: clinica-teste.somaclini.com.br
                        ↓
2. Middleware extrai: subdomain = "clinica-teste"
                        ↓
3. Pega organizations do usuário via sessionClaims
                        ↓
4. Verifica: alguma org.slug === "clinica-teste"?
                        ↓
   ✅ SIM → Permite acesso
   ❌ NÃO → /unauthorized
```

## 🚨 Casos de Bloqueio

❌ Usuário tenta acessar `teste.somaclini.com.br` mas só pertence a `clinica-teste`  
❌ Usuário não logado tenta acessar qualquer subdomínio  
❌ Usuário logado mas não pertence a nenhuma org  
❌ Slug da org diferente do subdomínio

**Exemplo:**
```
Usuário pertence a: org.slug = "clinica-teste"
Acessa: teste.somaclini.com.br
Resultado: ❌ BLOQUEADO ("clinica-teste" !== "teste")
```

## ⚠️ REGRA IMPORTANTE: Slug = Subdomínio

O **slug da organization** DEVE ser **EXATAMENTE** igual ao subdomínio:

✅ **CORRETO:**
```
Org slug: clinica-teste
Subdomain: clinica-teste.somaclini.com.br
→ FUNCIONA
```

❌ **ERRADO:**
```
Org slug: clinica_teste (underscore)
Subdomain: clinica-teste (hífen)
→ NÃO FUNCIONA
```

## 📋 Estrutura dos Dados

### sessionClaims.org_memberships:
```typescript
[
  {
    id: "orgmem_xxx",
    slug: "clinica-teste",
    role: "admin",
    organization: {
      id: "org_xxx",
      name: "Clínica Teste",
      slug: "clinica-teste"
    }
  }
]
```

## 🔐 Variáveis de Ambiente

```env
# Clerk Keys (obrigatórias)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Domain (obrigatório)
NEXT_PUBLIC_BASE_DOMAIN=somaclini.com.br

# Endpoints (opcional)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
```

## 🐛 Debug

Execute `npm run dev` e veja os logs:

```
[Middleware] Hostname: clinica-teste.somaclini.com.br
[Middleware] Subdomain: clinica-teste
[Middleware] Organizations: [{"slug":"clinica-teste","role":"admin"}]
[Middleware] Comparando "clinica-teste" === "clinica-teste": true
[Middleware] ✅ ACESSO PERMITIDO
```

## 📝 Checklist

- [ ] Organizations habilitadas
- [ ] Unique slugs obrigatórios
- [ ] Sign-ups desabilitados
- [ ] Satellite domains configurados
- [ ] Org criada com slug correto
- [ ] Usuários adicionados à org
- [ ] Middleware validando em todas as rotas
- [ ] Página /unauthorized funcionando

## 🔄 Gerenciamento de Membros

Para adicionar/remover usuários:

1. Adicione via Dashboard ou API
2. Clerk sincroniza automaticamente
3. Middleware já usa novos dados na próxima requisição
4. **Não precisa logout/login**

## 💡 Roles Disponíveis

- **admin** - Gerencia membros, configurações, acesso total
- **member** - Acesso normal à organização

(Você pode criar roles customizados em Organizations → Roles & Permissions)

---

**Importante:** O middleware é a ÚNICA camada de autenticação. As páginas NÃO fazem verificações duplicadas.
