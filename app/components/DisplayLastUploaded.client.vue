<script lang="ts" setup>
const { lastUploaded } = useLastUploaded()
</script>

<template>
  <span>
    Last updated {{ lastUploaded }}
  </span>
</template>

<style>

</style>
