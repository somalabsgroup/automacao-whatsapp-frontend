import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Acesso Negado - SomaClini" },
    { name: "description", content: "Você não tem permissão para acessar esta clínica" },
  ];
};

export default function Unauthorized() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#fee2e2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>🚫</span>
        </div>

        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#1f2937",
          }}
        >
          Acesso Negado
        </h1>
        
        <p
          style={{
            color: "#6b7280",
            marginBottom: "2rem",
            lineHeight: "1.6",
          }}
        >
          Você não tem permissão para acessar esta clínica. Entre em contato com
          o administrador para solicitar acesso.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "0.875rem 2rem",
            background: "#10b981",
            border: "none",
            borderRadius: "0.5rem",
            color: "white",
            fontSize: "1rem",
            fontWeight: "600",
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#059669";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#10b981";
          }}
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
