<script lang="ts" setup>
import type { UserFormData } from '~/components/UserForm.vue'

const { fetch } = useUserSession()
async function submit(form: UserFormData) {
  await $fetch('/api/login', { method: 'POST', body: form })
  await fetch()
  await navigateTo('/')
}
const to = useRuntimeConfig().public.discordAuthorizeUrl
</script>

<template>
  <div>
    <UserForm variant="login" @submit="submit" />
    <UButton icon="i-logos-discord-icon" :to>
      Log in with Discord
    </UButton>
  </div>
</template>

<style></style>
