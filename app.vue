<script setup>
import { ConfigProvider } from "radix-vue";
const idProvider = () => useId();
</script>
<template>
  <Html class="text-surface-950" />
  <ConfigProvider :use-id="idProvider">
    <nuxt-loading-indicator />
    <main
      class="page font-sans"
    >
      <nav class="nav grid grid-flow-col gap-sm px-2 bg-primary-900 text-white rounded">
        <div class="grid items-center">
          <NuxtLink class="me-sm" to="/"> OOTP Tools </NuxtLink>
        </div>
        <span class="justify-end flex px-4 gap-sm items-center capitalize">
          <NuxtLink to="/"> home </NuxtLink>
          <NuxtLink to="/upload"> upload </NuxtLink>
        </span>
      </nav>
      <section class="content grid">
        <nuxt-page />
      </section>
    </main>
  </ConfigProvider>
</template>
