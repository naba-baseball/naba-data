<script lang="ts" setup>
const { lastUploaded } = useLastUploaded()
</script>

<template>
  <span v-if="lastUploaded">
    Last updated {{ lastUploaded }}
  </span>
</template>

<style>

</style>
