<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router';

const route = useRoute();
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`, {
  deep: false,
});
const tab = useRouteQuery('view', 'batters');
</script>

<template>
  <article data-team class="p-md">
    <div class="max-w-md relative">
      <h1 class="text-2xl font-bold uppercase tracking-wider">
        {{ team.name }}, {{ team.nickname }}
      </h1>
    </div>
    <div>
      <h2 class="font-bold text-xs uppercase tracking-widest text-surface-800">Players</h2>
      <tabs-root v-model="tab" class="flex gap-4">
        <tabs-list class="flex flex-col gap-3 font-bold border-e pe-4 [&>*]:text-start">
          <tabs-trigger id="tab-trigger-batters" value="batters">Batters</tabs-trigger>
          <tabs-trigger id="tab-trigger-pitchers" value="pitchers">Pitchers</tabs-trigger>
        </tabs-list>
        <tabs-content id="tab-content-batters" value="batters">
          <team-batters />
        </tabs-content>
        <tabs-content id="tab-content-pitchers" value="pitchers">
          <team-pitchers />
        </tabs-content>
      </tabs-root>
    </div>
  </article>
</template>
