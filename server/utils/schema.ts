import { date, int, mysqlTable, primaryKey, smallint, tinyint, varchar } from 'drizzle-orm/mysql-core'
import { createSelectSchema } from 'drizzle-valibot'

export const playersSchema = mysqlTable('players', {
  playerId: int('player_id'),
  teamId: int('team_id'),
  leagueId: int('league_id'),
  position: smallint('position'),
  role: smallint('role'),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  nickName: varchar('nick_name', { length: 50 }),
  age: smallint('age'),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dateOfBirth: date('date_of_birth', { mode: 'string' }),
  cityOfBirthId: int('city_of_birth_id'),
  nationId: int('nation_id'),
  secondNationId: int('second_nation_id'),
  weight: smallint('weight'),
  height: smallint('height'),
  retired: tinyint('retired'),
  freeAgent: tinyint('free_agent'),
  lastLeagueId: int('last_league_id'),
  lastTeamId: int('last_team_id'),
  organizationId: int('organization_id'),
  lastOrganizationId: int('last_organization_id'),
  languageIds0: int('language_ids0'),
  languageIds1: int('language_ids1'),
  uniformNumber: smallint('uniform_number'),
  experience: smallint('experience'),
  personType: smallint('person_type'),
  bats: smallint('bats'),
  throws: smallint('throws'),
  personalityGreed: smallint('personality_greed'),
  personalityLoyalty: smallint('personality_loyalty'),
  personalityPlayForWinner: smallint('personality_play_for_winner'),
  personalityWorkEthic: smallint('personality_work_ethic'),
  personalityIntelligence: smallint('personality_intelligence'),
  personalityLeader: smallint('personality_leader'),
  historicalId: varchar('historical_id', { length: 50 }),
  historicalTeamId: varchar('historical_team_id', { length: 50 }),
  bestContractOfferId: int('best_contract_offer_id'),
  injuryIsInjured: tinyint('injury_is_injured'),
  injuryDtdInjury: tinyint('injury_dtd_injury'),
  injuryCareerEnding: tinyint('injury_career_ending'),
  injuryDlLeft: smallint('injury_dl_left'),
  injuryDlPlayoffRound: smallint('injury_dl_playoff_round'),
  injuryLeft: smallint('injury_left'),
  dtdInjuryEffect: smallint('dtd_injury_effect'),
  dtdInjuryEffectHit: smallint('dtd_injury_effect_hit'),
  dtdInjuryEffectThrow: smallint('dtd_injury_effect_throw'),
  dtdInjuryEffectRun: smallint('dtd_injury_effect_run'),
  injuryId: smallint('injury_id'),
  injuryId2: smallint('injury_id2'),
  injuryDtdInjury2: tinyint('injury_dtd_injury2'),
  injuryLeft2: smallint('injury_left2'),
  dtdInjuryEffect2: smallint('dtd_injury_effect2'),
  dtdInjuryEffectHit2: smallint('dtd_injury_effect_hit2'),
  dtdInjuryEffectThrow2: smallint('dtd_injury_effect_throw2'),
  dtdInjuryEffectRun2: smallint('dtd_injury_effect_run2'),
  proneOverall: smallint('prone_overall'),
  proneLeg: smallint('prone_leg'),
  proneBack: smallint('prone_back'),
  proneArm: smallint('prone_arm'),
  fatiguePitches0: smallint('fatigue_pitches0'),
  fatiguePitches1: smallint('fatigue_pitches1'),
  fatiguePitches2: smallint('fatigue_pitches2'),
  fatiguePitches3: smallint('fatigue_pitches3'),
  fatiguePitches4: smallint('fatigue_pitches4'),
  fatiguePitches5: smallint('fatigue_pitches5'),
  fatiguePoints: smallint('fatigue_points'),
  fatiguePlayedToday: tinyint('fatigue_played_today'),
  runningRatingsSpeed: smallint('running_ratings_speed'),
  runningRatingsStealing: smallint('running_ratings_stealing'),
  runningRatingsBaserunning: smallint('running_ratings_baserunning'),
  college: tinyint('college'),
  acquired: smallint('acquired'),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  acquiredDate: date('acquired_date', { mode: 'string' }),
  draftYear: smallint('draft_year'),
  draftRound: smallint('draft_round'),
  draftSupplemental: tinyint('draft_supplemental'),
  draftPick: smallint('draft_pick'),
  draftOverallPick: smallint('draft_overall_pick'),
  draftEligible: tinyint('draft_eligible'),
  hscStatus: smallint('hsc_status'),
  redshirt: tinyint('redshirt'),
  pickedInDraft: tinyint('picked_in_draft'),
  school: smallint('school'),
  commitSchool: smallint('commit_school'),
  hidden: tinyint('hidden'),
  draftLeagueId: int('draft_league_id'),
  draftTeamId: int('draft_team_id'),
  turnedCoach: tinyint('turned_coach'),
  hallOfFame: tinyint('hall_of_fame'),
  rust: smallint('rust'),
  inducted: smallint('inducted'),
  strategyOverrideTeam: tinyint('strategy_override_team'),
  strategyStealing: int('strategy_stealing'),
  strategyRunning: int('strategy_running'),
  strategyBuntForHit: int('strategy_bunt_for_hit'),
  strategySacBunt: int('strategy_sac_bunt'),
  strategyHitRun: int('strategy_hit_run'),
  strategyHookStart: int('strategy_hook_start'),
  strategyHookRelief: int('strategy_hook_relief'),
  strategyPitchCount: int('strategy_pitch_count'),
  strategyPitchAround: int('strategy_pitch_around'),
  strategyNeverPinchHit: tinyint('strategy_never_pinch_hit'),
  strategyDefensiveSub: tinyint('strategy_defensive_sub'),
  strategyDtdSitMin: tinyint('strategy_dtd_sit_min'),
  strategyDtdAllowPh: tinyint('strategy_dtd_allow_ph'),
  localPop: smallint('local_pop'),
  nationalPop: smallint('national_pop'),
  draftProtected: tinyint('draft_protected'),
  morale: smallint('morale'),
  moralePlayerPerformance: smallint('morale_player_performance'),
  moraleTeamPerformance: smallint('morale_team_performance'),
  moraleTeamTransactions: smallint('morale_team_transactions'),
  expectation: smallint('expectation'),
  moralePlayerRole: smallint('morale_player_role'),
  onLoan: tinyint('on_loan'),
  loanLeagueId: int('loan_league_id'),
  loanTeamId: int('loan_team_id'),
})
export const selectPlayersSchema = createSelectSchema(playersSchema)
export const playersBattingSchema = mysqlTable('players_batting', {
  playerId: int('player_id'),
  teamId: int('team_id'),
  leagueId: int('league_id'),
  position: smallint('position'),
  role: smallint('role'),
  battingRatingsOverallContact: smallint('batting_ratings_overall_contact'),
  battingRatingsOverallGap: smallint('batting_ratings_overall_gap'),
  battingRatingsOverallEye: smallint('batting_ratings_overall_eye'),
  battingRatingsOverallStrikeouts: smallint('batting_ratings_overall_strikeouts'),
  battingRatingsOverallHp: smallint('batting_ratings_overall_hp'),
  battingRatingsOverallPower: smallint('batting_ratings_overall_power'),
  battingRatingsOverallBabip: smallint('batting_ratings_overall_babip'),
  battingRatingsVsrContact: smallint('batting_ratings_vsr_contact'),
  battingRatingsVsrGap: smallint('batting_ratings_vsr_gap'),
  battingRatingsVsrEye: smallint('batting_ratings_vsr_eye'),
  battingRatingsVsrStrikeouts: smallint('batting_ratings_vsr_strikeouts'),
  battingRatingsVsrHp: smallint('batting_ratings_vsr_hp'),
  battingRatingsVsrPower: smallint('batting_ratings_vsr_power'),
  battingRatingsVsrBabip: smallint('batting_ratings_vsr_babip'),
  battingRatingsVslContact: smallint('batting_ratings_vsl_contact'),
  battingRatingsVslGap: smallint('batting_ratings_vsl_gap'),
  battingRatingsVslEye: smallint('batting_ratings_vsl_eye'),
  battingRatingsVslStrikeouts: smallint('batting_ratings_vsl_strikeouts'),
  battingRatingsVslHp: smallint('batting_ratings_vsl_hp'),
  battingRatingsVslPower: smallint('batting_ratings_vsl_power'),
  battingRatingsVslBabip: smallint('batting_ratings_vsl_babip'),
  battingRatingsTalentContact: smallint('batting_ratings_talent_contact'),
  battingRatingsTalentGap: smallint('batting_ratings_talent_gap'),
  battingRatingsTalentEye: smallint('batting_ratings_talent_eye'),
  battingRatingsTalentStrikeouts: smallint('batting_ratings_talent_strikeouts'),
  battingRatingsTalentHp: smallint('batting_ratings_talent_hp'),
  battingRatingsTalentPower: smallint('batting_ratings_talent_power'),
  battingRatingsTalentBabip: smallint('batting_ratings_talent_babip'),
  battingRatingsMiscBunt: smallint('batting_ratings_misc_bunt'),
  battingRatingsMiscBuntForHit: smallint('batting_ratings_misc_bunt_for_hit'),
  battingRatingsMiscGbHitterType: smallint('batting_ratings_misc_gb_hitter_type'),
  battingRatingsMiscFbHitterType: smallint('batting_ratings_misc_fb_hitter_type'),
})

