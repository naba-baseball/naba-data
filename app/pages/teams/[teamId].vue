<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const route = useRoute()
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`)
if (!team.value) {
  showError({
    message: 'Team not found',
  })
}
const tabs = [
  { label: 'Batters', value: 'batters' },
  { label: 'Pitchers', value: 'pitchers' },
  { label: 'Fielders', value: 'fielders' },
]
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
  <section class="space-y-4">
    <div class="inline-flex gap-4 items-center justify-between">
      <h1 v-if="team">
        {{ team.name }} {{ team.nickname }}
      </h1>
      <img v-if="team" class="size-16" width="64px" height="64px" placeholder :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`">
    </div>
    <div class="grid grid-cols-2 gap-4">
      <SplitSelect v-model="split" />
      <RosterSelect v-model="roster" />
    </div>
    <UTabs :model-value="tabNumber" :items="tabs" @update:model-value="tab = $event">
      <template #item="{ item }">
        <TeamBatters v-if="item.value === 'batters'" :team-id />
        <TeamPitchers v-if="item.value === 'pitchers'" :team-id />
        <div v-if="item.value === 'fielders'">
          Coming eventually... maybe
        </div>
      </template>
    </UTabs>
  </section>
</template>
