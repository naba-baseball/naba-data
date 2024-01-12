const batsAbbreviation: Record<number, string> = {
  1: "R",
  2: "L",
  3: "S",
};

export const useBatsAbbreviation = (
  player: MaybeRefOrGetter<{ bats: number }>,
) => {
  return computed(() => batsAbbreviation[toValue(player).bats]);
};
