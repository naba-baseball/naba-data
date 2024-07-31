<script lang="ts" setup>
const emit = defineEmits<{ done: [] }>()
const dropZoneTarget = ref()
const zone = useDropZone(dropZoneTarget, {
  onDrop: (files) => {
    zone.files.value = files
  },
})
const { missingFiles } = useFileUploads()
const { files: dialogFiles, open } = useFileDialog({
  accept: 'text',
  multiple: true,
})
const dialogFilesArr = computed(() => {
  const fileArr: File[] = []
  if (!dialogFiles.value)
    return null
  for (const file of dialogFiles.value) {
    fileArr.push(file)
  }
  return fileArr
})
const model = defineModel<File[]>({ default: () => [] })
watch([dialogFilesArr, zone.files], ([dialogFiles, dropFiles]) => {
  const files = dialogFiles ?? dropFiles
  if (!files)
    return
  model.value = files
})

const statusMessage = ref()
const { execute, error, isLoading } = useAsyncState(async () => {
  statusMessage.value = 'uploading...'
  const body = new FormData()
  for (const file of model.value) body.append('file', file)
  await $fetch('/api/upload', {
    method: 'POST',
    body,
  })
  statusMessage.value = 'extracting...'
  await $fetch('/api/database', { method: 'PUT' })
  statusMessage.value = 'done :)'
  emit('done')
}, undefined, {
  immediate: false,
})

watchEffect(() => {
  if (error.value)
    statusMessage.value = `error! ${error.value}`
})
</script>

<template>
  <form ref="dropZoneTarget" name="select-files" class="space-y-2" :class="{ 'bg-primary-50 dark:bg-primary-950/50 border border-dashed': zone.isOverDropZone.value }" @submit.prevent="execute">
    <ul v-auto-animate class="grid grid-cols-3 *:grid *:grid-cols-subgrid *:col-span-full text-gray-700 dark:text-gray-200  gap-y-6">
      <li class="w-[600px] self-end text-sm uppercase tracking-wide ">
        <div>
          file name
        </div>
        <div>
          size
        </div>
        <div>
          last modified
        </div>
      </li>
      <li v-for="file of model" :key="file.name" class="">
        <div class="text-gray-950 dark:text-white">
          <UIcon class="align-text-bottom text-primary-700 dark:text-primary-500" name="i-lucide-file" />
          {{ file.name }}
        </div>
        <div class="font-mono text-sm ">
          {{ file.size / 1000 }} kB
        </div>
        <div class="text-sm ">
          {{
            new Date(file.lastModified).toLocaleString("en-us", {
              timeStyle: "short",
              dateStyle: "long",
            })
          }}
        </div>
      </li>
      <template v-for="fileName of missingFiles" :key="fileName">
        <li>missing {{ fileName }}</li>
      </template>
    </ul>
    <div class="flex items-center gap-2">
      <UButton color="gray" type="button" @click="open">
        Select files
      </UButton>
      <UButton
        :icon="!statusMessage ? 'i-lucide-upload' : ''"
        :disabled="missingFiles.length !== 0"
        type="submit"
        :loading="isLoading"
      >
        {{ statusMessage ?? 'Upload' }}
      </UButton>
    </div>
  </form>
</template>
