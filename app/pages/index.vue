<script lang="ts" setup>
const { teams } = useTeams()
</script>

<template>
  <div>
    <h1>
      Teams
    </h1>
    <ul class="grid grid-cols-4 gap-4">
      <li v-for="team in teams" :key="team.team_id">
        <UCard>
          <div class="flex flex-col items-center">
            <div>
              <!-- <img :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`"> -->
              <USkeleton class="size-20" />
            </div>
            <NuxtLink class="underline" :to="`/teams/${team.team_id}`">
              <span> {{ team.name }} {{ team.nickname }} </span>
            </NuxtLink>
          </div>
        </UCard>
      </li>
    </ul>
  </div>
</template>

<style></style>
