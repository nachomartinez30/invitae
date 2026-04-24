import { useState } from 'react'
import { Link } from '@tanstack/react-router'

interface FormValues {
  nombre: string
  apellido: string
  email: string
  telefono: string
  confirmado: boolean
  notas: string
}

interface InvitadoFormProps {
  defaultValues?: Partial<FormValues>
  onSubmit: (data: FormValues) => Promise<void>
  submitLabel: string
}

const defaults: FormValues = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  confirmado: false,
  notas: '',
}

export function InvitadoForm({ defaultValues, onSubmit, submitLabel }: InvitadoFormProps) {
  const [values, setValues] = useState<FormValues>({ ...defaults, ...defaultValues })
  const [loading, setLoading] = useState(false)

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            required
            value={values.nombre}
            onChange={(e) => set('nombre', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
          <input
            type="text"
            required
            value={values.apellido}
            onChange={(e) => set('apellido', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          required
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          value={values.telefono}
          onChange={(e) => set('telefono', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
        <textarea
          rows={3}
          value={values.notas}
          onChange={(e) => set('notas', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="confirmado"
          checked={values.confirmado}
          onChange={(e) => set('confirmado', e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="confirmado" className="text-sm font-medium text-gray-700">
          Confirmado
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? 'Guardando...' : submitLabel}
        </button>
        <Link
          to="/invitados"
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
