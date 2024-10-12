import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('team_roster')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('player_id', 'integer', col => col.notNull())
    .addColumn('team_id', 'integer', col => col.notNull())
    .addColumn('list_id', 'integer', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('roster_idx')
    .on('team_roster')
    .column('player_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('team_roster').ifExists().execute()
}
