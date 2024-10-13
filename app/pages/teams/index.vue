<script lang="ts" setup>
const { teams } = useTeams()
const sortedTeams = computed(() => teams.value.toSorted((a, b) => a.name.localeCompare(b.name)))
</script>

<template>
  <div>
    <h1>
      Teams
    </h1>
    <ul class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li v-for="team in sortedTeams" :key="team.team_id">
        <UCard :ui="{ base: 'border-0', background: 'bg-pinstripe' }">
          <div class="flex gap-4 items-center">
            <div>
              <img class="size-16" width="64px" height="64px" :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`" :alt="`Logo for${team.name}`">
            </div>
            <NuxtLink class="underline" :to="`/teams/${team.team_id}`">
              <p> {{ team.name }} {{ team.nickname }} </p>
            </NuxtLink>
          </div>
        </UCard>
      </li>
    </ul>
  </div>
</template>

<style>
.dark .bg-pinstripe {
--pinstripe-color: theme('colors.gray.950');
}
.bg-pinstripe {
  --pinstripe-color: theme('colors.gray.50');
  background: repeating-linear-gradient(
    75deg,
    var(--pinstripe-color),
    var(--pinstripe-color) 1px,
    transparent 1px,
    transparent 4px
  );
}
</style>
