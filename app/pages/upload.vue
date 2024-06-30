<script setup>
definePageMeta({
  middleware: () => {
    if (useUser().user.value?.role !== 'admin')
      return navigateTo('/')
  },
})
</script>

<template>
  <FilesUpload />
</template>
