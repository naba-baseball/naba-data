<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";

const route = useRoute();
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`, {
  deep: false,
});
const tab = useRouteQuery("view", "batters");
</script>

<template>
  <article data-team class="p-md">
    <div class="max-w-md relative">
      <h1 class="text-2xl font-bold uppercase tracking-wider">
        {{ team.name }}, {{ team.nickname }}
      </h1>
    </div>
    <div>
      <h2 class="font-bold text-xs uppercase tracking-widest text-surface-800">
        Players
      </h2>
      <tabs-root v-model="tab" class="flex">
        <tabs-list class="flex flex-col pe-4 [&>*]:text-start divide-y">
          <tabs-trigger
            class="data-[active=true]:bg-primary bg-surface-50 p-2 rounded-t"
            id="tab-trigger-batters"
            value="batters"
            >Batters</tabs-trigger
          >
          <tabs-trigger
            class="data-[active=true]:bg-primary bg-surface-50 p-2"
            id="tab-trigger-pitchers"
            value="pitchers"
            >Pitchers</tabs-trigger
          >
          <tabs-trigger
            class="data-[active=true]:bg-primary bg-surface-50 p-2 rounded-b"
            id="tab-trigger-fielders"
            value="fielders"
            >Fielders</tabs-trigger
          >
        </tabs-list>
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
