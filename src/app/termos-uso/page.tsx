import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, Ban, Gavel } from 'lucide-react';
import * as S from '../politica-privacidade/styles';

export const metadata: Metadata = {
  title: 'Termos de Uso | SomaClini',
  description: 'Termos e Condições de Uso da plataforma SomaClini',
};

export default function TermosUsoPage() {
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
          <FileText size={32} />
          Termos de Uso
        </S.Title>
        <S.Subtitle>Última atualização: 02 de junho de 2026</S.Subtitle>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>
            <FileText size={24} />
            1. Aceitação dos Termos
          </S.SectionTitle>
          <S.Text>
            Bem-vindo ao <strong>SomaClini</strong>! Estes Termos de Uso ("Termos") regem o acesso e uso de nossa plataforma 
            de automação de atendimento via WhatsApp para clínicas médicas. Ao criar uma conta e utilizar nossos serviços, 
            você concorda com estes Termos em sua totalidade.
          </S.Text>
          <S.Text>
            Se você não concorda com alguma parte destes Termos, não utilize nossos serviços.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <CheckCircle2 size={24} />
            2. Definições
          </S.SectionTitle>
          <S.List>
            <li><strong>"Plataforma" ou "Serviço":</strong> refere-se ao sistema SomaClini e todas suas funcionalidades</li>
            <li><strong>"Usuário" ou "Você":</strong> pessoa física ou jurídica (clínica) que utiliza a plataforma</li>
            <li><strong>"Paciente":</strong> pessoa que entra em contato com a clínica através do WhatsApp</li>
            <li><strong>"Conta":</strong> acesso personalizado criado pelo usuário na plataforma</li>
            <li><strong>"Conteúdo":</strong> mensagens, dados, informações inseridas ou processadas na plataforma</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <CheckCircle2 size={24} />
            3. Descrição dos Serviços
          </S.SectionTitle>
          <S.Text>
            O SomaClini oferece uma plataforma SaaS (Software as a Service) que automatiza o atendimento via WhatsApp para clínicas, incluindo:
          </S.Text>
          <S.List>
            <li>Atendimento automatizado com inteligência artificial 24/7</li>
            <li>Agendamento de consultas e procedimentos</li>
            <li>Envio de lembretes e confirmações automáticas</li>
            <li>Transferência para atendimento humano quando necessário</li>
            <li>Dashboard web para gerenciamento de conversas em tempo real</li>
            <li>Gestão de profissionais, pacientes e horários</li>
            <li>Relatórios e métricas de atendimento</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Gavel size={24} />
            4. Elegibilidade e Cadastro
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>4.1 Requisitos</S.SubTitle>
            <S.List>
              <li>Ser maior de 18 anos</li>
              <li>Representar legalmente uma clínica médica/odontológica ou estabelecimento de saúde</li>
              <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
              <li>Possuir autorização para uso comercial do WhatsApp (WhatsApp Business API)</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>4.2 Conta de Usuário</S.SubTitle>
            <S.Text>
              Você é responsável por:
            </S.Text>
            <S.List>
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Todas as atividades realizadas em sua conta</li>
              <li>Notificar imediatamente qualquer uso não autorizado</li>
              <li>Não compartilhar sua conta com terceiros</li>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <CheckCircle2 size={24} />
            5. Responsabilidades do Usuário
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>5.1 Você se compromete a:</S.SubTitle>
            <S.List>
              <li>Utilizar o serviço de forma legal e ética</li>
              <li>Não violar direitos de propriedade intelectual</li>
              <li>Respeitar a privacidade dos pacientes (LGPD e sigilo médico)</li>
              <li>Não enviar spam ou mensagens não solicitadas</li>
              <li>Manter informações cadastrais atualizadas</li>
              <li>Configurar corretamente horários e informações da clínica</li>
              <li>Supervisionar o funcionamento da IA e intervir quando necessário</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>5.2 Conteúdo do Usuário</S.SubTitle>
            <S.Text>
              Você é o único responsável por todo conteúdo criado, enviado ou processado através da plataforma. 
              Isso inclui mensagens, informações de pacientes, cadastro de profissionais e configurações.
            </S.Text>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Ban size={24} />
            6. Uso Proibido
          </S.SectionTitle>
          <S.Text>
            É expressamente proibido:
          </S.Text>
          <S.List>
            <li>Usar a plataforma para fins ilegais ou não autorizados</li>
            <li>Violar leis de proteção de dados (LGPD, GDPR, etc.)</li>
            <li>Transmitir vírus, malware ou código malicioso</li>
            <li>Fazer engenharia reversa ou tentar acessar código-fonte</li>
            <li>Sobrecarregar ou comprometer a infraestrutura do serviço</li>
            <li>Revender ou redistribuir o serviço sem autorização</li>
            <li>Coletar dados de outros usuários sem consentimento</li>
            <li>Enviar mensagens de teor ofensivo, discriminatório ou ilegal</li>
            <li>Utilizar a plataforma para esquemas fraudulentos ou enganosos</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <AlertCircle size={24} />
            7. Propriedade Intelectual
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>7.1 Propriedade do SomaClini</S.SubTitle>
            <S.Text>
              Todos os direitos de propriedade intelectual da plataforma (código, design, marca, logos, documentação) 
              pertencem à SomaClini. É concedida apenas uma licença limitada, não exclusiva e intransferível para uso do serviço.
            </S.Text>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>7.2 Seus Dados</S.SubTitle>
            <S.Text>
              Você mantém todos os direitos sobre seus dados e conteúdo. Concede à SomaClini apenas uma licença para 
              processar esses dados com o único fim de prestar os serviços contratados.
            </S.Text>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            8. Integração com WhatsApp
          </S.SectionTitle>
          
          <S.Text>
            O SomaClini utiliza a Evolution API para integração com WhatsApp. Você reconhece que:
          </S.Text>
          <S.List>
            <li>Está sujeito também aos Termos de Serviço do WhatsApp/Meta</li>
            <li>A SomaClini não controla a disponibilidade ou performance do WhatsApp</li>
            <li>Mudanças nas políticas do WhatsApp podem afetar funcionalidades</li>
            <li>É responsável por seguir as políticas de uso comercial do WhatsApp</li>
            <li>A Evolution API é uma solução de terceiros para conexão com WhatsApp</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            9. Disponibilidade e Suporte
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>9.1 SLA (Service Level Agreement)</S.SubTitle>
            <S.Text>
              Buscamos manter a plataforma disponível 99,5% do tempo, excluindo manutenções programadas (notificadas com antecedência).
            </S.Text>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>9.2 Suporte</S.SubTitle>
            <S.List>
              <li>Suporte técnico via e-mail em horário comercial</li>
              <li>Documentação e tutoriais disponíveis na plataforma</li>
              <li>Tempo de resposta: até 24 horas úteis</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>9.3 Manutenção</S.SubTitle>
            <S.Text>
              Reservamos o direito de realizar manutenções programadas, que serão comunicadas com pelo menos 48 horas de antecedência, 
              exceto em casos de urgência de segurança.
            </S.Text>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            10. Pagamento e Cancelamento
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>10.1 Planos e Valores</S.SubTitle>
            <S.Text>
              Os planos, valores e formas de pagamento estão descritos em nossa página de preços. 
              Reservamos o direito de alterar preços mediante notificação prévia de 30 dias.
            </S.Text>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>10.2 Renovação Automática</S.SubTitle>
            <S.Text>
              Assinaturas são renovadas automaticamente ao final de cada período, salvo cancelamento antecipado.
            </S.Text>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>10.3 Cancelamento</S.SubTitle>
            <S.List>
              <li>Você pode cancelar a qualquer momento através da plataforma</li>
              <li>Cancelamento entra em vigor ao final do período pago</li>
              <li>Não há reembolso proporcional, exceto se previsto em lei</li>
              <li>Seus dados serão mantidos por período legal e então excluídos</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>10.4 Suspensão por Inadimplência</S.SubTitle>
            <S.Text>
              Em caso de não pagamento, o acesso pode ser suspenso após 7 dias de atraso. 
              A conta será excluída após 30 dias de inadimplência sem possibilidade de recuperação dos dados.
            </S.Text>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <AlertCircle size={24} />
            11. Limitação de Responsabilidade
          </S.SectionTitle>
          
          <S.Text>
            Na máxima extensão permitida por lei:
          </S.Text>
          <S.List>
            <li>O serviço é fornecido "como está" e "conforme disponível"</li>
            <li>Não garantimos operação ininterrupta ou livre de erros</li>
            <li>Não somos responsáveis por decisões tomadas com base nas informações da plataforma</li>
            <li>Não somos responsáveis por condutas inadequadas da IA (você deve supervisionar)</li>
            <li>Nossa responsabilidade é limitada ao valor pago nos últimos 12 meses</li>
            <li>Não somos responsáveis por ações de terceiros (WhatsApp, n8n, etc.)</li>
            <li>Não somos responsáveis por perda de dados causada por você ou terceiros</li>
          </S.List>

          <S.HighLight>
            <strong>Importante:</strong> A SomaClini é uma ferramenta de apoio. A responsabilidade final pelo atendimento 
            médico/odontológico, diagnósticos e tratamentos permanece exclusivamente com os profissionais de saúde da clínica.
          </S.HighLight>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            12. Indenização
          </S.SectionTitle>
          <S.Text>
            Você concorda em indenizar e isentar a SomaClini de quaisquer reclamações, danos ou despesas decorrentes de:
          </S.Text>
          <S.List>
            <li>Seu uso inadequado da plataforma</li>
            <li>Violação destes Termos</li>
            <li>Violação de direitos de terceiros</li>
            <li>Conteúdo que você criar ou transmitir</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            13. Rescisão
          </S.SectionTitle>
          
          <S.SubSection>
            <S.SubTitle>13.1 Pelo Usuário</S.SubTitle>
            <S.Text>
              Você pode encerrar sua conta a qualquer momento através das configurações da plataforma.
            </S.Text>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>13.2 Pela SomaClini</S.SubTitle>
            <S.Text>
              Podemos suspender ou encerrar sua conta imediatamente, sem aviso prévio, em caso de:
            </S.Text>
            <S.List>
              <li>Violação destes Termos</li>
              <li>Atividade fraudulenta ou ilegal</li>
              <li>Inadimplência superior a 30 dias</li>
              <li>Uso que comprometa a segurança ou estabilidade do serviço</li>
              <li>Ordem judicial ou exigência legal</li>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubTitle>13.3 Efeitos da Rescisão</S.SubTitle>
            <S.List>
              <li>Acesso imediato à plataforma é revogado</li>
              <li>Dados serão mantidos por período legal e então excluídos</li>
              <li>Você pode solicitar exportação dos dados em até 30 dias</li>
              <li>Obrigações de pagamento permanecem devidas</li>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            14. Modificações dos Termos
          </S.SectionTitle>
          <S.Text>
            Reservamos o direito de modificar estes Termos a qualquer momento. Mudanças significativas serão notificadas 
            com 30 dias de antecedência por e-mail. O uso continuado após as mudanças constitui aceitação dos novos Termos.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            15. Lei Aplicável e Foro
          </S.SectionTitle>
          <S.Text>
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de [CIDADE], 
            com exclusão de qualquer outro, por mais privilegiado que seja, para dirimir quaisquer questões oriundas destes Termos.
          </S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            16. Disposições Gerais
          </S.SectionTitle>
          <S.List>
            <li><strong>Integralidade:</strong> Estes Termos constituem o acordo integral entre as partes</li>
            <li><strong>Renúncia:</strong> A não exigência de qualquer direito não constitui renúncia</li>
            <li><strong>Independência:</strong> Se alguma cláusula for inválida, as demais permanecem em vigor</li>
            <li><strong>Cessão:</strong> Você não pode transferir seus direitos sem nossa autorização</li>
            <li><strong>Idioma:</strong> Em caso de conflito entre versões, a versão em português prevalece</li>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            17. Contato
          </S.SectionTitle>
          <S.Text>
            Para questões sobre estes Termos de Uso:
          </S.Text>
          <S.InfoBox>
            <strong>SomaClini</strong><br />
            E-mail: somalabsgroup@gmail.com<br />
            Site: www.somaclini.com.br
          </S.InfoBox>
        </S.Section>

        <S.Footer>
          <S.FooterText>
            Ao utilizar o SomaClini, você declara ter lido, compreendido e concordado com estes Termos de Uso.
          </S.FooterText>
          <S.FooterText>
            <strong>SomaClini - CNPJ XX.XXX.XXX/XXXX-XX</strong>
          </S.FooterText>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
}
