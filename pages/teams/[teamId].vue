<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";

const route = useRoute();
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`, {
  deep: false,
});
if (!team.value) {
  showError({
    message: "Team not found",
  });
}
const tab = useRouteQuery("view", "batters");
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
      />
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
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              id="tab-trigger-batters"
              value="batters"
            >
              Batters
            </TabsTrigger>
            <TabsTrigger
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              id="tab-trigger-pitchers"
              value="pitchers"
              >Pitchers</TabsTrigger
            >
            <TabsTrigger
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              id="tab-trigger-fielders"
              value="fielders"
              >Fielders</TabsTrigger
            >
          </TabsList>
        </div>
        <TabsContent class="bg-white" id="tab-content-batters" value="batters">
          <TeamBatters />
        </TabsContent>
        <TabsContent
          class="bg-white"
          id="tab-content-pitchers"
          value="pitchers"
        >
          <TeamPitchers />
        </TabsContent>
        <TabsContent
          class="bg-white"
          id="tab-content-pitchers"
          value="fielders"
        >
          <div>Coming eventually... maybe</div>
        </TabsContent>
      </TabsRoot>
    </div>
  </article>
</template>
