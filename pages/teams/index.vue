<script lang="ts" setup>
const { data: teams } = useLazyFetch('/api/teams')
</script>

<template>
  <ul>
    <li v-for="team in teams || []" :key="team.teamId">
      <NuxtLink :to="`/teams/${team.teamId}`">
        {{ team.name }} {{ team.nickname }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style>

</style>
