import { pgTable, serial, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'

export const invitados = pgTable('invitados', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  telefono: varchar('telefono', { length: 20 }),
  confirmado: boolean('confirmado').default(false).notNull(),
  notas: text('notas'),
  creadoEn: timestamp('creado_en').defaultNow().notNull(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().notNull(),
})

export type Invitado = typeof invitados.$inferSelect
export type NuevoInvitado = typeof invitados.$inferInsert
