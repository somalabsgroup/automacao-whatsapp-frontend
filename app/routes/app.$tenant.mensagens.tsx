export default function Mensagens() {
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
        Mensagens
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Envie e gerencie mensagens via WhatsApp
      </p>

      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>
            Histórico de Mensagens
          </h2>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3b82f6";
            }}
          >
            + Nova Mensagem
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#6b7280",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💬</div>
          <p style={{ fontSize: "1.125rem" }}>Nenhuma mensagem enviada ainda</p>
          <p style={{ fontSize: "0.875rem" }}>
            Comece enviando sua primeira mensagem
          </p>
        </div>
      </div>
    </div>
  );
}
