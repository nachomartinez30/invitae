import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { crearInvitado } from '../../server/invitados'
import { InvitadoForm } from '../../components/InvitadoForm'

export const Route = createFileRoute('/invitados/nuevo')({
  component: NuevoInvitadoPage,
})

function NuevoInvitadoPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(data: Parameters<typeof crearInvitado>[0]['data']) {
    try {
      await crearInvitado({ data })
      router.navigate({ to: '/invitados' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al crear invitado')
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nuevo invitado</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <InvitadoForm onSubmit={handleSubmit} submitLabel="Crear invitado" />
    </div>
  )
}
