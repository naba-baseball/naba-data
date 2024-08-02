<script lang="ts" setup>
const route = useRoute()
const { data: player } = useLazyFetch(`/api/players/${route.params.playerId}`)
const { data: stats } = useLazyFetch(`/api/players/${route.params.playerId}/stats`)
type ExcludedHeaders = 'player_id' | 'team_id' | 'game_id' | 'league_id' | 'level_id' | 'position'
type TableItem = Omit<PlayerCareerBattingStat, ExcludedHeaders>
const rows = computed<TableItem[]>(() => stats.value?.map((stat) => {
  const { player_id, team_id, game_id, league_id, level_id, position, ...data } = stat
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
      {{ player?.first_name }} {{ player?.last_name }} Batting Stats
    </h1>
    <UTable :rows :ui="{ th: { base: 'lowercase' }, td: { base: 'tabular-nums' } }">
      <template #split_id-data="{ row }">
        {{ getSplit(row.split_id) }}
      </template>
    </UTable>
  </div>
</template>

<style>

</style>
