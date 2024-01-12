export function usePositionDisplay(
  player: MaybeRefOrGetter<{ position: number; role: number }>,
  isAbbreviated: MaybeRefOrGetter<boolean> = true,
) {
  const display = ref<string>("");
  watchEffect(() => {
    const playerValue = toValue(player);
    if (!playerValue) return;
    if (toValue(isAbbreviated)) {
      if (playerValue.position === 1)
        return (display.value = getAbbreviatedRole(playerValue.role));
      return (display.value = getAbbreviatedPosition(playerValue.position));
    }
    if (playerValue.position === 1)
      return (display.value = getFullRole(playerValue.role));
    return (display.value = getFullPosition(playerValue.position));
  });
  return readonly(display);
}
