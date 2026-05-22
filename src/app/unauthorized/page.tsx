"use client";

import styled from "styled-components";
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  max-width: 600px;
  width: 100%;
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
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const InfoBox = styled.div`
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: #1f2937;
  font-weight: 600;
  font-family: monospace;
`;

const TenantList = styled.div`
  margin-top: 1rem;
`;

const TenantItem = styled.a`
  display: block;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
    transform: translateX(4px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
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

const SecondaryButton = styled(Button)`
  background: #6b7280;
  
  &:hover {
    background: #4b5563;
  }
`;

interface OrgMembership {
  id: string;
  slug?: string;
  role: string;
  organization?: {
    name?: string;
    slug?: string;
  };
}

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user } = useUser();
  const { isLoaded } = useAuth();
  const [subdomain, setSubdomain] = useState<string>("");
  const [orgMemberships, setOrgMemberships] = useState<OrgMembership[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const host = hostname.split(":")[0];
      const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";
      
      if (host !== "localhost" && host !== "127.0.0.1") {
        const sub = host.replace(`.${baseDomain}`, "");
        if (sub !== baseDomain && sub !== host) {
          setSubdomain(sub);
        }
      }
    }

    // Pega as organizações do usuário via sessionClaims
    if (user?.organizationMemberships) {
      const memberships = user.organizationMemberships.map((m: any) => ({
        id: m.id,
        slug: m.organization.slug,
        role: m.role,
        organization: {
          name: m.organization.name,
          slug: m.organization.slug
        }
      }));
      setOrgMemberships(memberships);
    }
  }, [user]);

  return (
    <Container>
      <Card>
        <Icon>🚫</Icon>
        <Title>Acesso Negado</Title>
        <Description>
          Você não tem permissão para acessar este subdomínio.
        </Description>

        {subdomain && (
          <InfoBox>
            <InfoLabel>Subdomínio tentado:</InfoLabel>
            <InfoValue>{subdomain}</InfoValue>
          </InfoBox>
        )}

        {isLoaded && orgMemberships.length > 0 && (
          <div>
            <Description style={{ marginBottom: "0.5rem" }}>
              Suas organizações disponíveis:
            </Description>
            <TenantList>
              {orgMemberships.map((membership) => {
                const slug = membership.slug || membership.organization?.slug;
                const name = membership.organization?.name || slug;
                return (
                  <TenantItem
                    key={membership.id}
                    href={`https://${slug}.${process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br"}`}
                  >
                    <strong>{name}</strong>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>
                      {slug} • {membership.role}
                    </div>
                  </TenantItem>
                );
              })}
            </TenantList>
          </div>
        )}

        {isLoaded && orgMemberships.length === 0 && (
          <InfoBox>
            <Description>
              Você ainda não pertence a nenhuma organização.
              Entre em contato com o administrador para solicitar acesso.
            </Description>
          </InfoBox>
        )}

        <ButtonGroup>
          <SignOutButton>
            <SecondaryButton>
              Fazer Logout
            </SecondaryButton>
          </SignOutButton>
          <Button onClick={() => router.push("/")}>
            Voltar para Home
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
}
