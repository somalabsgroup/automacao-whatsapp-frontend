import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserWithTenants } from "@/lib/auth";

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

  // Se tem apenas uma clínica, redireciona direto
  if (user.tenants.length === 1) {
    const tenant = user.tenants[0];
    redirect(`https://${tenant.slug}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/dashboard`);
  }

  // Se tem múltiplas clínicas, mostra lista
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
