<script lang="ts" setup>
const { clear } = useUserSession()
async function logout() {
  await clear()
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
]
const adminLinks = [
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
  <Head>
    <Title>Naba data</Title>
    <Body class="dark:bg-gray-950 text-gray-800 dark:text-gray-200 mx-4" />
  </Head>
  <NuxtLoadingIndicator />
  <main>
    <UContainer>
      <div class="-mx-2 grid grid-flow-col place-content-between">
        <div style="view-transition-name: navigation;">
          <AuthState #="{loggedIn, user}">
            <UHorizontalNavigation v-if="loggedIn && user?.role === 'admin'" :links="adminLinks" />
            <UHorizontalNavigation v-else-if="loggedIn" :links="authenticatedLinks" />
            <UHorizontalNavigation v-else :links="guestLinks" />
          </AuthState>
        </div>
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
        <NuxtPage />
      </section>
    </UContainer>
  </main>
  <UNotifications />
</template>
