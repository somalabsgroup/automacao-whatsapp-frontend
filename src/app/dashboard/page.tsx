import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";

interface TenantInfo {
  id: string;
  slug: string;
  role: string;
  name?: string;
}

function getSubdomain(hostname: string): string | null {
  const host = hostname.split(":")[0];
  if (host === "localhost" || host === "127.0.0.1") return null;
  const subdomain = host.replace(`.${BASE_DOMAIN}`, "");
  if (subdomain === BASE_DOMAIN || subdomain === host) return null;
  return subdomain;
}

export default async function DashboardPage() {
  // Middleware já garantiu que o usuário está autenticado e tem acesso ao tenant
  // Apenas pegamos os dados para exibir
  const { sessionClaims } = await auth();
  const tenants = (sessionClaims?.tenants as TenantInfo[]) || [];

  const headersList = await headers();
  const hostname = headersList.get("host") || "";
  const subdomain = getSubdomain(hostname);

  // Se está em um subdomínio, mostra o dashboard do tenant
  if (subdomain) {
    const currentTenant = tenants.find((t) => t.slug === subdomain);
    
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Dashboard - {currentTenant?.name || subdomain}</h1>
        <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
          Role: {currentTenant?.role || "user"}
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

  // Se está no domínio principal, mostra lista de clínicas disponíveis
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Selecione uma Clínica</h1>
      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
        {tenants.map((tenant) => (
          <a
            key={tenant.id}
            href={`https://${tenant.slug}.${BASE_DOMAIN}/dashboard`}
            style={{
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              display: "block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3>{tenant.name || tenant.slug}</h3>
            <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
              Role: {tenant.role}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
