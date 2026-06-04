import { pgTable, serial, bigserial, text, boolean, varchar, timestamp } from 'drizzle-orm/pg-core'

export const clientes = pgTable('clientes', {
  id:                 serial('id').primaryKey(),
  nombre:             text('nombre').notNull(),
  tipo:               varchar('tipo', { length: 20 }).notNull().default('PARTICULAR'),
  email:              text('email'),
  telefono:           text('telefono'),
  direccion:          text('direccion'),
  localidad:          text('localidad'),
  cuit:               text('cuit'),
  rubro:              text('rubro'),
  notas:              text('notas'),
  activo:             boolean('activo').notNull().default(true),
  imagen:             text('imagen'),
  pagina_web:         text('pagina_web'),
  mostrar_en_landing: boolean('mostrar_en_landing').notNull().default(false),
  created_at:         timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at:         timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const contactos = pgTable('contactos', {
  id:         bigserial('id', { mode: 'number' }).primaryKey(),
  nombre:     text('nombre').notNull(),
  empresa:    text('empresa'),
  email:      text('email').notNull(),
  telefono:   text('telefono'),
  mensaje:    text('mensaje').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
})
