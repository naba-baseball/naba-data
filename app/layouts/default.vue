<script lang="ts" setup>
const { user } = useUser()
async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  location.reload()
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
const { lastUploaded } = useLastUploaded()
</script>

<template>
  <main>
    <UContainer>
      <div class="-mx-2 grid grid-flow-col place-content-between">
        <UHorizontalNavigation :links="user?.role === 'admin' ? authenticatedLinks : guestLinks" />
        <div class="py-2 flex gap-2 items-center">
          <ClientOnly>
            <span class="hidden sm:inline text-sm text-gray-700 dark:text-gray-200">
              Last updated {{ lastUploaded }}
            </span>
          </ClientOnly>
          <ColorTheme />
          <UButton v-if="user?.role === 'admin'" color="gray" variant="ghost" @click="logout">
            Logout {{ user.username }}
          </UButton>
        </div>
      </div>
      <div>
        <span class="sm:hidden text-sm text-gray-700 dark:text-gray-200">
          Last updated {{ lastUploaded }}
        </span>
      </div>
      <section class="content">
        <slot />
      </section>
    </UContainer>
  </main>
</template>
