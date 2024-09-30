import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const TeamsTable = sqliteTable('teams', {
  team_id: integer('team_id').notNull(),
  name: text('name'),
  abbr: text('abbr'),
  nickname: text('nickname'),
  logo_file_name: text('logo_file_name'),
}, (table) => {
  return {
    team_id_idx: index('team_id_idx').on(table.team_id),
  }
})
export type Team = typeof TeamsTable.$inferSelect

export async function createTeamsTable() {
  const db = useSqlite()
  await db.run(sql`DROP TABLE IF EXISTS teams`)
  await db.run(sql`CREATE TABLE teams (
        "team_id" integer NOT NULL,
        "name" text,
        "abbr" text,
        "nickname" text,
        "logo_file_name" text
      )`)
}