export const playersFieldingSchema = mysqlTable('players_fielding', {
  playerId: int('player_id'),
  teamId: int('team_id'),
  leagueId: int('league_id'),
  position: smallint('position'),
  role: smallint('role'),
  fieldingRatingsInfieldRange: smallint('fielding_ratings_infield_range'),
  fieldingRatingsInfieldArm: smallint('fielding_ratings_infield_arm'),
  fieldingRatingsTurnDoubleplay: smallint('fielding_ratings_turn_doubleplay'),
  fieldingRatingsOutfieldRange: smallint('fielding_ratings_outfield_range'),
  fieldingRatingsOutfieldArm: smallint('fielding_ratings_outfield_arm'),
  fieldingRatingsCatcherArm: smallint('fielding_ratings_catcher_arm'),
  fieldingRatingsCatcherAbility: smallint('fielding_ratings_catcher_ability'),
  fieldingRatingsInfieldError: smallint('fielding_ratings_infield_error'),
  fieldingRatingsOutfieldError: smallint('fielding_ratings_outfield_error'),
  fieldingExperience0: smallint('fielding_experience0'),
  fieldingExperience1: smallint('fielding_experience1'),
  fieldingExperience2: smallint('fielding_experience2'),
  fieldingExperience3: smallint('fielding_experience3'),
  fieldingExperience4: smallint('fielding_experience4'),
  fieldingExperience5: smallint('fielding_experience5'),
  fieldingExperience6: smallint('fielding_experience6'),
  fieldingExperience7: smallint('fielding_experience7'),
  fieldingExperience8: smallint('fielding_experience8'),
  fieldingExperience9: smallint('fielding_experience9'),
  fieldingRatingPos1: smallint('fielding_rating_pos1'),
  fieldingRatingPos2: smallint('fielding_rating_pos2'),
  fieldingRatingPos3: smallint('fielding_rating_pos3'),
  fieldingRatingPos4: smallint('fielding_rating_pos4'),
  fieldingRatingPos5: smallint('fielding_rating_pos5'),
  fieldingRatingPos6: smallint('fielding_rating_pos6'),
  fieldingRatingPos7: smallint('fielding_rating_pos7'),
  fieldingRatingPos8: smallint('fielding_rating_pos8'),
  fieldingRatingPos9: smallint('fielding_rating_pos9'),
})

