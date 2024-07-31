<script lang="ts" setup>
defineOptions({ inheritAttrs: false })
const { getFiles, dirHandle, setDirHandle } = useFileUploads()
const supported = 'showDirectoryPicker' in window
async function openDir() {
  try {
    const dir = await window.showDirectoryPicker()
    setDirHandle(dir)
    getFiles()
  }
  catch (err) {
    console.error(err)
  }
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
      {{ dirHandle ? 'Change' : 'Select' }} folder
    </UButton>
    <UBadge v-bind="badgeProps" :variant="dirHandle ? 'subtle' : 'solid'" :color="dirHandle ? `primary` : 'gray'">
      <template v-if="dirHandle">
        Selected folder: {{ dirHandle.name }}
      </template>
      <template v-else>
        No folder selected
      </template>
    </UBadge>
  </div>
</template>

<style>

</style>
