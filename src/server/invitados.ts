import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../db'
import { invitados } from '../db/schema'

const invitadoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  email: z.email('Email inválido'),
  telefono: z.string().optional(),
  confirmado: z.boolean().optional().default(false),
  notas: z.string().optional(),
})

export const getInvitados = createServerFn({ method: 'GET' }).handler(async () => {
  return db.select().from(invitados).orderBy(invitados.creadoEn)
})

const idSchema = z.number()
const actualizarInvitadoSchema = z.object({ id: z.number(), ...invitadoSchema.shape })

export const getInvitado = createServerFn({ method: 'GET' })
  .inputValidator(idSchema)
  .handler(async ({ data: id }) => {
    const [invitado] = await db.select().from(invitados).where(eq(invitados.id, id))
    return invitado ?? null
  })

export const crearInvitado = createServerFn({ method: 'POST' })
  .inputValidator(invitadoSchema)
  .handler(async ({ data }) => {
    const [invitado] = await db.insert(invitados).values(data).returning()
    return invitado
  })

export const actualizarInvitado = createServerFn({ method: 'POST' })
  .inputValidator(actualizarInvitadoSchema)
  .handler(async ({ data: { id, ...rest } }) => {
    const [invitado] = await db
      .update(invitados)
      .set({ ...rest, actualizadoEn: new Date() })
      .where(eq(invitados.id, id))
      .returning()
    return invitado
  })

export const eliminarInvitado = createServerFn({ method: 'POST' })
  .inputValidator(idSchema)
  .handler(async ({ data: id }) => {
    await db.delete(invitados).where(eq(invitados.id, id))
    return { ok: true }
  })
