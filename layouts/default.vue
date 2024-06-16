<script lang="ts" setup>
const user = useUser()
async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  location.reload()
}
</script>

<template>
  <main class="page">
    <nav class="border-be bg-surface-inverse">
      <div class="group-between" style="grid-column: content-start">
        <div class="group-inline h-full">
          <NuxtLink class="logo" to="/">
            NABA League
          </NuxtLink>
          <NuxtLink to="/">
            Home
          </NuxtLink>
          <NuxtLink to="/lineups">
            Lineups
          </NuxtLink>
          <div class="divider-x" />
        </div>
        <div class="group-inline h-full">
          <div class="divider-x" />
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
      </div>
    </nav>
    <section class="content">
      <slot />
    </section>
  </main>
</template>

<style>

</style>
