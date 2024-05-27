<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const route = useRoute()
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`, {
  deep: false,
})
if (!team.value) {
  showError({
    message: 'Team not found',
  })
}
const tab = useRouteQuery('view', 'batters')
const querySplit = useRouteQuery('split')
const queryRoster = useRouteQuery('roster')
const { split, roster } = useTeamsFilters()
watchEffect(() => {
  querySplit.value = split.value
  queryRoster.value = roster.value
})
</script>

<template>
  <article>
    <div>
      <h1>
        {{ team.name }} {{ team.nickname }}
      </h1>
      <img v-if="team" :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`">
    </div>
    <div>
      <TabsRoot v-model="tab" class="tabs-root">
        <div>
          <h2>
            Players
          </h2>
          <TabsList class="button-group">
            <TabsTrigger id="tab-trigger-batters" class="tabs-trigger button" value="batters">
              Batters
            </TabsTrigger>
            <TabsTrigger id="tab-trigger-pitchers" class="tabs-trigger button" value="pitchers">
              Pitchers
            </TabsTrigger>
            <TabsTrigger id="tab-trigger-fielders" class="tabs-trigger button" value="fielders">
              Fielders
            </TabsTrigger>
          </TabsList>
        </div>
        <div>
          <SplitSelect v-model="split" />
          <RosterSelect v-model="roster" />
        </div>
        <TabsContent id="tab-content-batters" value="batters">
          <TeamBatters :team-id="route.params.teamId as string" />
        </TabsContent>
        <TabsContent
          id="tab-content-pitchers"
          value="pitchers"
        >
          <TeamPitchers :team-id="route.params.teamId as string" />
        </TabsContent>
        <TabsContent
          id="tab-content-pitchers"
          class="bg-surface-0"
          value="fielders"
        >
          <div>Coming eventually... maybe</div>
        </TabsContent>
      </TabsRoot>
    </div>
  </article>
</template>

<style>
.tabs-root {

}
.tabs-trigger {
  &[data-state="active"]{
    background-color: var(--color-surface-inverse);
    color: var(--color-on-surface-inverse);
  }
}
</style>
