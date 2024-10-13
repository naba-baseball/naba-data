import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('players_pitching')
    .addColumn('player_id', 'integer', col => col.primaryKey())
    .addColumn('team_id', 'integer', col => col.notNull())
    .addColumn('position', 'integer', col => col.notNull())
    .addColumn('role', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_overall_stuff', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_overall_control', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_overall_movement', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_overall_balk', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_overall_hp', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_overall_wild_pitch', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsr_stuff', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsr_control', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsr_movement', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsr_balk', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsr_hp', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsr_wild_pitch', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsl_stuff', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsl_control', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsl_movement', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsl_balk', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsl_hp', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_vsl_wild_pitch', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_talent_stuff', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_talent_control', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_talent_movement', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_talent_balk', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_talent_hp', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_talent_wild_pitch', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_fastball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_slider', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_curveball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_screwball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_forkball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_changeup', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_sinker', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_splitter', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_knuckleball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_cutter', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_circlechange', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_knucklecurve', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_fastball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_slider', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_curveball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_screwball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_forkball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_changeup', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_sinker', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_splitter', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_knuckleball', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_cutter', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_circlechange', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_pitches_talent_knucklecurve', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_misc_velocity', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_misc_arm_slot', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_misc_stamina', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_misc_ground_fly', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_misc_hold', 'integer', col => col.notNull())
    .addColumn('pitching_ratings_babip', 'integer')
    .execute()

  await db.schema
    .createIndex('players_pitching_player_id_idx')
    .on('players_pitching')
    .column('player_id')
    .execute()

  await db.schema
    .createIndex('players_pitching_team_id_idx')
    .on('players_pitching')
    .column('team_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('players_pitching').ifExists().execute()
}
