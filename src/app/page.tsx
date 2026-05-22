export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">SomaClini</h1>
          <p className="mt-2 text-lg text-gray-500">
            Automação de WhatsApp para clínicas médicas
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-left space-y-3">
          <p className="text-sm text-gray-600">
            O acesso ao sistema é feito através do endereço da sua clínica:
          </p>
          <p className="font-mono text-sm bg-gray-100 rounded px-3 py-2 text-gray-700">
            https://<span className="text-blue-600">sua-clinica</span>.somaclini.com.br
          </p>
          <p className="text-xs text-gray-400">
            Não sabe o endereço? Entre em contato com o administrador da sua clínica.
          </p>
        </div>
      </div>
    </div>
  )
}
