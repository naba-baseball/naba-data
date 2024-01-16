<script lang="ts" setup>
const { data: teams } = useTeamsStore();
</script>

<template>
  <ul class="mx-auto w-[90ch]" flex="~ col" gap-4>
    <li v-for="team in teams || []" :key="team.team_id">
      <NuxtLink prefetch :to="`/teams/${team.team_id}`">
        <VSheet class="p-4 !flex justify-between" rounded border>
          <span> {{ team.name }} {{ team.nickname }} </span>
          <v-icon>mdi-arrow-right</v-icon>
        </VSheet>
      </NuxtLink>
    </li>
  </ul>
</template>

<style></style>
