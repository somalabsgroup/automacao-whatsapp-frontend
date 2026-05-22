import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";

interface OrgMembership {
  id: string;
  slug: string;
  role: string;
  organization?: {
    name: string;
    slug: string;
  };
}

function getSubdomain(hostname: string): string | null {
  const host = hostname.split(":")[0];
  if (host === "localhost" || host === "127.0.0.1") return null;
  const subdomain = host.replace(`.${BASE_DOMAIN}`, "");
  if (subdomain === BASE_DOMAIN || subdomain === host) return null;
  return subdomain;
}

export default async function DashboardPage() {
  console.log(`[Dashboard] 🏠 Página de dashboard acessada`);
  
  const { sessionClaims, userId } = await auth();
  
  if (!userId) {
    console.log(`[Dashboard] ❌ Usuário não autenticado, redirecionando para /sign-in`);
    redirect("/sign-in");
  }
  
  const orgMemberships = (sessionClaims?.org_memberships as OrgMembership[]) || [];

  const headersList = await headers();
  const hostname = headersList.get("host") || "";
  const subdomain = getSubdomain(hostname);
  
  console.log(`[Dashboard] Hostname: ${hostname}`);
  console.log(`[Dashboard] Subdomain: ${subdomain}`);
  console.log(`[Dashboard] Organizations: ${orgMemberships.length}`);

  // Se está em um subdomínio, VALIDA SE TEM ACESSO
  if (subdomain) {
    console.log(`[Dashboard] 🔍 Validando acesso ao subdomain "${subdomain}"`);
    
    const currentOrg = orgMemberships.find((m) => {
      const orgSlug = m.slug || m.organization?.slug;
      console.log(`[Dashboard] Comparando: "${orgSlug}" === "${subdomain}"`);
      return orgSlug === subdomain;
    });
    
    // SE NÃO TEM ACESSO, REDIRECIONA PARA /unauthorized
    if (!currentOrg) {
      console.log(`[Dashboard] ❌❌❌ SEM ACESSO - Redirecionando para /unauthorized`);
      redirect("/unauthorized");
    }
    
    console.log(`[Dashboard] ✅ Acesso confirmado!`);
    
    console.log(`[Dashboard] ✅ Acesso confirmado!`);
    
    const orgName = currentOrg.organization?.name || subdomain;
    const userRole = currentOrg.role || "member";
    
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Dashboard - {orgName}</h1>
        <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
          Role: {userRole}
        </p>
        
        <div style={{ marginTop: "2rem" }}>
          <h2>Estatísticas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}>
              <h3>Pacientes</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>0</p>
            </div>
            <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}>
              <h3>Mensagens Enviadas</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>0</p>
            </div>
            <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}>
              <h3>Mensagens Agendadas</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>0</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se está no domínio principal, mostra lista de organizações disponíveis
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Selecione uma Clínica</h1>
      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
        {orgMemberships.map((membership) => {
          const slug = membership.slug || membership.organization?.slug;
          const name = membership.organization?.name || slug;
          return (
            <a
              key={membership.id}
              href={`https://${slug}.${BASE_DOMAIN}/dashboard`}
              style={{
                padding: "1.5rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3>{name}</h3>
              <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
                Role: {membership.role}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
