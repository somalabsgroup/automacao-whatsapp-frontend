import { Outlet, useLoaderData, useParams } from "react-router";
import { UserButton } from "@clerk/react";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { tenantRouteMiddleware } from "~/utils/middleware.server";

export async function loader(args: LoaderFunctionArgs) {
  const context = await tenantRouteMiddleware(args);
  return { subdomain: context.subdomain };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.subdomain || 'Clínica'} - SomaClini` },
    { name: "description", content: "Dashboard da clínica" },
  ];
};

export default function TenantLayout() {
  const { subdomain } = useLoaderData<typeof loader>();

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#1f2937",
          color: "white",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            textTransform: "capitalize",
          }}
        >
          {subdomain}
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #374151",
          }}
        >
          SomaClini
        </p>

        <nav style={{ flex: 1 }}>
          <a
            href={`/app/${subdomain}`}
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              marginBottom: "0.5rem",
              borderRadius: "0.5rem",
              color: "white",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            📊 Dashboard
          </a>
          <a
            href={`/app/${subdomain}/pacientes`}
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              marginBottom: "0.5rem",
              borderRadius: "0.5rem",
              color: "white",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            👥 Pacientes
          </a>
          <a
            href={`/app/${subdomain}/mensagens`}
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              marginBottom: "0.5rem",
              borderRadius: "0.5rem",
              color: "white",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            💬 Mensagens
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            padding: "1rem 2rem",
            background: "white",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </header>

        {/* Content */}
        <main
          style={{
            flex: 1,
            padding: "2rem",
            background: "#f9fafb",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
