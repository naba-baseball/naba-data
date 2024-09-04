<script lang="ts" setup>
const { teams } = useTeams()
const sortedTeams = computed(() => teams.value.toSorted((a, b) => a.name.localeCompare(b.name)))
</script>

<template>
  <div>
    <h1>
      Teams
    </h1>
    <ul class="grid sm:grid-cols-4 gap-4">
      <li v-for="team in sortedTeams" :key="team.team_id">
        <UCard>
          <div class="flex flex-col gap-4 items-center">
            <div>
              <img class="size-16" width="64px" height="64px" placeholder :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`">
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
