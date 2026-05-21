"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const HeroSection = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button`
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <Container>
      <Header>
        <Logo>SomaClini</Logo>
        <div>
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button>Entrar</Button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </div>
      </Header>

      <HeroSection>
        <Title>Automatize suas mensagens WhatsApp</Title>
        <Subtitle>
          Gerencie mensagens, lembretes e comunicações com seus pacientes de
          forma simples e eficiente
        </Subtitle>

        {!isSignedIn && (
          <SignInButton mode="modal">
            <Button>Começar Gratuitamente</Button>
          </SignInButton>
        )}

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Integração WhatsApp</FeatureTitle>
            <FeatureDescription>
              Conecte-se facilmente com seus pacientes através do WhatsApp
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Gestão de Pacientes</FeatureTitle>
            <FeatureDescription>
              Organize e gerencie informações dos seus pacientes em um só lugar
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⏰</FeatureIcon>
            <FeatureTitle>Lembretes Automáticos</FeatureTitle>
            <FeatureDescription>
              Envie lembretes de consultas automaticamente para seus pacientes
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </HeroSection>
    </Container>
  );
}
