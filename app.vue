<script setup>
import { ConfigProvider } from 'radix-vue'

const idProvider = () => useId()
const user = useUser()
async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  location.reload()
}
</script>

<template>
  <Html class="text-surface-800 bg-surface-50" />
  <ConfigProvider :use-id="idProvider">
    <NuxtLoadingIndicator />
    <main class="page font-sans text-base">
      <nav class="nav text-primary flex justify-between">
        <div class="flex items-center gap-sm">
          <NuxtLink to="/">
            NABA League
          </NuxtLink>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </div>
        <div class="flex items-center gap-sm">
          <template v-if="!user">
            <NuxtLink to="/auth/login">
              Login
            </NuxtLink>
            <NuxtLink to="/auth/signup">
              Signup
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink v-if="user.role === 'admin'" to="/upload">
              Upload
            </NuxtLink>
            <button @click="logout">
              Logout {{ user.username }}
            </button>
          </template>
        </div>
      </nav>
      <section class="content">
        <NuxtPage />
      </section>
    </main>
  </ConfigProvider>
</template>
