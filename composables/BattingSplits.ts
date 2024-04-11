export function useBattingSplits() {
  const split = ref<Split>('overall')
  function getSplit(player: BattingRatingSplits, rating: BattingRating) {
    return toValue(player).batting[`${split.value}_${rating}`]
  }
  return { split, getSplit }
}
