<script lang="ts" setup>
const { data: teams } = await useFetch("/api/teams", { default: () => [] });
</script>

<template>
  <ul class="mx-auto gap-sm" grid="~ cols-3">
    <li v-for="team in teams || []" :key="team.team_id">
      <nuxt-link :to="`/teams/${team.team_id}`">
        <div class="p-2 gap-2 bg-white border items-center flex rounded-lg">
          <img
            :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`"
            class="size-6"
          />
          <span> {{ team.name }} {{ team.nickname }} </span>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<style></style>
