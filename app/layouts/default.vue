<script lang="ts" setup>
const { fetch } = useUserSession()
async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  await fetch()
  await navigateTo('/')
}
const constantLinks = [{
  to: '/teams',
  label: 'Home',
}, {
  to: '/lineups',
  label: 'Lineups',
}]
const guestLinks = [
  ...constantLinks,
  {
    to: '/auth/login',
    label: 'Login',
  },
]
const authenticatedLinks = [
  ...constantLinks,
  {
    to: '/upload',
    label: 'Upload',
  },
  {
    to: '/admin',
    label: 'Admin',
  },
]
</script>

<template>
  <main class="overflow-x-hidden">
    <UContainer>
      <div class="grid grid-flow-col place-content-between">
        <AuthState #="{loggedIn, user}">
          <UNavigationMenu v-if="loggedIn && user?.role === 'admin'" :items="authenticatedLinks" />
          <UNavigationMenu v-else :items="guestLinks" />
        </AuthState>
        <div class="py-2 flex gap-2 items-center justify-end">
          <DisplayLastUploaded class="hidden sm:inline text-sm text-gray-700 dark:text-gray-200" />
          <ColorTheme />
          <AuthState #="{loggedIn, user}">
            <UButton v-if="loggedIn" color="neutral" variant="ghost" @click="logout">
              Logout {{ user?.username }}
            </UButton>
          </AuthState>
        </div>
      </div>
      <div>
        <DisplayLastUploaded class="sm:hidden text-sm text-gray-700 dark:text-gray-200" />
      </div>
      <article class="content">
        <slot />
      </article>
    </UContainer>
  </main>
</template>
