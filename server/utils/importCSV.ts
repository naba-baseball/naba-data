import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql2 from 'mysql2/promise'

export async function importCSV(
  fileName: string,
  table: string,
) {
  const file = (await useStorage('files').getItem(fileName)) as string
  const ops = file.trim().split('\n')
  const db = useDB()
  await db.execute(sql.raw(`DELETE FROM ${table}`))
  await db.transaction(async (tx) => {
    // await tx.execute(sql.raw(file.trim()))
    // IDK why I need to do this, but I get a "sql syntax error" if I try to run the whole file
    for (const line of ops) {
      if (!line)
        continue

      await tx.execute(sql.raw(line))
    }
  })
}
