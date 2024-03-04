<script setup></script>
<template>
  <main class="grid bg-surface-50 h-[100dvh]">
    <nav class="grid grid-flow-col gap-$flow-space p-6">
      <div class="items-center">
        <nuxt-link class="me-sm" to="/"> OOTP Lineup Builder </nuxt-link>
      </div>
      <span class="justify-end flex px-4 gap-sm items-center capitalize">
        <nuxt-link to="/"> home </nuxt-link>
        <nuxt-link to="/upload"> upload </nuxt-link>
        <nuxt-link to="/teams"> teams </nuxt-link>
      </span>
    </nav>
    <div class="grid">
      <client-only>
        <nuxt-page />
      </client-only>
    </div>
  </main>
</template>

<style>
main {
  --flow-space: theme('spacing.4');
}
</style>