'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Script from 'next/script';
import {
  MessageSquare, CheckCircle2, Calendar, Users, BarChart2,
  AlertCircle, Clock, RefreshCw, Bell, Phone,
  MessageCircle, ArrowRight, Play, Activity, Menu,
} from 'lucide-react';
import { 
  FaqItem,
  AnimatedBackground,
  CTAFeatureBadges
} from './components';
import * as S from './styles';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://somaclini.com.br/#organization',
      name: 'SomaClini',
      url: 'https://somaclini.com.br',
      logo: 'https://somaclini.com.br/logo.png',
      sameAs: [
        'https://instagram.com/somaclini',
        'https://linkedin.com/company/somaclini',
        'https://youtube.com/@somaclini'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Atendimento',
        availableLanguage: 'Portuguese'
      }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://somaclini.com.br/#software',
      name: 'SomaClini',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '127'
      },
      description: 'Sistema de atendimento automatizado via WhatsApp para clínicas médicas. Agende consultas, confirme horários e reduza faltas com IA.',
      featureList: [
        'Atendimento 24/7 via WhatsApp',
        'Agendamento automático de consultas',
        'Confirmação e lembretes automáticos',
        'Redução de faltas',
        'Integração com agendas',
        'Relatórios e analytics'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://somaclini.com.br/#website',
      url: 'https://somaclini.com.br',
      name: 'SomaClini',
      publisher: {
        '@id': 'https://somaclini.com.br/#organization'
      },
      inLanguage: 'pt-BR'
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://somaclini.com.br/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como funciona o atendimento automatizado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O SomaClini usa inteligência artificial para responder seus pacientes automaticamente pelo WhatsApp, 24 horas por dia. O sistema agenda consultas, confirma horários e envia lembretes.'
          }
        },
        {
          '@type': 'Question',
          name: 'É seguro e em conformidade com a LGPD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! Todos os dados são criptografados e armazenados com segurança, seguindo as normas da LGPD. Você tem total controle sobre as informações dos seus pacientes.'
          }
        },
        {
          '@type': 'Question',
          name: 'Quanto tempo leva para implementar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A implementação é rápida e simples. Em até 48 horas, sua clínica já estará atendendo automaticamente pelo WhatsApp.'
          }
        },
        {
          '@type': 'Question',
          name: 'Funciona com minha agenda atual?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! O SomaClini se integra com os principais sistemas de agenda médica, mantendo tudo sincronizado em tempo real.'
          }
        }
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <S.PageContainer>
      {/* Skip Link for Accessibility */}
      <S.SkipLink href="#main-content">
        Pular para o conteúdo principal
      </S.SkipLink>

      {/* ══════════════ HEADER ══════════════ */}
      <S.Header role="banner">
        <S.HeaderContainer>
          <S.Logo>
            <S.LogoIcon>
              <MessageSquare />
            </S.LogoIcon>
            <S.LogoText>SomaClini</S.LogoText>
          </S.Logo>

          <S.Nav role="navigation" aria-label="Menu principal">
            <S.NavLink href="#como-funciona">Como funciona</S.NavLink>
            <S.NavLink href="#beneficios">Benefícios</S.NavLink>
            <S.NavLink href="#demonstracao">Demonstração</S.NavLink>
            <S.NavLink href="#faq">FAQ</S.NavLink>
          </S.Nav>

          <S.HeaderButton href="#demonstracao">
            Agendar demonstração
          </S.HeaderButton>
          
          <S.MobileMenuButton aria-label="Abrir menu de navegação" aria-expanded="false">
            <Menu aria-hidden="true" />
          </S.MobileMenuButton>
        </S.HeaderContainer>
      </S.Header>

      {/* ══════════════ HERO ══════════════ */}
      <S.HeroSection id="inicio">
        <div id="main-content" />
        <AnimatedBackground />
        <S.HeroGrid>
          <S.HeroText>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <S.HeroTag>
                <Activity /> Atendimento automatizado para clínicas
              </S.HeroTag>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <S.HeroTitle>
                Atendimento <span>inteligente</span> que <span>agenda, confirma</span> e <span>fideliza</span> seus pacientes
              </S.HeroTitle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <S.HeroDescription>
                Converse, agende consultas e reduza faltas com um atendimento automatizado e humanizado. Mais eficiência para sua clínica, mais tempo para o que realmente importa.
              </S.HeroDescription>
            </motion.div>

            <S.BenefitCardsGrid>
              {[
                {
                  Icon: MessageCircle,
                  title: 'Atendimento 24h',
                  desc: 'todos os dias'
                },
                {
                  Icon: Calendar,
                  title: 'Agendamentos',
                  desc: 'automáticos'
                },
                {
                  Icon: Bell,
                  title: 'Lembretes',
                  desc: 'e confirmações'
                },
                {
                  Icon: Clock,
                  title: 'Menos faltas',
                  desc: 'mais tempo'
                }
              ].map(({ Icon, title, desc }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <S.BenefitCard>
                    <S.BenefitIconWrapper>
                      <Icon />
                    </S.BenefitIconWrapper>
                    <S.BenefitCardTitle>{title}</S.BenefitCardTitle>
                    <S.BenefitCardDesc>{desc}</S.BenefitCardDesc>
                  </S.BenefitCard>
                </motion.div>
              ))}
            </S.BenefitCardsGrid>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <S.ButtonGroup>
                <S.PrimaryButton aria-label="Solicitar demonstração e transformar atendimento">
                  Quero transformar meu atendimento
                  <ArrowRight aria-hidden="true" />
                </S.PrimaryButton>
                <S.SecondaryButton aria-label="Assistir vídeo demonstrativo">
                  <Play aria-hidden="true" />
                  Ver como funciona
                </S.SecondaryButton>
              </S.ButtonGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <S.SecurityBadge>
                <CheckCircle2 />
                <span>Seguro, confiável e 100% em conformidade com a LGPD</span>
              </S.SecurityBadge>
            </motion.div>
          </S.HeroText>

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <S.HeroMockup>
                <S.HeroImageWrapper>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/assets/hero-main.png"
                      alt="Dashboard SomaClini - Gestão de conversas e atendimento"
                      width={2400}
                      height={1600}
                      quality={100}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                  </motion.div>
                </S.HeroImageWrapper>
              </S.HeroMockup>
            </motion.div>
        </S.HeroGrid>
      </S.HeroSection>

      {/* ══════════════ STATS BAR ══════════════ */}
      <S.StatsBarSection id="beneficios">
        <S.StatsBarContainer>
          <S.StatsGrid>
            {[
              {
                Icon: Clock,
                title: 'Atendimento mais rápido',
                desc: 'Responda todos os pacientes em menos de 3 minutos, sem deixar ninguém para trás.',
                stat: '< 3min',
              },
              {
                Icon: Calendar,
                title: 'Menos faltas',
                desc: 'Confirmação automática de consultas reduz drasticamente o número de no-shows.',
                stat: '-70%',
              },
              {
                Icon: RefreshCw,
                title: 'Recuperação automatizada',
                desc: 'Reative pacientes inativos automaticamente com mensagens personalizadas.',
                stat: '+45%',
              },
              {
                Icon: BarChart2,
                title: 'Mais produtividade',
                desc: 'Sua equipe foca no que realmente importa enquanto o bot cuida do resto.',
                stat: '3x',
              },
            ].map(({ Icon, title, desc, stat }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <S.ModernStatCard>
                  <S.StatBadge>
                    {stat}
                  </S.StatBadge>
                  <S.StatIconBox>
                    <Icon />
                  </S.StatIconBox>
                  <S.StatContent>
                    <S.StatTitle>{title}</S.StatTitle>
                    <S.StatDescription>{desc}</S.StatDescription>
                  </S.StatContent>
                </S.ModernStatCard>
              </motion.div>
            ))}
          </S.StatsGrid>
        </S.StatsBarContainer>
      </S.StatsBarSection>

      {/* ══════════════ HOW IT WORKS - STEP CARDS ══════════════ */}
      <S.HowItWorksSection id="como-funciona">
        {/* Floating decorative elements */}
        <S.FloatingCircle1 />
        <S.FloatingCircle2 />
        <S.FloatingCircle3 />
        
        <S.HowItWorksContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.SectionTitle style={{ marginBottom: '16px' }}>
              Como funciona na <em>prática</em>
            </S.SectionTitle>
            <S.HowItWorksSubtitle>
              Do primeiro contato até a reativação, tudo automatizado e inteligente.
            </S.HowItWorksSubtitle>
          </motion.div>

          <S.HorizontalTimeline>
            <S.TimelineConnector>
              <motion.svg
                width="100%"
                height="100"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
                style={{ position: 'absolute', top: '48px', left: 0, right: 0, zIndex: 0 }}
              >
                <motion.path
                  d="M 100 50 Q 250 30, 400 50 Q 550 70, 700 50 Q 850 30, 1000 50 Q 1100 60, 1150 50"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </S.TimelineConnector>
            
            {[
              {
                Icon: MessageCircle,
                bg: '#CCFBF1',
                iconBg: '#14B8A6',
                number: '1',
                title: 'Recebe mensagem',
                desc: 'Paciente envia mensagem no WhatsApp da clínica.',
              },
              {
                Icon: Activity,
                bg: '#D1FAE5',
                iconBg: '#10B981',
                number: '2',
                title: 'IA faz triagem',
                desc: 'Bot identifica intenção e classifica atendimento.',
              },
              {
                Icon: CheckCircle2,
                bg: '#E0F2FE',
                iconBg: '#0EA5E9',
                number: '3',
                title: 'Equipe responde',
                desc: 'Se necessário, equipe assume com contexto.',
              },
              {
                Icon: Calendar,
                bg: '#CCFBF1',
                iconBg: '#14B8A6',
                number: '4',
                title: 'Agenda automático',
                desc: 'Bot coleta dados e confirma agendamento.',
              },
              {
                Icon: Bell,
                bg: '#D1FAE5',
                iconBg: '#10B981',
                number: '5',
                title: 'Lembrete enviado',
                desc: 'Confirmação automática antes da consulta.',
              },
              {
                Icon: RefreshCw,
                bg: '#E0F2FE',
                iconBg: '#0EA5E9',
                number: '6',
                title: 'Follow-up ativo',
                desc: 'Pós-consulta e reativação sem esforço.',
              },
            ].map(({ Icon, bg, iconBg, number, title, desc }, index) => (
              <S.HorizontalStep key={number}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.25,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <S.StepCardModern $bg={bg}>
                    <S.StepIconCircle $iconBg={iconBg}>
                      <Icon />
                    </S.StepIconCircle>
                    <S.StepNumberBadge>{number}</S.StepNumberBadge>
                    <S.StepTitleModern>{title}</S.StepTitleModern>
                    <S.StepDescModern>{desc}</S.StepDescModern>
                  </S.StepCardModern>
                </motion.div>
              </S.HorizontalStep>
            ))}
          </S.HorizontalTimeline>
        </S.HowItWorksContainer>
      </S.HowItWorksSection>

      {/* ══════════════ CTA DARK ══════════════ */}
      <S.CTASection id="demonstracao">
        <S.CTAContainer>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.CTAText>
              <S.CTATitle>
                Veja o SomaClini <em>funcionando</em> na prática.
              </S.CTATitle>
              <S.CTADescription>
                Agende uma demonstração gratuita e veja como automatizar o atendimento da sua clínica pode transformar seus resultados.
              </S.CTADescription>
              <S.CTAFeatures>
                {[
                  'Demonstração personalizada',
                  'Sem necessidade de cartão de crédito',
                  'Suporte completo no onboarding',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <S.CTAFeature>
                      <CheckCircle2 />
                      <span>{item}</span>
                    </S.CTAFeature>
                  </motion.div>
                ))}
              </S.CTAFeatures>
              <CTAFeatureBadges />
            </S.CTAText>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.ModernFormCard>
              <S.FormHeader>
                <S.FormTitle>Agende sua <em>demonstração</em></S.FormTitle>
                <S.FormDescription>
                  Preencha os dados e entraremos em contato em até 24 horas.
                </S.FormDescription>
              </S.FormHeader>

              <S.FormBody>
                <S.FormRow>
                  <S.ModernFormGroup>
                    <S.ModernFormLabel>
                      <Users style={{ width: '16px', height: '16px' }} />
                      Clínica
                    </S.ModernFormLabel>
                    <S.ModernFormInput
                      type="text"
                      placeholder="Nome da clínica"
                    />
                  </S.ModernFormGroup>
                  <S.ModernFormGroup>
                    <S.ModernFormLabel>
                      <Phone style={{ width: '16px', height: '16px' }} />
                      WhatsApp
                    </S.ModernFormLabel>
                    <S.ModernFormInput
                      type="tel"
                      placeholder="(00) 00000-0000"
                    />
                  </S.ModernFormGroup>
                </S.FormRow>

                <S.FormRow>
                  <S.ModernFormGroup>
                    <S.ModernFormLabel>
                      <Users style={{ width: '16px', height: '16px' }} />
                      Nome completo
                    </S.ModernFormLabel>
                    <S.ModernFormInput
                      type="text"
                      placeholder="Seu nome"
                    />
                  </S.ModernFormGroup>
                  <S.ModernFormGroup>
                    <S.ModernFormLabel>
                      <MessageSquare style={{ width: '16px', height: '16px' }} />
                      E-mail profissional
                    </S.ModernFormLabel>
                    <S.ModernFormInput
                      type="email"
                      placeholder="seu@email.com"
                    />
                  </S.ModernFormGroup>
                </S.FormRow>

                <S.ModernFormGroup>
                  <S.ModernFormLabel>
                    <AlertCircle style={{ width: '16px', height: '16px' }} />
                    Principal desafio
                  </S.ModernFormLabel>
                  <S.ModernFormSelect defaultValue="">
                    <option value="" disabled>Selecione um desafio</option>
                    <option>Muitas faltas e cancelamentos</option>
                    <option>Atendimento lento no WhatsApp</option>
                    <option>Falta de follow-up com pacientes</option>
                    <option>Equipe sobrecarregada</option>
                    <option>Dificuldade em reativar pacientes</option>
                  </S.ModernFormSelect>
                </S.ModernFormGroup>

                <S.ModernSubmitButton type="button">
                  <CheckCircle2 style={{ width: '20px', height: '20px' }} />
                  Agendar demonstração gratuita
                </S.ModernSubmitButton>

                <S.FormFooterText>
                  <CheckCircle2 style={{ width: '14px', height: '14px', color: '#14B8A6' }} />
                  Resposta em até 24 horas · Sem compromisso
                </S.FormFooterText>
              </S.FormBody>
            </S.ModernFormCard>
          </motion.div>
        </S.CTAContainer>
      </S.CTASection>

      {/* ══════════════ FAQ ══════════════ */}
      <S.FAQSection id="faq">
        <S.FAQContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.FAQHeader>
              <S.SectionTitle style={{ fontSize: '1.8rem' }}>
                Dúvidas <em>Frequentes</em>
              </S.SectionTitle>
              <S.FAQSubtitle>Tire suas principais dúvidas sobre o SomaClini.</S.FAQSubtitle>
            </S.FAQHeader>
          </motion.div>

          <S.FAQList>
              {[
                {
                  q: 'Como o SomaClini funciona para clínicas?',
                  a: 'O SomaClini conecta ao WhatsApp da sua clínica e automatiza o atendimento: responde dúvidas, coleta dados, agenda consultas e envia lembretes — tudo de forma automática e sem precisar de programação.',
                },
                {
                  q: 'Funciona com qualquer versão do WhatsApp?',
                  a: 'Sim! O SomaClini funciona com o WhatsApp Business API oficial, garantindo estabilidade e sem risco de banimento. Cuidamos de toda a integração para você.',
                },
                {
                  q: 'É difícil de usar?',
                  a: 'Não. A plataforma foi projetada para ser simples e intuitiva. Nossa equipe faz toda a configuração inicial e oferece suporte completo durante o uso.',
                },
                {
                  q: 'Posso ter suporte após a contratação?',
                  a: 'Sim! Todos os planos incluem suporte dedicado. Temos time disponível para ajudar sua clínica a obter o máximo do SomaClini desde o primeiro dia.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FaqItem q={item.q} a={item.a} />
                </motion.div>
              ))}
            </S.FAQList>
        </S.FAQContainer>
      </S.FAQSection>

      {/* ══════════════ FOOTER ══════════════ */}
      <S.Footer>
        <S.FooterContainer>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.FooterGrid>
              {/* Brand */}
              <S.FooterColumn>
                <S.Logo style={{ marginBottom: '16px' }}>
                  <S.LogoIcon>
                    <MessageSquare />
                  </S.LogoIcon>
                  <S.LogoText>SomaClini</S.LogoText>
                </S.Logo>
                <S.FooterText>
                  Atendimento e Agendamento via WhatsApp para Clínicas.
                </S.FooterText>
                <S.SocialLinks>
                  <S.SocialLink 
                    href="https://instagram.com/somaclini" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Visitar Instagram do SomaClini"
                    title="Instagram" 
                    $color="#E4405F"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </S.SocialLink>
                  <S.SocialLink 
                    href="https://linkedin.com/company/somaclini" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Visitar LinkedIn do SomaClini"
                    title="LinkedIn" 
                    $color="#0077B5"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </S.SocialLink>
                  <S.SocialLink 
                    href="https://youtube.com/@somaclini" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Visitar YouTube do SomaClini"
                    title="YouTube" 
                    $color="#FF0000"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </S.SocialLink>
                </S.SocialLinks>
              </S.FooterColumn>

              {[
                {
                  title: 'Produto',
                  links: [
                    { label: 'Como funciona', href: '#como-funciona' },
                    { label: 'Benefícios', href: '#beneficios' },
                    { label: 'Demonstração', href: '#demonstracao' },
                    { label: 'FAQ', href: '#faq' },
                  ],
                },
                {
                  title: 'Para quem é',
                  links: [
                    { label: 'Clínicas médicas', href: '#inicio' },
                    { label: 'Clínicas de estética', href: '#inicio' },
                    { label: 'Consultórios', href: '#inicio' },
                    { label: 'Psicólogos', href: '#inicio' },
                  ],
                },
                {
                  title: 'Empresa',
                  links: [
                    { label: 'Sobre nós', href: '#inicio' },
                    { label: 'Contato', href: '#demonstracao' },
                  ],
                },
              ].map(({ title, links }, colIndex) => (
                <S.FooterColumn key={title}>
                  <S.FooterTitle>{title}</S.FooterTitle>
                  <S.FooterLinks>
                    {links.map((link, linkIndex) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: colIndex * 0.1 + linkIndex * 0.05 }}
                      >
                        <S.FooterLink>
                          <a href={link.href}>{link.label}</a>
                        </S.FooterLink>
                      </motion.div>
                    ))}
                  </S.FooterLinks>
                </S.FooterColumn>
              ))}
            </S.FooterGrid>
          </motion.div>

          <S.FooterBottom>
            <S.Copyright>© 2026 SomaClini. Todos os direitos reservados.</S.Copyright>
          </S.FooterBottom>
        </S.FooterContainer>
      </S.Footer>
    </S.PageContainer>
    </>
  );
}
