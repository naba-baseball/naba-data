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
</script>

<template>
  <div>
    <h1 heading>
      Lineup tool (WIP)
    </h1>
    <article>
      <div grid="~ sm:cols-[2fr_1fr] gap-5">
        <div grid="~ gap-3">
          <TeamSelect v-model="teamId" />
          <label w-fit>
            <input v-model="type" type="radio" value="batters"> Batters
          </label>
          <label w-fit>
            <input v-model="type" type="radio" value="pitchers"> Pitchers
          </label>
          <TeamBatters v-show="type === 'batters'" v-model="selectedBatters[teamId]" :team-id />
          <TeamPitchers v-show="type === 'pitchers'" v-model="selectedPitchers[teamId]" :team-id />
        </div>
        <div space-y-3>
          <h2 heading-sm>
            {{ type === 'batters' ? 'Batting' : 'Pitching' }} Lineup
          </h2>
          <ol space-y-3>
            <li v-for="(player) of selectedOfType" :key="player.player_id" text-lg font-medium>
              <span class="bg-primary-200 rounded p-inline-2 text-primary-700">
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
