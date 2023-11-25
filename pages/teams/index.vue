<script lang="ts" setup>
const { data: teams } = await useFetch('/api/teams')
</script>

<template>
  <ul>
    <li v-for="team in teams || []" :key="team.teamId">
      <nuxt-link prefetch :to="`/teams/${team.teamId}`">
        {{ team.name }} {{ team.nickname }}
      </nuxt-link>
    </li>
  </ul>
</template>

<style>

</style>
