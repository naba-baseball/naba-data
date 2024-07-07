<script lang="ts" setup>
import { get, set } from 'idb-keyval'

defineOptions({ inheritAttrs: false })
const requiredFiles = [
  'teams.csv',
  'team_roster.csv',
  'players.csv',
  'players_pitching.csv',
  'players_batting.csv',
]
const supported = 'showDirectoryPicker' in window
const csvDirHandle = shallowRef<FileSystemDirectoryHandle>()
const hasDirReadPermission = ref(false)
const discoveredFiles = defineModel<File[]>({ default: () => [] })
const userActive = ref(navigator.userActivation.isActive || navigator.userActivation.hasBeenActive)
if (!userActive.value) {
  const { pause, resume } = useTimeoutPoll(() => {
    userActive.value = navigator.userActivation.isActive || navigator.userActivation.hasBeenActive
  }, 1000, { immediate: false })
  watch(userActive, () => {
    if (!userActive.value)
      resume()
    else
      pause()
  }, { immediate: true })
}
async function setupDir() {
  csvDirHandle.value = await get<FileSystemDirectoryHandle>('handles:csv_directory')
  try {
    if (csvDirHandle.value) {
      const permissionState = await csvDirHandle.value.queryPermission({ mode: 'read' })
      if (permissionState === 'granted') {
        hasDirReadPermission.value = true
      }
      if (permissionState === 'prompt') {
        hasDirReadPermission.value = await csvDirHandle.value.requestPermission({ mode: 'read' }) === 'granted'
      }
    }
  }
  catch (err) {
    useToast().add({ title: 'Error', description: 'An error occurred while checking for files.', timeout: 0 })
  }
}
watch(userActive, () => {
  if (userActive.value) {
    setupDir()
  }
}, { immediate: true })
watchEffect(async () => {
  if (hasDirReadPermission.value && csvDirHandle.value) {
    const files = await Promise.all(requiredFiles.map(async (name) => {
      try {
        const file = await csvDirHandle.value.getFileHandle(name)
        return await file.getFile()
      }
      catch (e) {
        return null
      }
    }))
    discoveredFiles.value = files.filter(file => file !== null)
  }
})
async function openDir() {
  const dir = await window.showDirectoryPicker()
  await set('handles:csv_directory', dir)
  csvDirHandle.value = dir
  hasDirReadPermission.value = true
}
const badgeProps = {
  variant: 'solid',
  color: 'gray',
  class: 'text-sm w-fit',
} as const
</script>

<template>
  <UBadge v-if="!supported" v-bind="badgeProps" variant="solid">
    Your browser does not support this feature
  </UBadge>
  <div v-else class="inline-grid grid-flow-col gap-3">
    <UButton v-bind="$attrs" color="gray" :disabled="!supported" icon="i-lucide-folder-open" @click="openDir">
      Select folder
    </UButton>
    <UBadge v-bind="badgeProps">
      <template v-if="csvDirHandle">
        Selected folder: {{ csvDirHandle.name }}
      </template>
      <template v-else>
        No folder selected
      </template>
    </UBadge>
  </div>
</template>

<style>

</style>
