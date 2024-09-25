<script lang="ts" setup>
const to = useRuntimeConfig().public.discordAuthorizeUrl
</script>

<template>
  <UButton icon="i-logos-discord-icon" class="text-[#5865F2]" variant="outline" :to>
    Log in with Discord
  </UButton>
</template>

<style>

</style>
