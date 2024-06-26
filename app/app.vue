<script setup>
import { ConfigProvider } from 'radix-vue'

const { user } = useUser()
if (user.value === undefined && useCookie('auth_session').value != null) {
  const { data } = await useFetch('/api/user', { key: 'user' })
  user.value = data.value
}

await useFetch('/api/preference', { params: { key: 'onboarding' }, key: 'onboarding' })
const { data: isOnboarding } = useNuxtData('onboarding')
const shouldRedirect = isOnboarding.value && useRoute().path !== '/onboarding'
if (shouldRedirect)
  await navigateTo('/onboarding')

const idProvider = () => useId()
</script>

<template>
  <Head>
    <Body class="dark:bg-gray-950" />
  </Head>
  <ConfigProvider :use-id="idProvider">
    <UContainer>
      <NuxtLoadingIndicator />
      <NuxtLayout :name="isOnboarding ? 'onboarding' : 'default'">
        <NuxtPage />
      </NuxtLayout>
    </UContainer>
  </ConfigProvider>
</template>
