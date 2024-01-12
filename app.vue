<script setup>
const color = useColorMode()
color.preference = 'light'
</script>
<template>
  <div class="mx-lg">
    <nav class="my-sm">
      <u-link to="/">
        home
      </u-link>
      <u-link to="/upload">
        upload
      </u-link>
      <u-link to="/teams">
        teams
      </u-link>
    </nav>
    <NuxtPage />
  </div>
</template>
