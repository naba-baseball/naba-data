export function useTeamPlayers(teamId: MaybeRefOrGetter<number | string>) {
  const { split, roster } = useTeamsFilters()
  const total = ref<number>(10)
  const limit = ref(15)
  const page = ref(1)
  const sortBy = ref<{ column: string, direction: 'asc' | 'desc' }>({ column: 'last_name', direction: 'asc' })
  const pageCount = computed(() => Math.ceil(total.value / limit.value))
  const offset = computed(() => {
    if (page.value === 1)
      return 0
    return (page.value - 1) * limit.value
  })
  const api = useFetch(
    () => `/api/teams/${toValue(teamId)}/batters`,
    {
      query: {
        split,
        roster,
        limit,
        offset,
        orderBy: computed(() => [sortBy.value.column, sortBy.value.direction]),
      },
      onResponse(ctx) {
        total.value = Number(ctx.response.headers.get('X-Total-Count'))
      },
      default: () => [],
    },
  )
  return { players: api.data, api, split, roster, limit, page, total, pageCount, sortBy }
}
