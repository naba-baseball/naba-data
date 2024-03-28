<script setup>
import { ConfigProvider } from "radix-vue";
const idProvider = () => useId();
</script>
<template>
  <Html class="text-surface-800" />
  <ConfigProvider :use-id="idProvider">
    <nuxt-loading-indicator />
    <main class="page font-sans">
      <nav class="nav text-primary">
        <div class="flex w-full gap-sm text-base">
          <NuxtLink to="/"> NABA League </NuxtLink>
          <NuxtLink to="/"> Home </NuxtLink>
        </div>
      </nav>
      <section class="content">
        <nuxt-page />
      </section>
    </main>
  </ConfigProvider>
</template>
