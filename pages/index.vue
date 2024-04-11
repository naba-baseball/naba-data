<script lang="ts" setup>
const { data: teams } = await useFetch('/api/teams', { default: () => [] })
</script>

<template>
  <h1 class="text-xl mb-sm font-serif font-bold uppercase tracking-wider text-primary">
    Teams
  </h1>
  <ul class="gap-sm" grid="~ cols-1 sm:cols-3 auto-rows-[minmax(48px,auto)]">
    <li v-for="team in teams || []" :key="team.team_id" class="block">
      <NuxtLink
        class="p-2 gap-2 bg-white border items-center flex rounded-lg h-full"
        :to="`/teams/${team.team_id}`"
      >
        <img
          :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`"
          class="size-6"
        >
        <span> {{ team.name }} {{ team.nickname }} </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style></style>
