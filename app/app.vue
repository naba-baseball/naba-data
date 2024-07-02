<script lang="ts" setup>
const { data: isOnboarding } = await useFetch('/api/preference', { params: { key: 'onboarding' }, key: 'onboarding' })
const shouldRedirect = isOnboarding.value && useRoute().path !== '/onboarding'
if (shouldRedirect)
  await navigateTo('/onboarding')
</script>

<template>
  <Head>
    <Title>Naba data</Title>
    <Body class="dark:bg-gray-950" />
  </Head>
  <UContainer>
    <NuxtLoadingIndicator />
    <NuxtLayout :name="isOnboarding ? 'onboarding' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </UContainer>
  <UNotifications />
</template>
