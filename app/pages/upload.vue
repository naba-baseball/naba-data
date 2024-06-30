<script setup>
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
</script>

<template>
  <FilesUpload @done="done()" />
</template>
