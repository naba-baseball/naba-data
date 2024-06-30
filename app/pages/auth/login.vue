<script lang="ts" setup>
import type { UserFormData } from '~/components/UserForm.vue'

async function submit(form: UserFormData) {
  await $fetch('/api/login', { method: 'POST', body: form })
  await refreshNuxtData('user')
  await navigateTo('/')
}
</script>

<template>
  <UserForm variant="login" @submit="submit" />
</template>

<style></style>
