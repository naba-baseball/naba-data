const handAbbreviation: Record<number, string> = {
  1: 'R',
  2: 'L',
  3: 'S',
} as const
export function getHandAbbreviation(stat: MaybeRefOrGetter<1 | 2 | 3 | number>) {
  return handAbbreviation[toValue(stat)]
}
export function useHandAbbreviation(stat: MaybeRefOrGetter<1 | 2 | 3 | number>) {
  return computed(() => getHandAbbreviation(toValue(stat)))
}
