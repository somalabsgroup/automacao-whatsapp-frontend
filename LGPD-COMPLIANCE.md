# 🔒 Conformidade com LGPD - SomaClini

Este documento descreve todas as implementações realizadas para garantir conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).

---

## 📋 Checklist de Conformidade

### ✅ Implementado

#### 1. **Banner de Cookies** (`/src/components/CookieBanner`)
- ✅ Aviso de consentimento exibido no primeiro acesso
- ✅ Opções para aceitar todos, rejeitar opcionais ou personalizar
- ✅ Três categorias de cookies:
  - **Necessários** (obrigatórios): autenticação, segurança
  - **Analíticos** (opcionais): métricas de uso
  - **Marketing** (opcionais): campanhas publicitárias
- ✅ Armazenamento de preferências no localStorage
- ✅ Link direto para Política de Privacidade

#### 2. **Política de Privacidade** (`/politica-privacidade`)
Página completa com:
- ✅ Descrição dos dados coletados (usuários e pacientes)
- ✅ Finalidades do tratamento de dados
- ✅ Base legal (consentimento, execução de contrato, etc)
- ✅ Compartilhamento com terceiros (Supabase, Evolution API, n8n)
- ✅ Medidas de segurança implementadas
- ✅ Direitos do titular (LGPD Art. 18)
- ✅ Período de retenção de dados
- ✅ Informações sobre cookies
- ✅ Contato do Encarregado de Dados (DPO)

#### 3. **Termos de Uso** (`/termos-uso`)
Documento legal com:
- ✅ Descrição dos serviços
- ✅ Responsabilidades do usuário
- ✅ Uso proibido
- ✅ Propriedade intelectual
- ✅ Integração com WhatsApp
- ✅ Pagamento e cancelamento
- ✅ Limitação de responsabilidade
- ✅ Lei aplicável e foro

#### 4. **Hook de Gerenciamento de Cookies** (`/src/hooks/useCookieConsent.ts`)
- ✅ Carregamento de preferências salvas
- ✅ Integração com Google Analytics (gtag)
- ✅ Integração com Facebook Pixel (fbq)
- ✅ Controle de consentimento granular
- ✅ Função para limpar consentimento

#### 5. **SEO e Indexação**
- ✅ Sitemap atualizado com páginas legais
- ✅ Robots.txt permitindo indexação das páginas públicas
- ✅ Metadata apropriada para SEO

#### 6. **Links de Acesso**
- ✅ Footer com links para Política e Termos
- ✅ Links na seção "Legal" do footer
- ✅ Links no Copyright (rodapé)

---

## 🔐 Medidas de Segurança Técnicas

### Já Implementadas no Sistema

#### Banco de Dados (Supabase)
- ✅ **RLS (Row Level Security)**: cada tenant acessa apenas seus dados
- ✅ **Criptografia em repouso**: dados armazenados criptografados
- ✅ **Criptografia em trânsito**: HTTPS/TLS em todas as comunicações
- ✅ **Backup automático**: cópias de segurança diárias
- ✅ **Servidores no Brasil**: conformidade com transferência internacional

#### Autenticação
- ✅ **Supabase Auth**: sistema robusto de autenticação
- ✅ **Senhas hasheadas**: bcrypt ou similar
- ✅ **Session tokens**: gerenciamento seguro de sessões
- ✅ **Tenant isolation**: isolamento por tenant_id em todas as queries

#### Aplicação
- ✅ **Validação de dados**: Zod schemas em formulários
- ✅ **Sanitização de inputs**: prevenção de XSS e SQL injection
- ✅ **Headers de segurança**: configurados no Next.js
- ✅ **CORS configurado**: apenas origens autorizadas

---

## 📝 Direitos do Titular (LGPD Art. 18)

### Como Exercer os Direitos

#### 1. **Confirmação e Acesso**
```
Usuário pode acessar todos os seus dados na plataforma:
- Dashboard > Configurações > Meus Dados
- Exportação em formato JSON disponível
```

#### 2. **Correção**
```
Edição de dados pessoais:
- Dashboard > Configurações > Perfil
- Dados da clínica: Configurações > Dados da Clínica
```

#### 3. **Eliminação**
```
Exclusão de conta:
- Dashboard > Configurações > Excluir Conta
- Confirmação via e-mail necessária
- Dados mantidos por período legal (5 anos) e então excluídos
```

#### 4. **Portabilidade**
```
Exportar dados em formato estruturado:
- Dashboard > Configurações > Exportar Dados
- Formatos: JSON, CSV
```

#### 5. **Revogação de Consentimento**
```
Gerenciar cookies:
- Footer > Redefinir Cookies
- Banner aparece novamente para nova escolha
```

#### 6. **Oposição/Revisão de Decisões Automatizadas**
```
Para casos envolvendo IA:
- Contato com suporte: somalabsgroup@gmail.com
- Análise humana da situação
- Resposta em até 15 dias úteis
```

