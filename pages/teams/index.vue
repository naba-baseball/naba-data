<script lang="ts" setup>
const { data: teams } = await useFetch('/api/teams')
</script>

<template>
  <ul>
    <li v-for="team in teams || []" :key="team.team_id">
      <nuxt-link prefetch :to="`/teams/${team.team_id}`">
        {{ team.name }} {{ team.nickname }}
      </nuxt-link>
    </li>
  </ul>
</template>

<style>

</style>
