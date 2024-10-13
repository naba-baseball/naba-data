import { sql } from 'kysely'
/* eslint-disable no-console */
export default defineNitroPlugin(async () => {
  const db = useSqlite()
  console.log('Setting up database')
  await sql`PRAGMA journal_mode=WAL`.execute(db)
  await sql`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        role TEXT,
        password TEXT NOT NULL
    )`.execute(db)
  await sql`CREATE INDEX IF NOT EXISTS "username_idx" ON "users" ("username")`.execute(db)
  await sql`CREATE INDEX IF NOT EXISTS "role_idx" ON "users" ("role")`.execute(db)
  await sql`CREATE INDEX IF NOT EXISTS "id_idx" ON "users" ("id")`.execute(db)
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id),
        expires_at INTEGER NOT NULL
    )`.execute(db)
  // if no admin user, trigger onboarding flow
  const data = await db.selectFrom('users').selectAll().where('users.role', '=', 'admin').execute()
  const adminUser = data?.[0]
  if (!adminUser) {
    console.log('No admin user found, triggering onboarding')
    await useStorage('preferences').setItem('onboarding', true)
  }
})
