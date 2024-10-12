import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('players')
    .addColumn('player_id', 'integer', col => col.primaryKey())
    .addColumn('first_name', 'text', col => col.notNull())
    .addColumn('last_name', 'text', col => col.notNull())
    .addColumn('team_id', 'integer', col => col.notNull())
    .addColumn('position', 'integer', col => col.notNull())
    .addColumn('age', 'integer', col => col.notNull())
    .addColumn('role', 'integer', col => col.notNull())
    .addColumn('bats', 'integer', col => col.notNull())
    .addColumn('throws', 'integer', col => col.notNull())
    .addColumn('roster', 'text')
    .execute()
  await db.schema
    .createIndex('players_player_id_idx')
    .on('players')
    .column('player_id')
    .execute()

  await db.schema
    .createIndex('players_team_id_idx')
    .on('players')
    .column('team_id')
    .execute()

  await db.schema
    .createIndex('players_position_idx')
    .on('players')
    .column('position')
    .execute()

  await db.schema
    .createIndex('players_role_idx')
    .on('players')
    .column('role')
    .execute()
  await db.schema
    .createIndex('players_team_id_roster_position_idx')
    .on('players')
    .column('team_id')
    .column('roster')
    .column('position')
    .column('last_name asc')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('players').ifExists().execute()
}
