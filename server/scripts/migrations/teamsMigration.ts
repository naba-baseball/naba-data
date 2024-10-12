import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('teams')
    .addColumn('team_id', 'integer', col => col.primaryKey())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('abbr', 'text', col => col.notNull())
    .addColumn('nickname', 'text', col => col.notNull())
    .addColumn('logo_file_name', 'text', col => col.notNull())
    .execute()

  db.schema
    .createIndex('teams_team_id_idx')
    .on('teams')
    .column('team_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('teams').ifExists().execute()
}
