<script lang="ts" setup>
import type { UserFormData } from '~/components/UserForm.vue'

const { api } = useUser()
async function submit(form: UserFormData) {
  await $fetch('/api/login', { method: 'POST', body: form })
  await api.execute()
  await navigateTo('/')
}
</script>

<template>
  <UserForm variant="login" @submit="submit" />
</template>

<style></style>
