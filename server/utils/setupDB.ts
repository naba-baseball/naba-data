import { sql } from 'drizzle-orm'

export async function setupDB(
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
