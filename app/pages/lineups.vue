<script lang="ts" setup>
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

const { data: teamId } = useIDBKeyval('lineups-teamId', 1)
const { data: type } = useIDBKeyval<'batters' | 'pitchers'>('lineups-type', 'batters')
const pitchersMap = ref<Record<string, TeamPitcher[]>>({})
const battersMap = ref<Record<string, TeamBatter[]>>({})
watch(teamId, (id) => {
  battersMap.value[id] ??= []
  pitchersMap.value[id] ??= []
}, { immediate: true })
const selectedBatters = computed({
  get: () => battersMap.value[teamId.value] ?? [],
  set: (val: TeamBatter[]) => {
    (battersMap.value[teamId.value] = val)
  },
})
const selectedPitchers = computed({
  get: () => pitchersMap.value[teamId.value] ?? [],
  set: (val: TeamPitcher[]) => {
    (pitchersMap.value[teamId.value] = val)
  },
})
const { roster, split } = useTeamsFilters()
const { data: rosterIDB } = useIDBKeyval('lineups-roster', roster)
syncRef(roster, rosterIDB)
const { data: splitIDB } = useIDBKeyval('lineups-split', split)
syncRef(split, splitIDB)
</script>

<template>
  <div>
    <article>
      <h1 heading>
        Lineup tool (WIP)
      </h1>
      <p>
        Select players from the table on the left, then drag them to reorder them in the lineup.
      </p>
      <div class="sm:grid sm:grid-cols-2 gap-y-12 gap-x-4">
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
        <div class="sm:-mt-6">
          <h2 class="text-2xl">
            {{ type === 'batters' ? 'Batting' : 'Pitching' }} Lineup
          </h2>
          <p v-show="type === 'batters'" class="opacity-80">
            The first 9 players are the starting lineup, and the rest are backups.
          </p>
          <p v-show="type === 'pitchers'" class="opacity-80">
            The game only exports players as Starters, Relievers, and Closers.<br> You'll need to specify middle/long relief, stopper/closer, etc.
          </p>
          <BattingLineupList v-show="type === 'batters'" :players="selectedBatters" />
          <PitchingLineupList v-show="type === 'pitchers'" :players="selectedPitchers" />
        </div>
      </div>
    </article>
  </div>
</template>
