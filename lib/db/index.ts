import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>

let _db: DrizzleClient | null = null

function getDb(): DrizzleClient {
  if (!_db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _db = drizzle(neon(process.env.DATABASE_URL!), { schema }) as any
  }
  return _db!
}

// Proxy para diferir la inicialización al primer uso real (no al import en build time)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: DrizzleClient = new Proxy({} as DrizzleClient, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_target, prop) {
    const client = getDb() as any
    const value = client[prop]
    return typeof value === 'function' ? value.bind(client) : value
  },
})
