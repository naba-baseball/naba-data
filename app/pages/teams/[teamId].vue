<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const route = useRoute()
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`, {
})
if (!team.value) {
  showError({
    message: 'Team not found',
  })
}
const tabs = [{ label: 'Batters', value: 'batters' }, { label: 'Pitchers', value: 'pitchers' }, { label: 'Fielders', value: 'fielders' }]
const tab = useRouteQuery('view', '0')
const tabNumber = useToNumber(tab)
const querySplit = useRouteQuery('split')
const queryRoster = useRouteQuery<'primary' | 'reserve'>('roster')
const { split, roster } = useTeamsFilters()
split.value = querySplit.value
roster.value = queryRoster.value
watchEffect(() => {
  querySplit.value = split.value
  queryRoster.value = roster.value
})
const teamId = toRef(() => route.params.teamId as string)
</script>

<template>
  <article class="space-y-4">
    <div class="inline-flex gap-4 items-center justify-between">
      <h1 v-if="team">
        {{ team.name }} {{ team.nickname }}
      </h1>
      <img v-if="team" class="size-20" src="/salt_lake_city_missionaries.png">
    </div>
    <div class="grid grid-cols-2 gap-4">
      <SplitSelect v-model="split" />
      <RosterSelect v-model="roster" />
    </div>
    <UTabs :model-value="tabNumber" @update:model-value="tab = $event" :items="tabs">
      <template #item="{ item }">
        <TeamBatters v-if="item.value === 'batters'" :team-id />
        <TeamPitchers v-if="item.value === 'pitchers'" :team-id />
        <div v-if="item.value === 'fielders'">
          Coming eventually... maybe
        </div>
      </template>
    </UTabs>
  </article>
</template>
