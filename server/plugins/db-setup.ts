export default defineNitroPlugin(async (nitro) => {
  const db = useDatabase()
  await db.sql`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        role TEXT,
        password TEXT NOT NULL
    )`
  await db.sql`
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id),
        expires_at INTEGER NOT NULL
    )`
})
