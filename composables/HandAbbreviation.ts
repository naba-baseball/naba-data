const handAbbreviation: Record<number, string> = {
  1: "R",
  2: "L",
  3: "S",
};

export const useHandAbbreviation = (
  player: MaybeRefOrGetter<{ bats: number }>,
) => {
  return computed(() => handAbbreviation[toValue(player).bats]);
};
