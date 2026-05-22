export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Acesso Negado
        </h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta clínica, ou ela não existe.
        </p>
        <a
          href={
            process.env.NEXT_PUBLIC_BASE_DOMAIN
              ? `https://${process.env.NEXT_PUBLIC_BASE_DOMAIN}`
              : 'http://localhost:3000'
          }
          className="text-blue-600 hover:underline"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  )
}
