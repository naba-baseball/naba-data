<script lang="ts" setup>
const formEl = shallowRef<HTMLFormElement>()
const { data, execute: getOnboarding } = await useFetch('/api/onboarding')
watchEffect(async () => {
  if (data.value?.hasUploadedFiles && data.value?.hasAdmin) {
    await $fetch('/api/preference', {
      method: 'POST',
      body: { key: 'onboarding', value: false },
      onRequest: () => {
        refreshNuxtData('onboarding')
      },
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
  }
})
const { execute: updateUser, error: userError } = useFetch('/api/onboarding-user', {
  method: 'POST',
  immediate: false,
  watch: false,
  body: toRef(() => {
    const form = new FormData(formEl.value)
    return {
      username: form.get('username'),
      password: form.get('password'),
    }
  }),
})
const toggle = ref(false)
</script>

<template>
  <div>
    <h1 class="2xl font-bold">
      Lets get things setup
    </h1>
    <template v-if="data">
      <transition
        mode="out-in"
        class="transition-[transform_opacity] duration-500"
        enter-from-class="translate-x-12 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-12"
      >
        <form
          v-if="!data.hasAdmin"
          ref="formEl" name="onboarding" class="space-y-4 w-md" method="POST"
          @submit.prevent="updateUser().then(() => getOnboarding())"
        >
          <h2 class="text-xl">
            Create Admin user
          </h2>
          <UFormGroup label="Username">
            <UInput id="username" name="username" type="text" placeholder="Username" />
          </UFormGroup>
          <UFormGroup label="Password">
            <UInput id="password" name="password" type="password" placeholder="Password" />
          </UFormGroup>

          <div v-if="userError" id="warnings">
            <div>Errors</div>
            {{ userError.data.message }}
          </div>
          <UButton type="submit">
            Create admin user
          </UButton>
        </form>
        <div v-else-if="!data.hasUploadedFiles">
          <h2>
            Upload files
          </h2>
          <FilesUpload class="w-lg" @done="getOnboarding()" />
        </div>
      </transition>
    </template>
  </div>
</template>
