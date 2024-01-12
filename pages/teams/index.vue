<script lang="ts" setup>
const { data: teams } = await useFetch("/api/teams", { key: "teams" });
</script>

<template>
  <ul class="mx-auto w-[90ch]">
    <li
      v-for="team in teams || []"
      :key="team.team_id"
      class="hover:bg-gray-50 transition-colors p-1 rounded-lg"
    >
      <u-link
        class="border p-2 rounded-lg bg-white shadow w-full block"
        prefetch
        :to="`/teams/${team.team_id}`"
      >
        {{ team.name }} {{ team.nickname }}
      </u-link>
    </li>
  </ul>
</template>

<style></style>
