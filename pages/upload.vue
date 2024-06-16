<script setup>
definePageMeta({
  middleware: () => {
    if (useUser().value?.role !== 'admin')
      return navigateTo('/')
  },
})
</script>

<template>
  <FilesUpload />
</template>
