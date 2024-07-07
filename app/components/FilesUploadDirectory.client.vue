<script lang="ts" setup>
import { get, set } from 'idb-keyval'

const fsSupported = ref(false)
const csvDirHandle = shallowRef<FileSystemDirectoryHandle>()
const hasDirReadPermission = ref(false)
const discoveredFiles = defineModel<File[]>({ default: () => [] })
csvDirHandle.value = await get<FileSystemDirectoryHandle>('handles:csv_directory')
if (csvDirHandle.value) {
  const permissionState = await csvDirHandle.value.queryPermission({ mode: 'read' })
  if (permissionState === 'granted') {
    hasDirReadPermission.value = true
  }
  if (permissionState === 'prompt') {
    hasDirReadPermission.value = await csvDirHandle.value.requestPermission({ mode: 'read' }) === 'granted'
  }
}
fsSupported.value = 'showDirectoryPicker' in window
watch(hasDirReadPermission, () => {
  if (hasDirReadPermission.value && csvDirHandle.value)
    readFiles(csvDirHandle.value)
}, { immediate: true })
async function openDir() {
  const dir = await window.showDirectoryPicker()
  await set('handles:csv_directory', dir)
}
async function readFiles(handle: FileSystemDirectoryHandle) {
  const files = await Promise.all(FILES_UPLOAD_REQUIRED_FILES.map(async (name) => {
    try {
      const file = await handle.getFileHandle(name)
      return await file.getFile()
    }
    catch (e) {
      return null
    }
  }))
  discoveredFiles.value = files.filter(file => file !== null)
}
</script>

<template>
  <UButton :disabled="!fsSupported" @click="openDir">
    select directory
  </UButton>
  {{ hasDirReadPermission ? 'has perm' : 'no perm' }}
</template>

<style>

</style>
