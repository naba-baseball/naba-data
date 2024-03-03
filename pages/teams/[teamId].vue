<script lang="ts" setup>
const route = useRoute();
const { data: team } = await useFetch(`/api/teams/${route.params.teamId}`, {
  deep: false,
});
</script>

<template>
  <article data-team class="p-md">
    <div class="max-w-md relative">
      <div
        class="flex shadow-lg shadow-gray-100 dark:shadow-gray-800 p-md justify-between rounded-lg bg-[--team-bg] gap-md"
      >
        <h1
          class="text-2xl font-bold uppercase tracking-wider text-[--team-text]"
        >
          {{ team.name }}, {{ team.nickname }}
        </h1>
      </div>
    </div>
    <div>
      <h2>Pitching Staff</h2>
    </div>
    <div>
      <h2>Batting Staff</h2>
      <TeamBatters />
      <TeamPitchers />
    </div>
  </article>
</template>
