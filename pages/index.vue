<script lang="ts" setup>
const { teams } = useTeams()
</script>

<template>
  <div>
    <h1>
      Teams
    </h1>
    <ul role="list" class="card-grid">
      <li v-for="team in teams || []" :key="team.team_id">
        <NuxtLink :to="`/teams/${team.team_id}`" class="card block">
          <img :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`">
          <span> {{ team.name }} {{ team.nickname }} </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style></style>
