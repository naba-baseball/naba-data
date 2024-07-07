<script setup lang="ts">
definePageMeta({
  middleware: async () => {
    let { data: user } = useNuxtData('user')
    if (!user.value) {
      await useUser().api
      user = useNuxtData('user').data
    }
    if (user.value?.role !== 'admin')
      return navigateTo('/')
  },
})
function done() {
  const toast = useToast()
  toast.add({ title: 'Site upload successful', actions: [{ label: 'Go home', click: () => navigateTo('/') }] })
}
const discoveredFiles = ref([])
</script>

<template>
  <div>
    <FilesUpload v-model="discoveredFiles" @done="done()" />
    <FilesUploadDirectory v-model="discoveredFiles" />
  </div>
</template>
