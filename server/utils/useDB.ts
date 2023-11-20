import { drizzle } from 'drizzle-orm/mysql2'
import mysql2 from 'mysql2/promise'

export const mysql2Connection = mysql2.createPool({
  uri: useRuntimeConfig().databaseURL,
})

export function useDB() {
  const client = drizzle(mysql2Connection)
  return client
}
