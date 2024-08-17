<script lang="ts" setup>
import * as v from 'valibot'

const { data, execute: getOnboarding } = await useLazyFetch('/api/onboarding')
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
const userForm = reactive({
  username: '',
  password: '',
})
const userFormSchema = v.object({
  username: v.pipe(v.string(), v.minLength(3, 'Username must be at least 3 characters')),
  password: v.pipe(v.string(), v.minLength(6, 'Password must be at least 6 characters')),
})
const { execute: updateUser, error: userError } = useFetch('/api/onboarding-user', {
  method: 'POST',
  immediate: false,
  watch: false,
  body: toRef(() => {
    return {
      username: userForm.username,
      password: userForm.password,
    }
  }),
})
function handleUserSubmit() {
  updateUser().then(() => {
    getOnboarding()
  })
}
const { files } = useFileUploads()
</script>

<template>
  <div v-auto-animate class="space-y-5">
    <h1 class="text-4xl font-bold">
      Lets get things setup
    </h1>
    <template v-if="data">
      <Transition
        mode="out-in"
        enter-from-class="translate-x-12 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-12"
      >
        <UForm
          v-if="!data.hasAdmin"
          :state="userForm"
          :schema="userFormSchema"
          class="transition-[transform_opacity] duration-500 space-y-3 w-md"
          @submit="handleUserSubmit"
        >
          <h2 class="text-xl">
            Create Admin user
          </h2>
          <UFormGroup label="Username" name="username">
            <UInput id="username" v-model="userForm.username" type="text" placeholder="Username" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput id="password" v-model="userForm.password" type="password" placeholder="Password" />
          </UFormGroup>
          <input type="hidden">

          <div v-if="userError" id="warnings">
            <div>Errors</div>
            {{ userError.data.message }}
          </div>
          <UButton type="submit">
            Create admin user
          </UButton>
        </UForm>
        <div v-else-if="!data.hasUploadedFiles" class="transition-[transform_opacity] space-y-3 duration-500">
          <h2 class="text-xl">
            Upload files
          </h2>
          <FilesUpload v-model="files" class="w-lg" @done="getOnboarding()" />
        </div>
      </Transition>
    </template>
  </div>
</template>
