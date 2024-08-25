<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const teamId = ref<number>(1)
const type = useRouteQuery<'batters' | 'pitchers'>('type', 'batters')
const pitchersMap = ref<Record<number, TeamPitcher[]>>({})
const battersMap = ref<Record<number, TeamBatter[]>>({})
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
        <div class="-mt-6 ">
          <h2 class="text-2xl">
            {{ type === 'batters' ? 'Batting' : 'Pitching' }} Lineup
          </h2>
          <p v-show="type === 'batters'" class="opacity-80">
            The first 9 players are the starting lineup, and the rest are backups.
          </p>
          <p v-show="type === 'pitchers'" class="opacity-80">
            The game only exports players as Starters, Relievers, and Closers.<br> That means you'll need to specify middle/long relief, stopper/closer, etc.
          </p>
          <BattingLineupList v-show="type === 'batters'" :players="selectedBatters" />
          <PitchingLineupList v-show="type === 'pitchers'" :players="selectedPitchers" />
        </div>
      </div>
    </article>
  </div>
</template>
