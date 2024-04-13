<script lang="ts" setup>
const form = reactive({
  username: '',
  password: '',
})
const { execute } = await useFetch('/api/login', {
  method: 'POST',
  body: form,
  onResponseError({ error, response }) {
    // eslint-disable-next-line no-alert
    alert(response._data.message)
    throw error
  },
  immediate: false,
  watch: false,
})
async function submit() {
  await execute()
  useUser().value = await $fetch('/api/user')
  await navigateTo('/')
}
</script>

<template>
  <div>
    <form class="space-y-6" @submit.prevent="submit">
      <h1>Login</h1>
      <div>
        <label class="text-label mb-2 block" for="username">Username:</label>
        <input
          id="username"
          v-model="form.username"
          class="field-input shadow-inner w-full sm:w-auto"
          type="text"
          name="username"
        >
      </div>
      <div>
        <label class="text-label mb-2 block" for="password">Password:</label>
        <input
          id="password"
          v-model="form.password"
          class="field-input shadow-inner w-full sm:w-auto"
          type="password"
          name="password"
        >
      </div>
      <button class="btn bg-primary w-full sm:w-auto" type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<style></style>
