<script lang="ts" setup>
definePageMeta({
  middleware: 'admin',
})
</script>

<template>
  <div class="space-x-4">
    <a href="/api/downloads/database" download="database.zip" color="gray">
      Download database
    </a>

    <a href="/api/downloads/csv" download="csv.zip" color="gray">
      Download csv files
    </a>
  </div>
</template>

<style>

</style>
