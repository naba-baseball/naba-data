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
const links = computed(() => {
  return [...constantLinks, ...user.value
    ? [
        {
          to: '/upload',
          label: 'Upload',
        },
      ]
    : [
        {
          to: '/auth/login',
          label: 'Login',
        },
      ]]
})
</script>

<template>
  <main>
    <div class="-mx-2 grid grid-flow-col place-content-between">
      <UHorizontalNavigation :links />
      <div class="py-2 flex items-center">
        <ColorTheme />
        <UButton v-if="user" color="gray" variant="ghost" @click="logout">
          Logout {{ user.username }}
        </UButton>
      </div>
    </div>
    <section class="content">
      <slot />
    </section>
  </main>
</template>

<style></style>
