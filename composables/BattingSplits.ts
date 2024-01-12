
export type BattingSplit =
  | "batting_ratings_overall"
  | "batting_ratings_vsl"
  | "batting_ratings_vsr"
  | "batting_ratings_talent";
export type BattingRating = "contact" | "eye" | "gap" | "power" | "strikeouts";
export type BattingSplitsPlayer = MaybeRefOrGetter<{
  batting: {
    [key in `${BattingSplit}_${BattingRating}`]: number;
  };
}>;
export const useBattingSplits = () => {
  const split = ref<BattingSplit>("batting_ratings_overall");
  function getSplit(player: BattingSplitsPlayer, rating: BattingRating) {
    return toValue(player).batting[`${split.value}_${rating}`];
  }
  return { split, getSplit };
};
