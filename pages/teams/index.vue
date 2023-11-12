<script lang="ts" setup>
const { data: teams } = useLazyFetch('/api/teams')
</script>

<template>
  <ul>
    <li v-for="team in teams || []" :key="team.team_id">
      <NuxtLink :to="`/teams/${team.team_id}`">
        {{ team.name }} {{ team.nickname }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style>

</style>
