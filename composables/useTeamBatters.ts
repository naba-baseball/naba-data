export function useTeamPlayers(teamId: MaybeRefOrGetter<number | string>) {
  const { split, roster } = useTeamsFilters()
  const api = useFetch(
    () => `/api/teams/${toValue(teamId)}/batters`,
    {
      deep: false,
      query: {
        split,
        roster,
      },
      default: () => [],
    },
  )
  return { players: api.data, api, split, roster }
}
