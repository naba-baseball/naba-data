<script lang="ts" setup>
import type { PlayerCareerBattingStat } from '~~/server/utils/data/playerCareerBattingStats.js'

const route = useRoute()
const { data: player } = await useLazyFetch(`/api/stats/${route.params.playerId}`)
type ExcludedHeaders = 'player_id' | 'team_id' | 'game_id' | 'league_id' | 'level_id' | 'position'
type TableItem = Omit<PlayerCareerBattingStat, ExcludedHeaders>
const rows = computed<TableItem[]>(() => player.value?.map((stat) => {
  const { player_id, team_id, game_id, league_id, level_id, position, ...data } = stat.players_career_batting_stats
  return data
}) ?? [])
function getSplit(id: number) {
  if (id === 1)
    return 'Overall'
  if (id === 2)
    return 'vs left'
  if (id === 3)
    return 'vs right'
}
</script>

<template>
  <div>
    <h1>
      {{ player?.players?.first_name }} {{ player?.players?.last_name }} Stats
    </h1>
    <UTable :rows>
      <template #split_id-data="{ row }">
        {{ getSplit(row.split_id) }}
      </template>
    </UTable>
  </div>
</template>

<style>

</style>
