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
  <main>
    <UContainer>
      <div class="-mx-2 grid grid-flow-col place-content-between">
        <AuthState #="{loggedIn, user}">
          <UHorizontalNavigation v-if="loggedIn && user?.role === 'admin'" :links="authenticatedLinks" />
          <UHorizontalNavigation v-else :links="guestLinks" />
        </AuthState>
        <div class="py-2 flex gap-2 items-center">
          <DisplayLastUploaded class="hidden sm:inline text-sm text-gray-700 dark:text-gray-200" />
          <ColorTheme />
          <AuthState #="{loggedIn, user}">
            <UButton v-if="loggedIn" color="gray" variant="ghost" @click="logout">
              Logout {{ user?.username }}
            </UButton>
          </AuthState>
        </div>
      </div>
      <div>
        <DisplayLastUploaded class="sm:hidden text-sm text-gray-700 dark:text-gray-200" />
      </div>
      <section class="content">
        <slot />
      </section>
    </UContainer>
  </main>
</template>
