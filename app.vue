<script setup>
const color = useColorMode()
color.preference = 'light'
</script>
<template>
  <div>
    <nav>
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
