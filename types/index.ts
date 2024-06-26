export interface Team {
  team_id: number
  name: string
  nickname: string
  logo_file_name: string
}
export interface Player {
  first_name: string
  last_name: string
  position: number
  role: number
  age: number
  player_id: number
  team_id: number
}
export type Split = 'overall' | 'vsl' | 'vsr' | 'talent'
export type BattingRating =
  | 'contact'
  | 'eye'
  | 'gap'
  | 'power'
  | 'strikeouts'
export type BattingRatingSplits = {
  [key in Split]: {
    [key in BattingRating]: number;
  };
}
export type PitchingRating =
  | 'stuff'
  | 'control'
  | 'movement'
export type PitchingRatingSplits = {
  [key in Split]: {
    [key in PitchingRating]: number;
  };
}
