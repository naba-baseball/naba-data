<script setup>
import { ConfigProvider } from "radix-vue";
const idProvider = () => useId()
</script>
<template>
  <Html class="text-surface-950" />
  <ConfigProvider :use-id="idProvider">
    <main class="grid font-sans grid-cols-1 grid-rows-[3rem_1fr] min-h-[100dvh]">
      <nav class="grid grid-flow-col gap-$flow-space">
        <div class="grid items-center">
          <NuxtLink class="me-sm" to="/"> OOTP Lineup Builder </NuxtLink>
        </div>
        <span class="justify-end flex px-4 gap-sm items-center capitalize">
          <NuxtLink to="/"> home </NuxtLink>
          <NuxtLink to="/upload"> upload </NuxtLink>
          <NuxtLink to="/teams"> teams </NuxtLink>
        </span>
      </nav>
      <div class="grid">
        <!-- <client-only> -->
        <nuxt-page />
        <!-- </client-only> -->
      </div>
    </main>
  </ConfigProvider>
</template>