export const playersPitchingSchema = mysqlTable('players_pitching', {
  playerId: int('player_id'),
  teamId: int('team_id'),
  leagueId: int('league_id'),
  position: smallint('position'),
  role: smallint('role'),
  pitchingRatingsOverallStuff: smallint('pitching_ratings_overall_stuff'),
  pitchingRatingsOverallControl: smallint('pitching_ratings_overall_control'),
  pitchingRatingsOverallMovement: smallint('pitching_ratings_overall_movement'),
  pitchingRatingsOverallBalk: smallint('pitching_ratings_overall_balk'),
  pitchingRatingsOverallHp: smallint('pitching_ratings_overall_hp'),
  pitchingRatingsOverallWildPitch: smallint('pitching_ratings_overall_wild_pitch'),
  pitchingRatingsVsrStuff: smallint('pitching_ratings_vsr_stuff'),
  pitchingRatingsVsrControl: smallint('pitching_ratings_vsr_control'),
  pitchingRatingsVsrMovement: smallint('pitching_ratings_vsr_movement'),
  pitchingRatingsVsrBalk: smallint('pitching_ratings_vsr_balk'),
  pitchingRatingsVsrHp: smallint('pitching_ratings_vsr_hp'),
  pitchingRatingsVsrWildPitch: smallint('pitching_ratings_vsr_wild_pitch'),
  pitchingRatingsVslStuff: smallint('pitching_ratings_vsl_stuff'),
  pitchingRatingsVslControl: smallint('pitching_ratings_vsl_control'),
  pitchingRatingsVslMovement: smallint('pitching_ratings_vsl_movement'),
  pitchingRatingsVslBalk: smallint('pitching_ratings_vsl_balk'),
  pitchingRatingsVslHp: smallint('pitching_ratings_vsl_hp'),
  pitchingRatingsVslWildPitch: smallint('pitching_ratings_vsl_wild_pitch'),
  pitchingRatingsTalentStuff: smallint('pitching_ratings_talent_stuff'),
  pitchingRatingsTalentControl: smallint('pitching_ratings_talent_control'),
  pitchingRatingsTalentMovement: smallint('pitching_ratings_talent_movement'),
  pitchingRatingsTalentBalk: smallint('pitching_ratings_talent_balk'),
  pitchingRatingsTalentHp: smallint('pitching_ratings_talent_hp'),
  pitchingRatingsTalentWildPitch: smallint('pitching_ratings_talent_wild_pitch'),
  pitchingRatingsPitchesFastball: smallint('pitching_ratings_pitches_fastball'),
  pitchingRatingsPitchesSlider: smallint('pitching_ratings_pitches_slider'),
  pitchingRatingsPitchesCurveball: smallint('pitching_ratings_pitches_curveball'),
  pitchingRatingsPitchesScrewball: smallint('pitching_ratings_pitches_screwball'),
  pitchingRatingsPitchesForkball: smallint('pitching_ratings_pitches_forkball'),
  pitchingRatingsPitchesChangeup: smallint('pitching_ratings_pitches_changeup'),
  pitchingRatingsPitchesSinker: smallint('pitching_ratings_pitches_sinker'),
  pitchingRatingsPitchesSplitter: smallint('pitching_ratings_pitches_splitter'),
  pitchingRatingsPitchesKnuckleball: smallint('pitching_ratings_pitches_knuckleball'),
  pitchingRatingsPitchesCutter: smallint('pitching_ratings_pitches_cutter'),
  pitchingRatingsPitchesCirclechange: smallint('pitching_ratings_pitches_circlechange'),
  pitchingRatingsPitchesKnucklecurve: smallint('pitching_ratings_pitches_knucklecurve'),
  pitchingRatingsPitchesTalentFastball: smallint('pitching_ratings_pitches_talent_fastball'),
  pitchingRatingsPitchesTalentSlider: smallint('pitching_ratings_pitches_talent_slider'),
  pitchingRatingsPitchesTalentCurveball: smallint('pitching_ratings_pitches_talent_curveball'),
  pitchingRatingsPitchesTalentScrewball: smallint('pitching_ratings_pitches_talent_screwball'),
  pitchingRatingsPitchesTalentForkball: smallint('pitching_ratings_pitches_talent_forkball'),
  pitchingRatingsPitchesTalentChangeup: smallint('pitching_ratings_pitches_talent_changeup'),
  pitchingRatingsPitchesTalentSinker: smallint('pitching_ratings_pitches_talent_sinker'),
  pitchingRatingsPitchesTalentSplitter: smallint('pitching_ratings_pitches_talent_splitter'),
  pitchingRatingsPitchesTalentKnuckleball: smallint('pitching_ratings_pitches_talent_knuckleball'),
  pitchingRatingsPitchesTalentCutter: smallint('pitching_ratings_pitches_talent_cutter'),
  pitchingRatingsPitchesTalentCirclechange: smallint('pitching_ratings_pitches_talent_circlechange'),
  pitchingRatingsPitchesTalentKnucklecurve: smallint('pitching_ratings_pitches_talent_knucklecurve'),
  pitchingRatingsMiscVelocity: smallint('pitching_ratings_misc_velocity'),
  pitchingRatingsMiscArmSlot: smallint('pitching_ratings_misc_arm_slot'),
  pitchingRatingsMiscStamina: smallint('pitching_ratings_misc_stamina'),
  pitchingRatingsMiscGroundFly: smallint('pitching_ratings_misc_ground_fly'),
  pitchingRatingsMiscHold: smallint('pitching_ratings_misc_hold'),
  pitchingRatingsBabip: smallint('pitching_ratings_babip'),
})

