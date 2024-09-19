/* eslint-disable no-console */
export default defineNitroPlugin(async () => {
  const db = useDatabase()
  console.log('Setting up database')
  await db.sql`PRAGMA journal_mode=WAL`
  await db.sql`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        role TEXT,
        password TEXT NOT NULL
    )`
  await db.sql`CREATE INDEX IF NOT EXISTS "username_idx" ON "users" ("username")`
  await db.sql`CREATE INDEX IF NOT EXISTS "role_idx" ON "users" ("role")`
  await db.sql`CREATE INDEX IF NOT EXISTS "id_idx" ON "users" ("id")`
  await db.sql`
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id),
        expires_at INTEGER NOT NULL
    )`
  // if no admin user, trigger onboarding flow
  const data = await db.sql`SELECT * FROM users WHERE role = 'admin'`
  const adminUser = data.rows?.[0]
  if (!adminUser) {
    console.log('No admin user found, triggering onboarding')
    await useStorage('preferences').setItem('onboarding', true)
  }
})
