import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserWithTenants } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";

function getSubdomain(hostname: string): string | null {
  const host = hostname.split(":")[0];
  if (host === "localhost" || host === "127.0.0.1") return null;
  const subdomain = host.replace(`.${BASE_DOMAIN}`, "");
  if (subdomain === BASE_DOMAIN || subdomain === host) return null;
  return subdomain;
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserWithTenants(userId);

  if (!user || user.tenants.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Bem-vindo!</h1>
        <p>Você ainda não tem acesso a nenhuma clínica.</p>
        <p>Entre em contato com o administrador para obter acesso.</p>
      </div>
    );
  }

  // Verifica se está em um subdomínio
  const headersList = await headers();
  const hostname = headersList.get("host") || "";
  const subdomain = getSubdomain(hostname);

  // Se está em um subdomínio, mostra o dashboard do tenant
  if (subdomain) {
    const currentTenant = user.tenants.find((t) => t.slug === subdomain);
    
    if (!currentTenant) {
      redirect("/unauthorized");
    }

    return (
      <div style={{ padding: "2rem" }}>
        <h1>Dashboard - {currentTenant.name}</h1>
        <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
          Role: {currentTenant.role}
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

  // Se está no domínio principal e tem apenas uma clínica, redireciona direto
  if (user.tenants.length === 1) {
    const tenant = user.tenants[0];
    redirect(`https://${tenant.slug}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/dashboard`);
  }

  // Se está no domínio principal e tem múltiplas clínicas, mostra lista
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Selecione uma Clínica</h1>
      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
        {user.tenants.map((tenant) => (
          <a
            key={tenant.id}
            href={`https://${tenant.slug}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/dashboard`}
            style={{
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              display: "block",
            }}
          >
            <h3>{tenant.name}</h3>
            <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
              Role: {tenant.role}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
