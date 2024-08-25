import type { Player } from '~~/server/utils/data/players.js'

export type TeamBatter = Pick<Player, 'player_id' | 'first_name' | 'last_name' | 'age' | 'position' | 'bats'> & {
  contact: number
  gap: number
  power: number
  eye: number
  strikeouts: number
}

export type TeamPitcher = Pick<Player, 'player_id' | 'first_name' | 'last_name' | 'age' | 'role' | 'throws'> & {
  stuff: number
  movement: number
  control: number
  stamina: number
}
export function useTeamPlayers(teamId: MaybeRefOrGetter<number | string>, playerType: MaybeRefOrGetter<'batters' | 'pitchers'>) {
  const { split, roster } = useTeamsFilters()
  const { limit, offset, orderBy, total, page, pageCount, sortBy } = usePagination()
  sortBy.value = { column: 'last_name', direction: 'asc' }
  const api = useFetch(
    computed(() => `/api/teams/${toValue(teamId)}/${toValue(playerType)}` as const),
    {
      query: {
        split,
        roster,
        limit,
        offset,
        orderBy,
      },
      onResponse(ctx) {
        total.value = Number(ctx.response.headers.get('X-Total-Count'))
      },
      default: () => [],
    },
  )
  return { players: api.data, api, split, roster, limit, page, total, pageCount, sortBy }
}
