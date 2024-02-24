declare global {
  export type Player = {
    first_name: string;
    last_name: string;
    position: number;
    role: number;
    age: number;
    player_id: number;
    team_id: number;
  };
  export type Split = "overall" | "vsl" | "vsr" | "talent";
  export type BattingRating =
    | "contact"
    | "eye"
    | "gap"
    | "power"
    | "strikeouts";
  export type BattingRatingSplits = {
    [key in Split]: {
      [key in BattingRating]: number;
    };
  };
  export type PitchingRating =
    | "stuff"
    | "control"
    | "movement"
    | "balk"
    | "hp"
    | "wild_pitch";
}
export {};
