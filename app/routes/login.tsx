import { Show, SignInButton, UserButton } from "@clerk/react";
import type { MetaFunction } from "react-router";
import { PageContainer, AuthCard, Heading, Text, Button, Logo } from "~/components/ui/styled";
import { colors } from "~/styles/tokens";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - SomaClini" },
    { name: "description", content: "Sistema de controle de mensagens para clínicas" },
  ];
};

export default function Login() {
  return (
    <PageContainer>
      <AuthCard>
        <Logo>SomaClini</Logo>
        
        <Heading size="md" style={{ marginBottom: '0.5rem' }}>
          Bem-vindo de volta
        </Heading>
        
        <Text color={colors.neutral[600]} style={{ marginBottom: '2rem' }}>
          Sistema de controle de mensagens para clínicas
        </Text>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="primary" size="lg" fullWidth>
              Entrar na plataforma
            </Button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div style={{ marginBottom: '1rem' }}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-16 h-16 mx-auto",
                },
              }}
            />
          </div>
          <Text color={colors.success.main} weight="semibold">
            Você está conectado!
          </Text>
        </Show>

        <Text size="sm" color={colors.neutral[400]} style={{ marginTop: '2rem' }}>
          Sistema apenas por convite
        </Text>
      </AuthCard>
    </PageContainer>
  );
}
