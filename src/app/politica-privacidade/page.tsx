import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, UserCheck, Database, Mail } from 'lucide-react';
import * as S from './styles';

export const metadata: Metadata = {
  title: 'Política de Privacidade | SomaClini',
  description: 'Política de Privacidade e Proteção de Dados do SomaClini em conformidade com a LGPD',
};

export default function PoliticaPrivacidadePage() {
  return (
    <S.Container>
      <S.Header>
        <Link href="/landing" style={{ position: 'absolute', top: '24px', left: '24px', textDecoration: 'none' }}>
          <S.BackButton>
            <ArrowLeft size={20} />
            Voltar
          </S.BackButton>
        </Link>
        <S.Title>
          <Shield size={32} />
          Política de Privacidade
        </S.Title>
        <S.Subtitle>Última atualização: 02 de junho de 2026</S.Subtitle>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>
            <Eye size={24} />
            1. Introdução
          </S.SectionTitle>
          <S.Text>
            A <strong>SomaClini</strong> ("nós", "nosso" ou "nos") está comprometida com a proteção e privacidade dos dados pessoais 
            de nossos usuários e pacientes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
            suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </S.Text>
          <S.Text>
            Ao utilizar nossa plataforma, você concorda com a coleta e uso de informações de acordo com esta política.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Database size={24} />
            2. Dados que Coletamos
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>2.1 Dados Pessoais de Usuários (Clínicas)</S.SubTitle>
            <S.List>
              <li><strong>Dados cadastrais:</strong> nome, e-mail, telefone, CPF/CNPJ</li>
              <li><strong>Dados da clínica:</strong> nome da clínica, endereço, especialidades</li>
              <li><strong>Dados de acesso:</strong> senha criptografada, logs de acesso, endereço IP</li>
              <li><strong>Dados profissionais:</strong> informações sobre médicos e profissionais cadastrados</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>2.2 Dados de Pacientes</S.SubTitle>
            <S.List>
              <li><strong>Dados de identificação:</strong> nome, telefone WhatsApp</li>
              <li><strong>Dados de comunicação:</strong> mensagens trocadas via WhatsApp</li>
              <li><strong>Dados de agendamento:</strong> data e hora de consultas, profissional escolhido</li>
              <li><strong>Dados de histórico:</strong> interações anteriores, preferências de atendimento</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>2.3 Dados Técnicos e de Marketing</S.SubTitle>
            <S.List>
              <li>Cookies e tecnologias similares (incluindo cookies de terceiros)</li>
              <li>Dados de navegação (páginas visitadas, tempo de sessão, origem do tráfego)</li>
              <li>Informações do dispositivo (tipo, sistema operacional, navegador, resolução de tela)</li>
              <li>Dados de geolocalização (quando autorizado)</li>
              <li><strong>Facebook Meta Pixel:</strong> comportamento de navegação, conversões, interações com anúncios</li>
              <li><strong>Google Ads:</strong> cliques em anúncios, conversões, remarketing</li>
              <li><strong>Google Analytics:</strong> métricas de uso, demografia, interesses</li>
              <li>Formulários de lead generation: nome, e-mail, telefone, empresa, mensagem</li>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <UserCheck size={24} />
            3. Como Usamos seus Dados
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>3.1 Finalidades do Tratamento</S.SubTitle>
            <S.List>
              <li><strong>Prestação de serviços:</strong> processar atendimentos, agendar consultas, enviar lembretes</li>
              <li><strong>Comunicação:</strong> responder dúvidas, enviar atualizações importantes</li>
              <li><strong>Autenticação:</strong> gerenciar acesso à plataforma</li>
              <li><strong>Marketing e publicidade:</strong> exibir anúncios relevantes, criar audiências personalizadas, remarketing, coleta de leads através de formulários e campanhas</li>
              <li><strong>Análise e métricas:</strong> medir eficácia de campanhas publicitárias, ROI de anúncios, conversões</li>
              <li><strong>Melhoria do serviço:</strong> analisar uso, desenvolver funcionalidades, entender comportamento do usuário</li>
              <li><strong>Segurança:</strong> prevenir fraudes, proteger dados, detectar bots e atividades suspeitas</li>
              <li><strong>Conformidade legal:</strong> cumprir obrigações legais e regulatórias</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>3.2 Base Legal (LGPD)</S.SubTitle>
            <S.List>
              <li><strong>Consentimento:</strong> para dados fornecidos voluntariamente</li>
              <li><strong>Execução de contrato:</strong> para prestação dos serviços contratados</li>
              <li><strong>Obrigação legal:</strong> quando exigido por lei</li>
              <li><strong>Legítimo interesse:</strong> para segurança e melhoria dos serviços</li>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Lock size={24} />
            4. Compartilhamento de Dados
          </S.SectionTitle>
          
          <S.Text>
            Seus dados são tratados com confidencialidade. Compartilhamos informações apenas quando:
          </S.Text>
          
          <S.List>
            <li><strong>Provedores de serviço:</strong> Supabase (banco de dados), Evolution API (WhatsApp), n8n (automação) - 
            todos com contratos de confidencialidade e conformidade com LGPD</li>
            <li><strong>Plataformas de publicidade:</strong>
              <S.SubList>
                <li><strong>Meta/Facebook:</strong> Meta Pixel coleta dados de comportamento para otimizar anúncios, criar audiências personalizadas (lookalike) e medir conversões. Dados compartilhados: evento de visualização de página, cliques, preenchimento de formulários, ações no site</li>
                <li><strong>Google (Ads/Analytics):</strong> Google Ads Pixel rastreia conversões e permite remarketing. Google Analytics analisa tráfego e comportamento. Dados compartilhados: páginas visitadas, origem do tráfego, eventos de conversão, dados demográficos agregados</li>
              </S.SubList>
            </li>
            <li><strong>Autoridades:</strong> quando exigido por lei ou ordem judicial</li>
            <li><strong>Operações empresariais:</strong> em caso de fusão, aquisição ou venda de ativos (com notificação prévia)</li>
          </S.List>

          <S.HighLight>
            <strong>Importante:</strong> Nunca vendemos, alugamos ou compartilhamos seus dados pessoais para fins comerciais com terceiros 
            sem seu consentimento explícito.
          </S.HighLight>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Shield size={24} />
            5. Segurança dos Dados
          </S.SectionTitle>
          
          <S.Text>
            Implementamos medidas técnicas e organizacionais para proteger seus dados:
          </S.Text>
          
          <S.List>
            <li><strong>Criptografia:</strong> dados em trânsito (HTTPS/TLS) e em repouso</li>
            <li><strong>Autenticação:</strong> sistema seguro com senhas criptografadas</li>
            <li><strong>Isolamento:</strong> banco de dados com RLS (Row Level Security) - cada clínica acessa apenas seus dados</li>
            <li><strong>Backup:</strong> cópias automáticas e regulares</li>
            <li><strong>Monitoramento:</strong> logs de acesso e detecção de anomalias</li>
            <li><strong>Servidores:</strong> hospedagem em data centers certificados no Brasil</li>
            <li><strong>Equipe:</strong> treinamento em segurança e LGPD</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <UserCheck size={24} />
            6. Seus Direitos (LGPD)
          </S.SectionTitle>
          
          <S.Text>
            Como titular de dados pessoais, você tem os seguintes direitos garantidos pela LGPD:
          </S.Text>
          
          <S.List>
            <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los</li>
            <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados</li>
            <li><strong>Anonimização, bloqueio ou eliminação:</strong> de dados desnecessários ou excessivos</li>
            <li><strong>Portabilidade:</strong> solicitar transferência dos dados para outro fornecedor</li>
            <li><strong>Eliminação:</strong> exclusão dos dados tratados com seu consentimento</li>
            <li><strong>Informação:</strong> saber com quem compartilhamos seus dados</li>
            <li><strong>Revogação do consentimento:</strong> retirar autorização a qualquer momento</li>
            <li><strong>Oposição:</strong> se opor ao tratamento em determinadas situações</li>
          </S.List>

          <S.Text>
            Para exercer seus direitos, entre em contato através do e-mail: <strong>somalabsgroup@gmail.com</strong>
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Database size={24} />
            7. Retenção de Dados
          </S.SectionTitle>
          
          <S.Text>
            Mantemos seus dados pelo tempo necessário para as finalidades descritas, respeitando:
          </S.Text>
          
          <S.List>
            <li><strong>Dados de usuários ativos:</strong> enquanto a conta estiver ativa</li>
            <li><strong>Dados de pacientes:</strong> por 5 anos após o último atendimento (conforme legislação médica)</li>
            <li><strong>Dados financeiros:</strong> por 5 anos (conforme legislação fiscal)</li>
            <li><strong>Logs de segurança:</strong> por 6 meses</li>
          </S.List>

          <S.Text>
            Após esses períodos, os dados são anonimizados ou eliminados de forma segura.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Shield size={24} />
            8. Cookies e Tecnologias Similares
          </S.SectionTitle>
          
          <S.Text>
            Utilizamos cookies e tecnologias similares para:
          </S.Text>
          
          <S.List>
            <li><strong>Cookies necessários:</strong> autenticação, segurança, funcionalidades básicas (não podem ser desabilitados)</li>
            <li><strong>Cookies analíticos:</strong> Google Analytics 4 (GA4) para entender como você usa a plataforma, páginas mais visitadas, tempo de sessão, taxa de rejeição</li>
            <li><strong>Cookies de marketing/publicidade:</strong>
              <S.SubList>
                <li><strong>Meta/Facebook Pixel (_fbp, _fbc):</strong> rastreia conversões, cria audiências personalizadas, exibe anúncios relevantes no Facebook e Instagram</li>
                <li><strong>Google Ads (_gcl_*, _gac_):</strong> mede cliques em anúncios, atribui conversões, permite remarketing</li>
                <li><strong>Google Analytics (_ga, _gid):</strong> identifica usuários únicos, sessões, comportamento</li>
              </S.SubList>
            </li>
            <li><strong>Cookies de preferências:</strong> lembrar suas escolhas (idioma, tema, consentimento de cookies)</li>
          </S.List>

          <S.SubSection>
            <S.SubTitle>Duração dos Cookies</S.SubTitle>
            <S.List>
              <li><strong>Sessão:</strong> expiram ao fechar o navegador (ex: autenticação)</li>
              <li><strong>Persistentes:</strong> até 2 anos (ex: preferências, análise de comportamento)</li>
              <li><strong>Third-party (terceiros):</strong> controlados por Meta e Google (até 2 anos)</li>
            </S.List>
          </S.SubSection>

          <S.Text>
            Você pode gerenciar suas preferências de cookies através do banner exibido no primeiro acesso ou clicando em "Gerenciar Cookies" no rodapé do site.
          </S.Text>
          
          <S.HighLight>
            <strong>Importante:</strong> Desabilitar cookies de marketing não impede que você veja anúncios, mas eles serão menos relevantes. 
            Cookies analíticos e de marketing exigem seu consentimento explícito conforme LGPD e LGPD Cookie Law.
          </S.HighLight>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Mail size={24} />
            9. Encarregado de Dados (DPO)
          </S.SectionTitle>
          
          <S.Text>
            Designamos um Encarregado de Proteção de Dados (Data Protection Officer - DPO) para atuar como canal de comunicação 
            entre você, a SomaClini e a Autoridade Nacional de Proteção de Dados (ANPD).
          </S.Text>
          
          <S.InfoBox>
            <strong>Encarregado de Dados:</strong><br />
            E-mail: somalabsgroup@gmail.com<br />
            Resposta em até 15 dias úteis
          </S.InfoBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Shield size={24} />
            10. Menores de Idade
          </S.SectionTitle>
          
          <S.Text>
            Nossos serviços são destinados a clínicas e profissionais de saúde maiores de 18 anos. 
            Dados de pacientes menores de idade são coletados apenas com consentimento dos pais ou responsáveis 
            legais, no contexto do atendimento médico.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            11. Alterações nesta Política
          </S.SectionTitle>
          
          <S.Text>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas 
            através de e-mail ou aviso na plataforma. Recomendamos revisar esta página regularmente.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Mail size={24} />
            12. Contato
          </S.SectionTitle>
          
          <S.Text>
            Para dúvidas, solicitações ou exercício de seus direitos relacionados a esta Política de Privacidade:
          </S.Text>
          
          <S.InfoBox>
            <strong>SomaClini</strong><br />
            E-mail: somalabsgroup@gmail.com<br />
            Site: www.somaclini.com.br
          </S.InfoBox>
        </S.Section>

        <S.Footer>
          <S.FooterText>
            Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
            e regulamentações aplicáveis.
          </S.FooterText>
          <S.FooterText>
            <strong>Controlador de Dados:</strong> SomaClini - CNPJ XX.XXX.XXX/XXXX-XX
          </S.FooterText>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
}
