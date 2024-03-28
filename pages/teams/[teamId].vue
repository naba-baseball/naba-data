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
  <article data-team class="flex flex-col gap-lg">
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
      <tabs-root v-model="tab" class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-sm w-full">
        <div>
          <h2 class="font-bold text-xs uppercase tracking-widest mb-2xs">
            Players
          </h2>
          <tabs-list
            class="flex flex-col [&>*]:text-start divide-y rounded overflow-hidden"
          >
            <tabs-trigger
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              id="tab-trigger-batters"
              value="batters"
            >
              Batters
            </tabs-trigger>
            <tabs-trigger
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              id="tab-trigger-pitchers"
              value="pitchers"
              >Pitchers</tabs-trigger
            >
            <tabs-trigger
              class="data-[active=true]:bg-primary bg-surface-50 p-2"
              id="tab-trigger-fielders"
              value="fielders"
              >Fielders</tabs-trigger
            >
          </tabs-list>
        </div>
        <tabs-content class="bg-white" id="tab-content-batters" value="batters">
          <team-batters />
        </tabs-content>
        <tabs-content
          class="bg-white"
          id="tab-content-pitchers"
          value="pitchers"
        >
          <team-pitchers />
        </tabs-content>
        <tabs-content
          class="bg-white"
          id="tab-content-pitchers"
          value="fielders"
        >
          <div>Coming eventually... maybe</div>
        </tabs-content>
      </tabs-root>
    </div>
  </article>
</template>
