import { Show, SignInButton, UserButton } from "@clerk/react";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          padding: "1.5rem 2rem",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1></h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                style={{
                  padding: "0.5rem 1.5rem",
                  background: "white",
                  border: "2px solid #10b981",
                  borderRadius: "0.5rem",
                  color: "#10b981",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Entrar
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </Show>
        </div>
      </header>
      <main></main>
    </div>
  );
}
