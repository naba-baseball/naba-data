<script setup>
//preload teams
await useTeamsStore().execute();
</script>
<template>
  <v-app>
    <v-layout>
      <v-app-bar border flat color="background">
        <v-app-bar-title>
          <nuxt-link class="me-sm" to="/"> OOTP Lineup Builder </nuxt-link>
        </v-app-bar-title>
        <span class="flex px-4 gap-sm items-center capitalize">
          <nuxt-link to="/"> home </nuxt-link>
          <nuxt-link to="/upload"> upload </nuxt-link>
          <nuxt-link to="/teams"> teams </nuxt-link>
          <nuxt-link to="/lineups"> lineups </nuxt-link>
          <app-favorite-team />
        </span>
      </v-app-bar>
      <v-main>
        <nuxt-page />
      </v-main>
    </v-layout>
  </v-app>
</template>
