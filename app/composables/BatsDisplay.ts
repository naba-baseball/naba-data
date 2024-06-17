const batsDisplay: Record<number, string> = {
  1: 'R',
  2: 'L',
  3: 'S',
}

export function useBatsDisplay(player: MaybeRefOrGetter<{ bats: number }>) {
  return computed(() => batsDisplay[toValue(player).bats])
}
