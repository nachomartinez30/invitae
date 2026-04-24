import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { eliminarInvitado, getInvitados } from '../../server/invitados'

export const Route = createFileRoute('/invitados/')({
  loader: () => getInvitados(),
  component: InvitadosPage,
})

function InvitadosPage() {
  const invitados = Route.useLoaderData()
  const router = useRouter()

  async function handleEliminar(id: number, nombre: string) {
    if (!confirm(`¿Eliminar a ${nombre}?`)) return
    await eliminarInvitado({ data: id })
    router.invalidate()
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Invitados</h1>
        <Link
          to="/invitados/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo invitado
        </Link>
      </div>

      {invitados.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay invitados aún.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-left">
                <th className="pb-3 pr-4 font-semibold">Nombre</th>
                <th className="pb-3 pr-4 font-semibold">Email</th>
                <th className="pb-3 pr-4 font-semibold">Teléfono</th>
                <th className="pb-3 pr-4 font-semibold text-center">Confirmado</th>
                <th className="pb-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invitados.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 pr-4">
                    {inv.nombre} {inv.apellido}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{inv.email}</td>
                  <td className="py-3 pr-4 text-gray-600">{inv.telefono ?? '—'}</td>
                  <td className="py-3 pr-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        inv.confirmado
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {inv.confirmado ? 'Sí' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-2">
                    <Link
                      to="/invitados/$id/editar"
                      params={{ id: String(inv.id) }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(inv.id, inv.nombre)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
