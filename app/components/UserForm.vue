<script lang="ts" setup>
export interface UserFormData { username: string, password: string, confirm?: string }
export type Variant = 'signup' | 'login'
defineProps<{
  variant: Variant
}>()
defineEmits<{ submit: [form: UserFormData] }>()
const form = ref<UserFormData>({
  username: '',
  password: '',
})
</script>

<template>
  <form class="w-60 space-y-6" @submit.prevent="$emit('submit', form)">
    <h1>{{ variant === 'login' ? 'Login' : 'Signup' }}</h1>
    <UFormField label="Username">
      <UInput v-model="form.username" name="username" />
    </UFormField>
    <UFormField label="Password">
      <UInput v-model="form.password" type="password" name="password" />
    </UFormField>
    <UFormField v-if="variant === 'signup'" label="Confirm password">
      <UInput v-model="form.confirm" type="password" name="confirm" />
    </UFormField>
    <UButton type="submit">
      Login
    </UButton>
  </form>
</template>
