<script setup>
import { ConfigProvider } from 'radix-vue'

await useFetch('/api/preference', { params: { key: 'onboarding' }, key: 'onboarding' })
const { data: isOnboarding } = useNuxtData('onboarding')
console.log('onboarding', isOnboarding.value)
const shouldRedirect = isOnboarding.value && useRoute().path !== '/onboarding'
if (shouldRedirect)
  await navigateTo('/onboarding')

const idProvider = () => useId()
</script>

<template>
  <ConfigProvider :use-id="idProvider">
    <NuxtLoadingIndicator />
    <NuxtLayout :name="isOnboarding ? 'onboarding' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
