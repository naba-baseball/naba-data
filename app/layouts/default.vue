<script lang="ts" setup>
const { user } = useUser()
async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  location.reload()
}
const constantLinks = [{
  to: '/',
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
        <UHorizontalNavigation :links="user?.role === 'admin' ? authenticatedLinks : guestLinks" />
        <div class="py-2 flex gap-2 items-center">
          <DisplayLastUploaded class="hidden sm:inline text-sm text-gray-700 dark:text-gray-200" />
          <ColorTheme />
          <UButton v-if="user?.role === 'admin'" color="gray" variant="ghost" @click="logout">
            Logout {{ user.username }}
          </UButton>
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
