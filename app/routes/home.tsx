import { Show, SignInButton, UserButton } from "@clerk/react";
import type { MetaFunction } from "react-router";
import { Button, Flex } from "~/components/ui/styled";
import {
  Header,
  HeaderTitle,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from "~/components/landing/styled";
import { colors, spacing } from "~/styles/tokens";

export const meta: MetaFunction = () => {
  return [
    { title: "SomaClini - Sistema de Controle de Mensagens" },
    { name: "description", content: "Sistema de controle de mensagens para clínicas via WhatsApp" },
  ];
};

const features = [
  {
    icon: "📱",
    title: "WhatsApp Integration",
    description: "Integração nativa com WhatsApp para envio de mensagens",
  },
  {
    icon: "📋",
    title: "Gestão de Pacientes",
    description: "Cadastre e organize seus pacientes em um só lugar",
  },
  {
    icon: "⏰",
    title: "Lembretes Automáticos",
    description: "Envie lembretes de consultas automaticamente",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: colors.background.gradient }}>
      <Header>
        <HeaderTitle>SomaClini</HeaderTitle>
        
        <Flex gap="md" align="center">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="outline" size="md">
                Entrar
              </Button>
            </SignInButton>
          </Show>
          
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </Show>
        </Flex>
      </Header>

      <HeroSection>
        <HeroTitle>
          Controle de Mensagens<br />para Clínicas
        </HeroTitle>
        
        <HeroSubtitle>
          Gerencie comunicações com seus pacientes via WhatsApp de forma
          simples e eficiente. Envie lembretes, confirmações e muito mais.
        </HeroSubtitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: spacing.xl,
            marginTop: spacing['3xl'],
          }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </div>
      </HeroSection>
    </div>
  );
}
