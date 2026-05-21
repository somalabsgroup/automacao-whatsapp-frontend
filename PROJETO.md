# Automação WhatsApp - Frontend

Sistema de automação de mensagens WhatsApp para clínicas médicas.

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard das clínicas
│   │   ├── layout.tsx          # Layout raiz com ClerkProvider
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Estilos globais
│   │
│   ├── components/             # Componentes reutilizáveis
│   │
│   ├── lib/                    # Utilitários e configurações
│   │   └── auth.ts             # Funções de autenticação Clerk
│   │
│   ├── types/                  # TypeScript types compartilhados
│   │   └── index.ts            # Tipos principais
│   │
│   ├── utils/                  # Funções utilitárias
│   │
│   └── middleware.ts           # Middleware multi-tenant
│
├── public/                     # Assets estáticos
├── .env.local                  # Variáveis de ambiente (não commitar!)
├── .env.example                # Exemplo de variáveis
└── next.config.ts              # Configuração Next.js
```

## 🚀 Tecnologias

- **Next.js 16** - Framework React com SSR
- **TypeScript** - Tipagem estática
- **Clerk** - Autenticação e gerenciamento de usuários
- **Styled Components** - CSS-in-JS
- **Zustand** - Gerenciamento de estado
- **Zod** - Validação de formulários

## 🔐 Multi-Tenant

O sistema usa **subdomínios** para multi-tenancy:

- `somaclini.com.br` → Landing page pública
- `clinica-exemplo.somaclini.com.br` → Dashboard da clínica

### Fluxo de Autenticação

1. Middleware verifica o hostname e extrai o subdomínio
2. Se em subdomínio, requer autenticação
3. Verifica se usuário tem acesso ao tenant (via `publicMetadata.tenants`)
4. Permite ou nega acesso

### Estrutura de Dados no Clerk

```typescript
{
  "publicMetadata": {
    "tenants": [
      {
        "id": "tenant_123",
        "slug": "clinica-exemplo",
        "role": "owner",
        "name": "Clínica Exemplo"
      }
    ]
  }
}
```

## 📦 Scripts

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # Linter
```

## 🔧 Configuração

1. Copie `.env.example` para `.env.local`
2. Configure as variáveis do Clerk
3. Execute `npm install`
4. Execute `npm run dev`

## 🌐 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel:

1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Variáveis de Ambiente na Vercel

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_DOMAIN=somaclini.com.br
```

## 📝 Próximos Passos

- [ ] Integração WhatsApp Business API
- [ ] CRUD de pacientes
- [ ] Sistema de templates de mensagens
- [ ] Agendamento de mensagens
- [ ] Dashboard com estatísticas
- [ ] Webhooks para status de mensagens
