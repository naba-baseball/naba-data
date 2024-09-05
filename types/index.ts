declare global {
  type Split = 'overall' | 'vsl' | 'vsr' | 'talent'
  type BattingRating =
    | 'contact'
    | 'eye'
    | 'gap'
    | 'power'
    | 'strikeouts'
  type BattingRatingSplits = {
    [key in Split]: {
      [key in BattingRating]: number;
    }
  }
  type PitchingRating =
    | 'stuff'
    | 'control'
    | 'movement'
  type PitchingRatingSplits = {
    [key in Split]: {
      [key in PitchingRating]: number;
    }
  }

}

export {}
