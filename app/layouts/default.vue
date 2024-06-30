<script lang="ts" setup>
console.log('default layout')
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
]
</script>

<template>
  <main>
    <div class="-mx-2 grid grid-flow-col place-content-between">
      <UHorizontalNavigation :links="user?.role === 'admin' ? authenticatedLinks : guestLinks" />
      <div class="py-2 flex items-center">
        <ColorTheme />
        <UButton v-if="user?.role === 'admin'" color="gray" variant="ghost" @click="logout">
          Logout {{ user.username }}
        </UButton>
      </div>
    </div>
    <section class="content">
      <slot />
    </section>
  </main>
</template>