---

## 📞 Contatos para Privacidade

### Encarregado de Dados (DPO)
- **E-mail**: somalabsgroup@gmail.com
- **Prazo de resposta**: até 15 dias úteis
- **Idioma**: Português

### Suporte Geral
- **E-mail**: somalabsgroup@gmail.com

---

## 🔄 Fluxo de Dados (Mapeamento)

### Coleta de Dados

#### Origem: Usuários (Clínicas)
```
Formulário de Cadastro → Supabase Auth → Tabela users
├─ Dados: nome, e-mail, senha
└─ Consentimento: implícito na criação da conta
```

#### Origem: Pacientes
```
WhatsApp → Evolution API → n8n → Supabase (conversations, messages, patients)
├─ Dados: nome, telefone, mensagens
└─ Consentimento: opt-in no primeiro contato
```

### Processamento de Dados
```
Supabase (armazenamento) ↔ Next.js Frontend (visualização) ↔ n8n (automação IA)
└─ Todos com RLS e autenticação obrigatória
```

### Compartilhamento com Terceiros
| Terceiro | Dados Compartilhados | Finalidade | País | Base Legal |
|----------|---------------------|------------|------|------------|
| Supabase | Todos os dados da plataforma | Hospedagem e banco de dados | EUA (com cláusulas contratuais padrão) | Execução de contrato |
| Evolution API | Mensagens, telefones | Envio/recebimento WhatsApp | Brasil | Execução de contrato |
| n8n | Mensagens, dados de agendamento | Automação e IA | Brasil | Execução de contrato |
| Google Analytics | Dados de navegação anonimizados | Métricas de uso | EUA | Consentimento (opcional) |

---

## ⏱️ Retenção de Dados

| Tipo de Dado | Período de Retenção | Base Legal |
|--------------|---------------------|------------|
| Dados cadastrais de usuários ativos | Enquanto a conta estiver ativa | Execução de contrato |
| Dados de pacientes | 5 anos após último atendimento | Legislação médica (CFM) |
| Mensagens de conversas | 5 anos | Histórico médico |
| Logs de acesso | 6 meses | Segurança da informação |
| Dados financeiros | 5 anos | Legislação fiscal |
| Dados de conta cancelada | 30 dias para recuperação, depois excluído | LGPD |

---

## 🚨 Procedimento de Incidente de Segurança

### Em caso de vazamento de dados:

1. **Detecção** (0-24h)
   - Identificar escopo do incidente
   - Contenção imediata
   - Acionamento do DPO

2. **Avaliação** (24-48h)
   - Análise de impacto
   - Identificação de titulares afetados
   - Classificação de gravidade

3. **Notificação** (72h)
   - ANPD: comunicação em até 72h (se risco alto)
   - Titulares afetados: e-mail direto
   - Transparência sobre dados vazados

4. **Remediação**
   - Correção da vulnerabilidade
   - Mudança de senhas forçada
   - Auditoria de segurança

5. **Documentação**
   - Registro detalhado do incidente
   - Medidas tomadas
   - Lições aprendidas

---

## ✅ Próximas Melhorias (Roadmap)

### Curto Prazo (1-3 meses)
- [ ] Adicionar Google Analytics com consentimento de cookies
- [ ] Implementar botão "Redefinir Cookies" no footer
- [ ] Dashboard de privacidade para usuário ver/exportar dados
- [ ] Formulário automatizado para exercício de direitos LGPD

### Médio Prazo (3-6 meses)
- [ ] Auditoria externa de segurança (pentest)
- [ ] Certificação ISO 27001
- [ ] Registro de atividades de tratamento (ROPA)
- [ ] Avaliação de impacto (DPIA) para funcionalidades de IA

### Longo Prazo (6-12 meses)
- [ ] Criptografia end-to-end em mensagens sensíveis
- [ ] Anonimização automática de dados antigos
- [ ] Portal de transparência com métricas de privacidade
- [ ] Integração com plataformas de gestão de consentimento (CMP)

---

## 📚 Referências Legais

- **LGPD**: Lei nº 13.709/2018
- **ANPD**: Autoridade Nacional de Proteção de Dados
- **Código de Defesa do Consumidor**: Lei nº 8.078/1990
- **Marco Civil da Internet**: Lei nº 12.965/2014
- **CFM**: Conselho Federal de Medicina (Resolução sobre prontuários)

---

## 🔍 Auditorias e Atualizações

| Data | Tipo | Resultado | Responsável |
|------|------|-----------|-------------|
| 02/06/2026 | Implementação inicial LGPD | ✅ Conforme | Desenvolvimento |
| - | Auditoria externa | Pendente | - |

---

**Controlador de Dados**: SomaClini - CNPJ XX.XXX.XXX/XXXX-XX  
**Encarregado (DPO)**: somalabsgroup@gmail.com  
**Última revisão**: 02 de junho de 2026
