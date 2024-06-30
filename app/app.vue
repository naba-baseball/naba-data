<script lang="ts" setup>
import { ConfigProvider } from 'radix-vue'

const { data: isOnboarding } = await useFetch('/api/preference', { params: { key: 'onboarding' }, key: 'onboarding' })
const shouldRedirect = isOnboarding.value && useRoute().path !== '/onboarding'
if (shouldRedirect)
  await navigateTo('/onboarding')

const idProvider = () => useId()
</script>

<template>
  <Head>
    <Title>Naba data</Title>
    <Body class="dark:bg-gray-950" />
  </Head>
  <ConfigProvider :use-id="idProvider">
    <UContainer>
      <NuxtLoadingIndicator />
      <NuxtLayout :name="isOnboarding ? 'onboarding' : 'default'">
        <NuxtPage />
      </NuxtLayout>
    </UContainer>
    <UNotifications />
  </ConfigProvider>
</template>
