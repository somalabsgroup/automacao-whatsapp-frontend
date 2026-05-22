"use client";

import styled from "styled-components";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background: #667eea;
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #5568d3;
    transform: translateY(-2px);
  }
`;

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <Container>
      <Card>
        <Icon>🚫</Icon>
        <Title>Acesso Negado</Title>
        <Description>
          Você não tem permissão para acessar esta clínica. 
          Entre em contato com o administrador para solicitar acesso.
        </Description>
        <SignOutButton>
          <Button onClick={() => router.push("/")}>
            Voltar para Home
          </Button>
        </SignOutButton>
      </Card>
    </Container>
  );
}
