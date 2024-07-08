<script lang="ts" setup>
const emit = defineEmits<{ done: [] }>()
const store = fileUploadsStore()
const model = defineModel<File[]>({ default: () => [] })
watchEffect(() => model.value = store.files)
watchEffect(() => store.files = model.value)
const { files: dialogFiles, open } = useFileDialog({
  accept: 'text',
  multiple: true,
})
watchEffect(() => {
  if (!dialogFiles.value)
    return
  const fileArr: File[] = []
  for (const file of dialogFiles.value) {
    fileArr.push(file)
  }
  model.value = fileArr
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
  <form name="select-files" class="space-y-2" @submit.prevent="execute">
    <ul v-auto-animate class="grid text-gray-700 dark:text-gray-200 auto-rows-[minmax(40px,1fr)] gap-2">
      <li class="w-[600px] grid grid-cols-3 self-end text-sm uppercase tracking-wide ">
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
      <li v-for="file of model" :key="file.name" class="w-[600px] grid grid-cols-3 p-2">
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
      <template v-for="fileName of store.missingFiles" :key="fileName">
        <li>missing {{ fileName }}</li>
      </template>
    </ul>
    <div class="flex items-center gap-2">
      <UButton color="gray" type="button" @click="open">
        Select files
      </UButton>
      <UButton
        :icon="!statusMessage ? 'i-lucide-upload' : ''"
        :disabled="store.missingFiles.length !== 0"
        type="submit"
        :loading="isLoading"
      >
        {{ statusMessage ?? 'Upload' }}
      </UButton>
    </div>
  </form>
</template>