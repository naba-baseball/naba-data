import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('players_career_batting')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('player_id', 'integer', col => col.notNull())
    .addColumn('year', 'integer', col => col.notNull())
    .addColumn('team_id', 'integer', col => col.notNull())
    .addColumn('game_id', 'integer', col => col.notNull())
    .addColumn('league_id', 'integer', col => col.notNull())
    .addColumn('level_id', 'integer', col => col.notNull())
    .addColumn('split_id', 'integer', col => col.notNull())
    .addColumn('position', 'integer', col => col.notNull())
    .addColumn('ab', 'integer', col => col.notNull())
    .addColumn('h', 'integer', col => col.notNull())
    .addColumn('k', 'integer', col => col.notNull())
    .addColumn('pa', 'integer', col => col.notNull())
    .addColumn('pitches_seen', 'integer', col => col.notNull())
    .addColumn('g', 'integer', col => col.notNull())
    .addColumn('gs', 'integer', col => col.notNull())
    .addColumn('d', 'integer', col => col.notNull())
    .addColumn('t', 'integer', col => col.notNull())
    .addColumn('hr', 'integer', col => col.notNull())
    .addColumn('r', 'integer', col => col.notNull())
    .addColumn('rbi', 'integer', col => col.notNull())
    .addColumn('sb', 'integer', col => col.notNull())
    .addColumn('cs', 'integer', col => col.notNull())
    .addColumn('bb', 'integer', col => col.notNull())
    .addColumn('ibb', 'integer', col => col.notNull())
    .addColumn('gdp', 'integer', col => col.notNull())
    .addColumn('sh', 'integer', col => col.notNull())
    .addColumn('sf', 'integer', col => col.notNull())
    .addColumn('hp', 'integer', col => col.notNull())
    .addColumn('ci', 'integer', col => col.notNull())
    .addColumn('wpa', 'integer', col => col.notNull())
    .addColumn('stint', 'integer', col => col.notNull())
    .addColumn('ubr', 'integer', col => col.notNull())
    .addColumn('war', 'integer', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('players_career_batting_player_id_idx')
    .on('players_career_batting')
    .column('player_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('players_career_batting').ifExists().execute()
}
