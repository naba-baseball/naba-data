<script lang="ts" setup>
const { data: isOnboarding } = await useFetch('/api/preference', { params: { key: 'onboarding' }, key: 'onboarding' })
const shouldRedirect = isOnboarding.value && useRoute().path !== '/onboarding'
if (shouldRedirect)
  await navigateTo('/onboarding')
</script>

<template>
  <Head>
    <Title>Naba data</Title>
    <Body class="dark:bg-gray-950 text-gray-800 dark:text-gray-200 md:mx-4" />
  </Head>
  <NuxtLoadingIndicator />
  <NuxtLayout :name="isOnboarding ? 'onboarding' : 'default'">
    <UApp :toaster="{ position: 'top-center' }">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
