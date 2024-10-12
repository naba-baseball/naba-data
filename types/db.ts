import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  players: PlayerTable
  players_batting: PlayersBattingTable
  players_pitching: PlayersPitchingTable
  players_career_batting: PlayersCareerBattingTable
  teams: TeamsTable
  team_roster: TeamRosterTable
  users: UsersTable
  sessions: SessionsTable
}

export interface PlayerTable {
  player_id: Generated<number>
  first_name: string
  last_name: string
  team_id: number
  position: number
  age: number
  role: number
  bats: number
  throws: number
  roster: string
}

export type Player = Selectable<PlayerTable>
export type PlayerNew = Insertable<PlayerTable>
export type PlayerUpdate = Updateable<PlayerTable>

export interface PlayersBattingTable {
  player_id: number
  team_id: number
  position: number
  role: number
  batting_ratings_overall_contact: number
  batting_ratings_overall_gap: number
  batting_ratings_overall_eye: number
  batting_ratings_overall_strikeouts: number
  batting_ratings_overall_hp: number
  batting_ratings_overall_power: number
  batting_ratings_overall_babip: number
  batting_ratings_vsr_contact: number
  batting_ratings_vsr_gap: number
  batting_ratings_vsr_eye: number
  batting_ratings_vsr_strikeouts: number
  batting_ratings_vsr_hp: number
  batting_ratings_vsr_power: number
  batting_ratings_vsr_babip: number
  batting_ratings_vsl_contact: number
  batting_ratings_vsl_gap: number
  batting_ratings_vsl_eye: number
  batting_ratings_vsl_strikeouts: number
  batting_ratings_vsl_hp: number
  batting_ratings_vsl_power: number
  batting_ratings_vsl_babip: number
  batting_ratings_talent_contact: number
  batting_ratings_talent_gap: number
  batting_ratings_talent_eye: number
  batting_ratings_talent_strikeouts: number
  batting_ratings_talent_hp: number
  batting_ratings_talent_power: number
  batting_ratings_talent_babip: number
  batting_ratings_misc_bunt: number
  batting_ratings_misc_bunt_for_hit: number
  batting_ratings_misc_gb_hitter_type: number
  batting_ratings_misc_fb_hitter_type: number
}
export type PlayerBattingRating = Selectable<PlayersBattingTable>
export type PlayerBattingRatingNew = Insertable<PlayersBattingTable>
export type PlayerBattingRatingUpdate = Updateable<PlayersBattingTable>

export interface PlayersPitchingTable {
  player_id: number
  team_id: number
  position: number
  role: number
  pitching_ratings_overall_stuff: number
  pitching_ratings_overall_control: number
  pitching_ratings_overall_movement: number
  pitching_ratings_overall_balk: number
  pitching_ratings_overall_hp: number
  pitching_ratings_overall_wild_pitch: number
  pitching_ratings_vsr_stuff: number
  pitching_ratings_vsr_control: number
  pitching_ratings_vsr_movement: number
  pitching_ratings_vsr_balk: number
  pitching_ratings_vsr_hp: number
  pitching_ratings_vsr_wild_pitch: number
  pitching_ratings_vsl_stuff: number
  pitching_ratings_vsl_control: number
  pitching_ratings_vsl_movement: number
  pitching_ratings_vsl_balk: number
  pitching_ratings_vsl_hp: number
  pitching_ratings_vsl_wild_pitch: number
  pitching_ratings_talent_stuff: number
  pitching_ratings_talent_control: number
  pitching_ratings_talent_movement: number
  pitching_ratings_talent_balk: number
  pitching_ratings_talent_hp: number
  pitching_ratings_talent_wild_pitch: number
  pitching_ratings_pitches_fastball: number
  pitching_ratings_pitches_slider: number
  pitching_ratings_pitches_curveball: number
  pitching_ratings_pitches_screwball: number
  pitching_ratings_pitches_forkball: number
  pitching_ratings_pitches_changeup: number
  pitching_ratings_pitches_sinker: number
  pitching_ratings_pitches_splitter: number
  pitching_ratings_pitches_knuckleball: number
  pitching_ratings_pitches_cutter: number
  pitching_ratings_pitches_circlechange: number
  pitching_ratings_pitches_knucklecurve: number
  pitching_ratings_pitches_talent_fastball: number
  pitching_ratings_pitches_talent_slider: number
  pitching_ratings_pitches_talent_curveball: number
  pitching_ratings_pitches_talent_screwball: number
  pitching_ratings_pitches_talent_forkball: number
  pitching_ratings_pitches_talent_changeup: number
  pitching_ratings_pitches_talent_sinker: number
  pitching_ratings_pitches_talent_splitter: number
  pitching_ratings_pitches_talent_knuckleball: number
  pitching_ratings_pitches_talent_cutter: number
  pitching_ratings_pitches_talent_circlechange: number
  pitching_ratings_pitches_talent_knucklecurve: number
  pitching_ratings_misc_velocity: number
  pitching_ratings_misc_arm_slot: number
  pitching_ratings_misc_stamina: number
  pitching_ratings_misc_ground_fly: number
  pitching_ratings_misc_hold: number
  pitching_ratings_babip: number
}
export type PlayerPitchingRating = Selectable<PlayersPitchingTable>
export type PlayerPitchingRatingNew = Insertable<PlayersPitchingTable>
export type PlayerPitchingRatingUpdate = Updateable<PlayersPitchingTable>

export interface PlayersCareerBattingTable {
  id: number
  player_id: number
  year: number
  team_id: number
  game_id: number
  league_id: number
  level_id: number
  split_id: number
  position: number
  ab: number
  h: number
  k: number
  pa: number
  pitches_seen: number
  g: number
  gs: number
  d: number
  t: number
  hr: number
  r: number
  rbi: number
  sb: number
  cs: number
  bb: number
  ibb: number
  gdp: number
  sh: number
  sf: number
  hp: number
  ci: number
  wpa: number
  stint: number
  ubr: number
  war: number
}
export type CareerBatting = Selectable<PlayersCareerBattingTable>
export type CareerBattingNew = Insertable<PlayersCareerBattingTable>
export type CareerBattingUpdate = Updateable<PlayersCareerBattingTable>

export interface TeamsTable {
  team_id: Generated<number>
  name: string
  abbr: string
  nickname: string
  logo_file_name: string
}
export type Team = Selectable<TeamsTable>
export type TeamNew = Insertable<TeamsTable>
export type TeamUpdate = Updateable<TeamsTable>

export interface TeamRosterTable {
  id: Generated<number>
  team_id: number
  player_id: number
  list_id: number
}
export type TeamRoster = Selectable<TeamRosterTable>
export type TeamRosterNew = Insertable<TeamRosterTable>
export type TeamRosterUpdate = Updateable<TeamRosterTable>

export interface UsersTable {
  id: Generated<string>
  username: string
  role: string
  password: string
}

export interface SessionsTable {
  id: Generated<string>
  user_id: string
  expires_at: number
}

export type User = Selectable<UsersTable>
export type UserNew = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>
