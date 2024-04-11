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
</script>

<template>
  <article class="flex flex-col gap-lg">
    <div class="grid gap-sm grid-cols-1 sm:grid-cols-2 place-items-center">
      <h1
        class="text-center sm:text-start text-3xl font-serif font-bold uppercase tracking-wider text-primary"
      >
        {{ team.name }} {{ team.nickname }}
      </h1>
      <img
        v-if="team"
        :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`"
        class="size-[128px]"
      >
    </div>
    <div>
      <TabsRoot
        v-model="tab"
        class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-sm w-full"
      >
        <div>
          <h2 class="font-bold text-xs uppercase tracking-widest mb-2xs">
            Players
          </h2>
          <TabsList
            class="flex flex-col [&>*]:text-start divide-y rounded overflow-hidden"
          >
            <TabsTrigger
              id="tab-trigger-batters"
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              value="batters"
            >
              Batters
            </TabsTrigger>
            <TabsTrigger
              id="tab-trigger-pitchers"
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              value="pitchers"
            >
              Pitchers
            </TabsTrigger>
            <TabsTrigger
              id="tab-trigger-fielders"
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              value="fielders"
            >
              Fielders
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent id="tab-content-batters" class="bg-white" value="batters">
          <TeamBatters />
        </TabsContent>
        <TabsContent
          id="tab-content-pitchers"
          class="bg-white"
          value="pitchers"
        >
          <TeamPitchers />
        </TabsContent>
        <TabsContent
          id="tab-content-pitchers"
          class="bg-white"
          value="fielders"
        >
          <div>Coming eventually... maybe</div>
        </TabsContent>
      </TabsRoot>
    </div>
  </article>
</template>
