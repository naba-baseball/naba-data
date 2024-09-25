import type { H3Event } from 'h3'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

let client: ReturnType<typeof createClient>
export function useSqlite(event?: H3Event) {
  client ??= createClient({ url: useRuntimeConfig(event).dbUrl, authToken: useRuntimeConfig(event).dbToken })
  return drizzle(client)
}
