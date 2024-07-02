<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import type { UnwrapRef } from 'vue'

const teamId = ref<number>(1)
const type = useRouteQuery<'batters' | 'pitchers'>('type', 'batters')
const selectedPitchers = ref<Record<UnwrapRef<typeof teamId>, unknown[]>>({})
const selectedBatters = ref<Record<UnwrapRef<typeof teamId>, unknown[]>>({})
watch(teamId, (id) => {
  selectedBatters.value[id] ??= []
}, { immediate: true })
const selectedOfType = computed(() => type.value === 'batters' ? selectedBatters.value[teamId.value] : selectedPitchers.value[teamId.value])
const { roster, split } = useTeamsFilters()
</script>

<template>
  <div>
    <h1 heading>
      Lineup tool (WIP)
    </h1>
    <article>
      <div class="grid sm:grid-cols-[2fr_1fr] gap-5">
        <div class="grid gap-3">
          <TeamSelect v-model="teamId" />
          <UFormGroup label="Players">
            <URadioGroup v-model="type" :options="[{ label: 'Batters', value: 'batters' }, { label: 'Pitchers', value: 'pitchers' }]" />
          </UFormGroup>
          <RosterSelect v-model="roster" />
          <SplitSelect v-model="split" />
          <TeamBatters v-show="type === 'batters'" v-model="selectedBatters[teamId]" :team-id />
          <TeamPitchers v-show="type === 'pitchers'" v-model="selectedPitchers[teamId]" :team-id />
        </div>
        <div class="space-y-3">
          <h2 class="text-2xl">
            {{ type === 'batters' ? 'Batting' : 'Pitching' }} Lineup
          </h2>
          <ol v-auto-animate class="space-y-3">
            <li v-for="(player) of selectedOfType" :key="player.player_id" class="text-lg font-medium">
              <span class="bg-primary-200 dark:bg-primary-950 rounded-lg px-2 py-1 text-primary-700 dark:text-primary-200">
                {{ player.first_name }} {{ player.last_name }}
              </span>
            </li>
          </ol>
        </div>
      </div>
    </article>
  </div>
</template>

<style>

</style>
