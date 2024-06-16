<script lang="ts" setup>
const formEl = shallowRef<HTMLFormElement>()
const { data, execute: getOnboarding } = await useFetch('/api/onboarding')
watchEffect(async () => {
  if(data.value?.hasUploadedFiles && data.value?.hasAdmin) {
    await $fetch('/api/preference', {
      method: 'POST',
      body: { key: 'onboarding', value: false },
      onRequest: () => {
        refreshNuxtData('onboarding')
      }
    })
    navigateTo('/')
  }
})
watchEffect(() => {
  if (!data.value) {
    useHead({ title: 'Onboarding' })
    return
  }
  if (!data.value.hasAdmin) {
    useHead({ title: 'Onboarding - User' })
    return
  }
  if (!data.value.hasUploadedFiles) {
    useHead({ title: 'Onboarding - Files' })
    return
  }
})
const {execute: updateUser, error: userError} = useFetch('/api/onboarding-user', {
  method: 'POST',
  immediate: false,
  watch: false,
  body: toRef(() => {
    const form = new FormData(formEl.value)
    return {
      username: form.get('username'),
      password: form.get('password'),
    }
  })
} )
const showLink = ref(false)
</script>

<template>
  <div>
    <h1>
      Lets get things setup
    </h1>
    <template v-if="data">
      <form v-if="!data.hasAdmin" ref="formEl" name="onboarding" class="form" method="POST" @submit.prevent="updateUser().then(()=>getOnboarding())">
        <h2>
          Create Admin user
        </h2>
        <label for="username">
          Username
        </label>
        <input id="username" name="username" type="text" placeholder="Username">
        <label id="password">
          Password
        </label>
        <input id="password" name="password" type="password" placeholder="Password">

        <div v-if="userError" id="warnings">
          <div>Errors</div>
          {{ userError.data.message }}
        </div>
        <button type="submit">
          Create admin user
        </button>
      </form>
      <div v-else-if="!data.hasUploadedFiles">
        <h2>
          Upload files
        </h2>
        <FilesUpload @done="getOnboarding()" />
      </div>
    </template>
  </div>
</template>

<style></style>