export const teamsSchema = mysqlTable('teams', {
  teamId: int('team_id').notNull(),
  name: varchar('name', { length: 50 }),
  abbr: varchar('abbr', { length: 50 }),
  nickname: varchar('nickname', { length: 50 }),
  logoFileName: varchar('logo_file_name', { length: 200 }),
  cityId: int('city_id'),
  parkId: int('park_id'),
  leagueId: int('league_id'),
  subLeagueId: int('sub_league_id'),
  divisionId: int('division_id'),
  nationId: int('nation_id'),
  parentTeamId: int('parent_team_id'),
  level: int('level'),
  preventAnyMoves: tinyint('prevent_any_moves'),
  humanTeam: tinyint('human_team'),
  humanId: int('human_id'),
  gender: int('gender'),
  backgroundColorId: varchar('background_color_id', { length: 8 }),
  textColorId: varchar('text_color_id', { length: 8 }),
  ballcapsMainColorId: varchar('ballcaps_main_color_id', { length: 8 }),
  ballcapsVisorColorId: varchar('ballcaps_visor_color_id', { length: 8 }),
  jerseyMainColorId: varchar('jersey_main_color_id', { length: 8 }),
  jerseyAwayColorId: varchar('jersey_away_color_id', { length: 8 }),
  jerseySecondaryColorId: varchar('jersey_secondary_color_id', { length: 8 }),
  jerseyPinStripesColorId: varchar('jersey_pin_stripes_color_id', { length: 8 }),
  allstarTeam: tinyint('allstar_team'),
  historicalId: varchar('historical_id', { length: 50 }),
}, (table) => {
  return {
    teamsTeamIdPk: primaryKey({ columns: [table.teamId], name: 'teams_team_id_pk' }),
  }
})
