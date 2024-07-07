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
</script>

<template>
  <div />
</template>
