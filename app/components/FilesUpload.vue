<script lang="ts" setup>
const emit = defineEmits<{ done: [] }>()
const { files, open } = useFileDialog({
  accept: 'text',
  multiple: true,
})
const requiredFiles = [
  'teams.csv',
  'team_roster.csv',
  'players.csv',
  'players_pitching.csv',
  'players_batting.csv',
]
const selectedFiles = computed(() => {
  const selectedFiles: File[] = []
  if (!files.value)
    return selectedFiles
  for (const file of files.value) {
    if (requiredFiles.includes(file.name))
      selectedFiles.push(file)
  }

  return selectedFiles
})
const missingFiles = computed(() => {
  const missingFiles = requiredFiles.filter(
    fileName => !selectedFiles.value.find(file => file.name === fileName),
  )
  return missingFiles
})
const statusMessage = ref()
const { execute, error, isLoading } = useAsyncState(async () => {
  statusMessage.value = 'uploading...'
  const body = new FormData()
  for (const file of selectedFiles.value) body.append('file', file)
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
    <UButton type="button" @click="open">
      select files
    </UButton>
    <ul v-auto-animate class="grid auto-rows-[minmax(40px,1fr)] gap-2">
      <li class="w-[600px] grid grid-cols-3 p-2 text-sm uppercase tracking-wide opacity-70">
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
      <li v-for="file of selectedFiles" :key="file.name" class="w-[600px] grid grid-cols-3 p-2">
        <div>
          <UIcon class="align-text-bottom text-primary-700 dark:text-primary-500" name="i-lucide-file" />
          {{ file.name }}
        </div>
        <div class="font-mono text-sm opacity-70">
          {{ file.size / 1000 }} KB
        </div>
        <div class="text-sm opacity-70">
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
    <UButton
      :icon="!statusMessage ? 'i-lucide-upload' : ''"
      :disabled="missingFiles.length !== 0"
      type="submit"
      :loading="isLoading"
    >
      {{ statusMessage ?? 'Upload' }}
    </UButton>
  </form>
</template>
