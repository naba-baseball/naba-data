export const useLineupsState = () => {
  const team = ref();
  console.log('I SHOULD RUN ONCE')
  const { getSplit, split } = useBattingSplits();
  const roster = ref(2);
  team.value ??= useUserTeam().value
  const ratingKeys = [
    { key: "contact", label: "Contact" },
    { key: "eye", label: "Eye" },
    { key: "gap", label: "Gap" },
    { key: "power", label: "Power" },
    { key: "strikeouts", label: "Ks" },
  ];
  const playersApi = useFetch(() => `/api/teams/${team.value}/batters`, {
    immediate: false,
    default: () => [],
    key: 'lineups-batters',
    transform(data) {
      return data.map((player) => {
        return reactive({
          player_id: player.player_id,
          first_name: player.first_name,
          last_name: player.last_name,
          bats: useHandAbbreviation(player),
          age: player.age,
          position: usePositionDisplay(player),
          contact: computed(() => getSplit(player, "contact")),
          eye: computed(() => getSplit(player, "eye")),
          gap: computed(() => getSplit(player, "gap")),
          power: computed(() => getSplit(player, "power")),
          strikeouts: computed(() => getSplit(player, "strikeouts")),
        });
      });
    },
  });
  const lineup = ref([]);
  function addPlayer(player: any) {
    const playerIndex = playersApi.data.value.findIndex(
      (p) => p.player_id == player.player_id,
    );
    if (
      playerIndex < 0 ||
      lineup.value.find((p) => p.player_id == player.player_id)
    )
      return;
    lineup.value.push(playersApi.data.value[playerIndex]);
    playersApi.data.value = playersApi.data.value?.toSpliced(playerIndex, 1);
  }

  return { split, getSplit, roster, team, ratingKeys, playersApi, lineup, addPlayer };
}
