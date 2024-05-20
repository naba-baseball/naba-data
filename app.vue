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
  <ConfigProvider :use-id="idProvider">
    <NuxtLoadingIndicator />
    <main class="page">
      <nav class="group-between">
        <div class="group-inline">
          <NuxtLink class="logo" to="/">
            NABA League
          </NuxtLink>
          <NuxtLink to="/">
            Home
          </NuxtLink>
          <NuxtLink to="/lineups">
            Lineups
          </NuxtLink>
        </div>
        <div class="group-inline">
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
