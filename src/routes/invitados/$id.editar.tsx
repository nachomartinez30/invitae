import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { getInvitado, actualizarInvitado } from '../../server/invitados'
import { InvitadoForm } from '../../components/InvitadoForm'

export const Route = createFileRoute('/invitados/$id/editar')({
  loader: ({ params }) => getInvitado({ data: Number(params.id) }),
  component: EditarInvitadoPage,
})

function EditarInvitadoPage() {
  const invitado = Route.useLoaderData()
  const { id } = Route.useParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  if (!invitado) {
    return <p className="p-8 text-gray-500">Invitado no encontrado.</p>
  }

  async function handleSubmit(data: Parameters<typeof actualizarInvitado>[0]['data']) {
    try {
      await actualizarInvitado({ data: { id: Number(id), ...data } })
      router.navigate({ to: '/invitados' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al actualizar invitado')
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar invitado</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <InvitadoForm
        defaultValues={{
          nombre: invitado.nombre,
          apellido: invitado.apellido,
          email: invitado.email,
          telefono: invitado.telefono ?? '',
          confirmado: invitado.confirmado,
          notas: invitado.notas ?? '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Guardar cambios"
      />
    </div>
  )
}
