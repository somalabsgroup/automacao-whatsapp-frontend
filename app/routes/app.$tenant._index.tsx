import { useLoaderData, useParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  return { tenant: params.tenant };
}

export default function Dashboard() {
  const { tenant } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#1f2937",
          marginBottom: "0.5rem",
        }}
      >
        Dashboard
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Bem-vindo ao painel de controle da clínica
      </p>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            Total de Pacientes
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
            0
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            Mensagens Enviadas
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
            0
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            Mensagens Hoje
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
            0
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
        >
          Ações Rápidas
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href={`/app/${tenant}/pacientes`}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#10b981",
              color: "white",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "600",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#10b981";
            }}
          >
            Cadastrar Paciente
          </a>
          <a
            href={`/app/${tenant}/mensagens`}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#3b82f6",
              color: "white",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "600",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3b82f6";
            }}
          >
            Enviar Mensagem
          </a>
        </div>
      </div>
    </div>
  );
}
