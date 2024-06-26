<script lang="ts" setup>
import type { UserFormData } from '~/components/UserForm.vue'

async function submit(form: UserFormData) {
  await $fetch('/api/signup', {
    method: 'POST',
    body: form,
  })
  await refreshNuxtData('user')
  await navigateTo('/')
}
</script>

<template>
  <UserForm variant="signup" @submit="submit" />
</template>

<style></style>
