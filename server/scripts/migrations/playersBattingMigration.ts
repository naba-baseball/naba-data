import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('players_batting')
    .addColumn('player_id', 'integer', col => col.primaryKey())
    .addColumn('team_id', 'integer', col => col.notNull())
    .addColumn('position', 'integer', col => col.notNull())
    .addColumn('role', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_contact', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_gap', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_eye', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_strikeouts', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_hp', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_power', 'integer', col => col.notNull())
    .addColumn('batting_ratings_overall_babip', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_contact', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_gap', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_eye', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_strikeouts', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_hp', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_power', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsr_babip', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_contact', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_gap', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_eye', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_strikeouts', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_hp', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_power', 'integer', col => col.notNull())
    .addColumn('batting_ratings_vsl_babip', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_contact', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_gap', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_eye', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_strikeouts', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_hp', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_power', 'integer', col => col.notNull())
    .addColumn('batting_ratings_talent_babip', 'integer', col => col.notNull())
    .addColumn('batting_ratings_misc_bunt', 'integer', col => col.notNull())
    .addColumn('batting_ratings_misc_bunt_for_hit', 'integer', col => col.notNull())
    .addColumn('batting_ratings_misc_gb_hitter_type', 'integer', col => col.notNull())
    .addColumn('batting_ratings_misc_fb_hitter_type', 'integer', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('players_batting_player_id_idx')
    .on('players_batting')
    .column('player_id')
    .execute()

  await db.schema
    .createIndex('players_batting_team_id_idx')
    .on('players_batting')
    .column('team_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('players_batting').ifExists().execute()
}
