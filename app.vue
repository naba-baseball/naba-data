<script setup>
const hanko = useHanko()
function logout() {
  hanko.user.logout()
}
const userStore = useUserStore()
hanko.onSessionCreated((session) => {
  userStore.session = session
})
hanko.onSessionExpired(() => {
  userStore.session = null
})
hanko.onAuthFlowCompleted(async () => {
  userStore.user = await hanko.user.getCurrent()
})
hanko.onUserLoggedOut(() => {
  userStore.user = null
  userStore.session = null
})
userStore.session = hanko.session.get()
</script>

<template>
  <div>
    <nav>
      <nuxt-link to="/">
        home
      </nuxt-link>
      <template v-if="userStore.session">
        <nuxt-link to="/upload">
          upload
        </nuxt-link>
        <button @click="logout()">
          logout
        </button>
      </template>
      <nuxt-link v-if="!userStore.session" to="/login">
        login
      </nuxt-link>
      <nuxt-link to="/teams">
        teams
      </nuxt-link>
    </nav>
    <NuxtPage />
  </div>
</template>
