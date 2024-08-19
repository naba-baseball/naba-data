<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import type { UnwrapRef } from 'vue'

const teamId = ref<number>(1)
const type = useRouteQuery<'batters' | 'pitchers'>('type', 'batters')
const pitchersMap = ref<Record<UnwrapRef<typeof teamId>, unknown[]>>({})
const battersMap = ref<Record<UnwrapRef<typeof teamId>, unknown[]>>({})
watch(teamId, (id) => {
  battersMap.value[id] ??= []
  pitchersMap.value[id] ??= []
}, { immediate: true })
const selectedBatters = computed({ get: () => battersMap.value[teamId.value], set: (val) => { battersMap.value[teamId.value] = val } })
const selectedPitchers = computed({ get: () => pitchersMap.value[teamId.value], set: (val) => { pitchersMap.value[teamId.value] = val } })
watchEffect(() => {
  selectedBatters.value?.forEach((player, index) => {
    player.index = index + 1
  })
})
watchEffect(() => {
  selectedPitchers.value?.forEach((player, index) => {
    player.index = index + 1
  })
})
const selectedOfType = computed(() => type.value === 'batters' ? selectedBatters.value : selectedPitchers.value)
const { roster, split } = useTeamsFilters()
const positionOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => ({ label: getAbbreviatedPosition(num), value: num }))
const roleOptions = [11, 12, 13].map(num => ({ label: getAbbreviatedRole(num), value: num }))
const commonColumns = [
  { key: 'index', label: '#' },
  { key: 'player_id', label: 'Player' },
]
</script>

<template>
  <div>
    <article>
      <h1 heading>
        Lineup tool (WIP)
      </h1>
      <div class="grid sm:grid-cols-2 gap-y-12 gap-x-4">
        <div class="space-y-3">
          <TeamSelect v-model="teamId" />
          <UFormGroup label="Players">
            <URadioGroup v-model="type" :options="[{ label: 'Batters', value: 'batters' }, { label: 'Pitchers', value: 'pitchers' }]" />
          </UFormGroup>
        </div>
        <div class="space-y-3">
          <RosterSelect v-model="roster" />
          <SplitSelect v-model="split" />
        </div>
        <div>
          <TeamBatters v-show="type === 'batters'" v-model="selectedBatters" :team-id />
          <TeamPitchers v-show="type === 'pitchers'" v-model="selectedPitchers" :team-id />
        </div>
        <div class="-mt-6 -mx-4">
          <h2 class="text-2xl">
            {{ type === 'batters' ? 'Batting' : 'Pitching' }} Lineup
          </h2>
          <p v-show="type === 'batters'" class="opacity-80">
            The first 9 players are the starting lineup, and the rest are backups.
          </p>
          <UTable v-show="type === 'batters'" :sort="{ column: 'index', direction: 'asc' }" :rows="selectedOfType" :columns="[...commonColumns, { key: 'position', label: 'Position' }]">
            <template #index-data="{ row }">
              {{ row.index }}
            </template>
            <template #player_id-data="{ row }">
              <PlayerName :player-id="row?.player_id" />
              <template v-if="row.index > 9">
                <div class="text-xs opacity-70">
                  Backup
                </div>
              </template>
            </template>
            <template #position-data="{ row }">
              <USelect :options="positionOptions" :model-value="row.position" />
            </template>
          </UTable>
          <UTable v-show="type === 'pitchers'" :rows="selectedOfType" :columns="[...commonColumns, { key: 'role', label: 'Role' }]">
            <template #player_id-data="{ row }">
              <PlayerName :player-id="row?.player_id" />
            </template>
            <template #role-data="{ row }">
              <USelect :options="roleOptions" :model-value="row.role" />
            </template>
          </UTable>
        </div>
      </div>
    </article>
  </div>
</template>

<style>

</style>
