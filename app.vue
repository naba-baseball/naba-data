<script setup></script>
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
        </span>
      </v-app-bar>
      <v-main>
        <client-only>
          <nuxt-page />
        </client-only>
      </v-main>
    </v-layout>
  </v-app>
</template>
