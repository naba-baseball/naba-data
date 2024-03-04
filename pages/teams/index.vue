<script lang="ts" setup>
const { data: teams } = await useFetch("/api/teams");
</script>

<template>
  <ul class="mx-auto w-[90ch] grid grid-cols-3 gap-sm" flex="~ col" gap-4>
    <li v-for="team in teams || []" :key="team.team_id">
      <NuxtLink prefetch :to="`/teams/${team.team_id}`">
        <div class="p-4 bg-white shadow-surface-200 shadow-sm flex justify-between rounded-lg">
          <span> {{ team.name }} {{ team.nickname }} </span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<style></style>
