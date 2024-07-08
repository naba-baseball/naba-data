<script lang="ts" setup>
import { get, set } from 'idb-keyval'

defineOptions({ inheritAttrs: false })

const supported = 'showDirectoryPicker' in window
const csvDirHandle = shallowRef<FileSystemDirectoryHandle>()
const hasDirReadPermission = ref(false)
const model = defineModel<File[]>({ default: () => [] })
const { isActive: isUserActive } = useUserActivation()
const { isWatching: watchingDirectory } = useWatchDirectory()
watch([isUserActive, watchingDirectory], async ([isUserActive, isWatchingDirectory]) => {
  if (!isUserActive || !isWatchingDirectory)
    return
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
}, { immediate: true })
const { files } = useFileUploads()
watchEffect(async () => {
  if (!csvDirHandle.value || !hasDirReadPermission.value || !watchingDirectory.value)
    return
  model.value = files.value.filter(file => file !== null)
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
      {{ csvDirHandle ? 'Change' : 'Select' }} folder
    </UButton>
    <UBadge v-bind="badgeProps" :variant="csvDirHandle ? 'subtle' : 'solid'" :color="csvDirHandle ? `primary` : 'gray'">
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
