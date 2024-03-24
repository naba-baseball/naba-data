const handAbbreviation: Record<number, string> = {
  1: "R",
  2: "L",
  3: "S",
} as const;

export const useHandAbbreviation = (
  stat: MaybeRefOrGetter<1 | 2 | 3 | number>,
) => {
  return computed(() => handAbbreviation[toValue(stat)]);
};
