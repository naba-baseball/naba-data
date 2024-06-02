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
