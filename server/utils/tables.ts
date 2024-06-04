import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const PlayersTable = sqliteTable('players', {
  player_id: integer('player_id').notNull(),
  team_id: integer('team_id').notNull(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  position: integer('position').notNull(),
  age: integer('age').notNull(),
  role: integer('role').notNull(),
  bats: integer('bats').notNull(),
  throws: integer('throws').notNull(),
  roster: text('roster'),

  batting_ratings_overall_contact: integer('batting_ratings_overall_contact').notNull(),
  batting_ratings_overall_gap: integer('batting_ratings_overall_gap').notNull(),
  batting_ratings_overall_eye: integer('batting_ratings_overall_eye').notNull(),
  batting_ratings_overall_strikeouts: integer('batting_ratings_overall_strikeouts').notNull(),
  batting_ratings_overall_hp: integer('batting_ratings_overall_hp').notNull(),
  batting_ratings_overall_power: integer('batting_ratings_overall_power').notNull(),
  batting_ratings_overall_babip: integer('batting_ratings_overall_babip').notNull(),
  batting_ratings_vsr_contact: integer('batting_ratings_vsr_contact').notNull(),
  batting_ratings_vsr_gap: integer('batting_ratings_vsr_gap').notNull(),
  batting_ratings_vsr_eye: integer('batting_ratings_vsr_eye').notNull(),
  batting_ratings_vsr_strikeouts: integer('batting_ratings_vsr_strikeouts').notNull(),
  batting_ratings_vsr_hp: integer('batting_ratings_vsr_hp').notNull(),
  batting_ratings_vsr_power: integer('batting_ratings_vsr_power').notNull(),
  batting_ratings_vsr_babip: integer('batting_ratings_vsr_babip').notNull(),
  batting_ratings_vsl_contact: integer('batting_ratings_vsl_contact').notNull(),
  batting_ratings_vsl_gap: integer('batting_ratings_vsl_gap').notNull(),
  batting_ratings_vsl_eye: integer('batting_ratings_vsl_eye').notNull(),
  batting_ratings_vsl_strikeouts: integer('batting_ratings_vsl_strikeouts').notNull(),
  batting_ratings_vsl_hp: integer('batting_ratings_vsl_hp').notNull(),
  batting_ratings_vsl_power: integer('batting_ratings_vsl_power').notNull(),
  batting_ratings_vsl_babip: integer('batting_ratings_vsl_babip').notNull(),
  batting_ratings_talent_contact: integer('batting_ratings_talent_contact').notNull(),
  batting_ratings_talent_gap: integer('batting_ratings_talent_gap').notNull(),
  batting_ratings_talent_eye: integer('batting_ratings_talent_eye').notNull(),
  batting_ratings_talent_strikeouts: integer('batting_ratings_talent_strikeouts').notNull(),
  batting_ratings_talent_hp: integer('batting_ratings_talent_hp').notNull(),
  batting_ratings_talent_power: integer('batting_ratings_talent_power').notNull(),
  batting_ratings_talent_babip: integer('batting_ratings_talent_babip').notNull(),
  batting_ratings_misc_bunt: integer('batting_ratings_misc_bunt').notNull(),
  batting_ratings_misc_bunt_for_hit: integer('batting_ratings_misc_bunt_for_hit').notNull(),
  batting_ratings_misc_gb_hitter_type: integer('batting_ratings_misc_gb_hitter_type').notNull(),
  batting_ratings_misc_fb_hitter_type: integer('batting_ratings_misc_fb_hitter_type').notNull(),

  pitching_ratings_overall_stuff: integer('pitching_ratings_overall_stuff').notNull(),
  pitching_ratings_overall_control: integer('pitching_ratings_overall_control').notNull(),
  pitching_ratings_overall_movement: integer('pitching_ratings_overall_movement').notNull(),
  pitching_ratings_overall_balk: integer('pitching_ratings_overall_balk').notNull(),
  pitching_ratings_overall_hp: integer('pitching_ratings_overall_hp').notNull(),
  pitching_ratings_overall_wild_pitch: integer('pitching_ratings_overall_wild_pitch').notNull(),
  pitching_ratings_vsr_stuff: integer('pitching_ratings_vsr_stuff').notNull(),
  pitching_ratings_vsr_control: integer('pitching_ratings_vsr_control').notNull(),
  pitching_ratings_vsr_movement: integer('pitching_ratings_vsr_movement').notNull(),
  pitching_ratings_vsr_balk: integer('pitching_ratings_vsr_balk').notNull(),
  pitching_ratings_vsr_hp: integer('pitching_ratings_vsr_hp').notNull(),
  pitching_ratings_vsr_wild_pitch: integer('pitching_ratings_vsr_wild_pitch').notNull(),
  pitching_ratings_vsl_stuff: integer('pitching_ratings_vsl_stuff').notNull(),
  pitching_ratings_vsl_control: integer('pitching_ratings_vsl_control').notNull(),
  pitching_ratings_vsl_movement: integer('pitching_ratings_vsl_movement').notNull(),
  pitching_ratings_vsl_balk: integer('pitching_ratings_vsl_balk').notNull(),
  pitching_ratings_vsl_hp: integer('pitching_ratings_vsl_hp').notNull(),
  pitching_ratings_vsl_wild_pitch: integer('pitching_ratings_vsl_wild_pitch').notNull(),
  pitching_ratings_talent_stuff: integer('pitching_ratings_talent_stuff').notNull(),
  pitching_ratings_talent_control: integer('pitching_ratings_talent_control').notNull(),
  pitching_ratings_talent_movement: integer('pitching_ratings_talent_movement').notNull(),
  pitching_ratings_talent_balk: integer('pitching_ratings_talent_balk').notNull(),
  pitching_ratings_talent_hp: integer('pitching_ratings_talent_hp').notNull(),
  pitching_ratings_talent_wild_pitch: integer('pitching_ratings_talent_wild_pitch').notNull(),
  pitching_ratings_pitches_fastball: integer('pitching_ratings_pitches_fastball').notNull(),
  pitching_ratings_pitches_slider: integer('pitching_ratings_pitches_slider').notNull(),
  pitching_ratings_pitches_curveball: integer('pitching_ratings_pitches_curveball').notNull(),
  pitching_ratings_pitches_screwball: integer('pitching_ratings_pitches_screwball').notNull(),
  pitching_ratings_pitches_forkball: integer('pitching_ratings_pitches_forkball').notNull(),
  pitching_ratings_pitches_changeup: integer('pitching_ratings_pitches_changeup').notNull(),
  pitching_ratings_pitches_sinker: integer('pitching_ratings_pitches_sinker').notNull(),
  pitching_ratings_pitches_splitter: integer('pitching_ratings_pitches_splitter').notNull(),
  pitching_ratings_pitches_knuckleball: integer('pitching_ratings_pitches_knuckleball').notNull(),
  pitching_ratings_pitches_cutter: integer('pitching_ratings_pitches_cutter').notNull(),
  pitching_ratings_pitches_circlechange: integer('pitching_ratings_pitches_circlechange').notNull(),
  pitching_ratings_pitches_knucklecurve: integer('pitching_ratings_pitches_knucklecurve').notNull(),
  pitching_ratings_pitches_talent_fastball: integer('pitching_ratings_pitches_talent_fastball').notNull(),
  pitching_ratings_pitches_talent_slider: integer('pitching_ratings_pitches_talent_slider').notNull(),
  pitching_ratings_pitches_talent_curveball: integer('pitching_ratings_pitches_talent_curveball').notNull(),
  pitching_ratings_pitches_talent_screwball: integer('pitching_ratings_pitches_talent_screwball').notNull(),
  pitching_ratings_pitches_talent_forkball: integer('pitching_ratings_pitches_talent_forkball').notNull(),
  pitching_ratings_pitches_talent_changeup: integer('pitching_ratings_pitches_talent_changeup').notNull(),
  pitching_ratings_pitches_talent_sinker: integer('pitching_ratings_pitches_talent_sinker').notNull(),
  pitching_ratings_pitches_talent_splitter: integer('pitching_ratings_pitches_talent_splitter').notNull(),
  pitching_ratings_pitches_talent_knuckleball: integer('pitching_ratings_pitches_talent_knuckleball').notNull(),
  pitching_ratings_pitches_talent_cutter: integer('pitching_ratings_pitches_talent_cutter').notNull(),
  pitching_ratings_pitches_talent_circlechange: integer('pitching_ratings_pitches_talent_circlechange').notNull(),
  pitching_ratings_pitches_talent_knucklecurve: integer('pitching_ratings_pitches_talent_knucklecurve').notNull(),
  pitching_ratings_misc_velocity: integer('pitching_ratings_misc_velocity').notNull(),
  pitching_ratings_misc_arm_slot: integer('pitching_ratings_misc_arm_slot').notNull(),
  pitching_ratings_misc_stamina: integer('pitching_ratings_misc_stamina').notNull(),
  pitching_ratings_misc_ground_fly: integer('pitching_ratings_misc_ground_fly').notNull(),
  pitching_ratings_misc_hold: integer('pitching_ratings_misc_hold').notNull(),
  pitching_ratings_babip: integer('pitching_ratings_babip').notNull(),
}, (table) => {
  return {
    player_id_idx: index('player_id_idx').on(table.player_id),
    team_id_idx: index('team_id_idx').on(table.team_id),
  }
})

export type Player = typeof PlayersTable.$inferSelect

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
