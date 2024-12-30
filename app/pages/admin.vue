<script lang="ts" setup>
definePageMeta({
  middleware: 'admin',
})
</script>

<template>
  <div class="space-x-4">
    <UButton external href="/api/downloads/database" icon="i-lucide-database" download="database.zip" class="inline-flex items-center gap-0.5">
      Download database
    </UButton>

    <UButton external href="/api/downloads/csv" icon="i-lucide-file-spreadsheet" download="csv.zip" class="inline-flex items-center gap-0.5">
      Download csv files
    </UButton>
  </div>
</template>

<style>

</style>
