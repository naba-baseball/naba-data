<script lang="ts" setup>
const { data: isOnboarding } = await useFetch('/api/preference', { params: { key: 'onboarding' }, key: 'onboarding' })
const shouldRedirect = isOnboarding.value && useRoute().path !== '/onboarding'
if (shouldRedirect)
  await navigateTo('/onboarding')
</script>

<template>
  <Head>
    <Title>Naba data app</Title>
    <Body class="dark:bg-gray-950 text-gray-800 dark:text-gray-200 mx-4" />
  </Head>
  <NuxtPwaManifest />
  <NuxtLoadingIndicator />
  <PwaPrompt />
  <NuxtLayout :name="isOnboarding ? 'onboarding' : 'default'">
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
  <UNotifications />
</template>
