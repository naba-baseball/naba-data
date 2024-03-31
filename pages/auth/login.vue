<script lang="ts" setup>
const form = reactive({
  username: "",
  password: "",
});
const { execute } = await useFetch("/api/login", {
  method: "POST",
  body: form,
  onResponseError({ error, response }) {
    alert(response._data.message);
    throw error
  },
  immediate: false,
  watch: false,
});
async function submit() {
  await execute();
  await navigateTo('/')
}
</script>

<template>
  <div>
    <form class="space-y-6" @submit.prevent="submit">
      <h1>
        Login
      </h1>
      <div>
        <label class="text-label mb-2 block" for="username">Username:</label>
        <input
          class="field-input shadow-inner"
          type="text"
          id="username"
          name="username"
          v-model="form.username"
        />
      </div>
      <div>
        <label class="text-label mb-2 block" for="password">Password:</label>
        <input
          class="field-input shadow-inner"
          type="password"
          id="password"
          name="password"
          v-model="form.password"
        />
      </div>
      <button class="btn bg-primary" type="submit">Login</button>
    </form>
  </div>
</template>

<style></style>
