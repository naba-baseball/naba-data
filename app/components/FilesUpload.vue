<script lang="ts" setup>

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
const emit = defineEmits<{done: []}>()
async function submit() {
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
}
const { execute, error, isLoading } = useAsyncState(submit, undefined, {
  immediate: false,
})
watchEffect(() => {
  if (error.value)
    statusMessage.value = `error! ${error.value}`
})
</script>

<template>
  <form name="select-files" @submit.prevent="execute">
    <UButton type="button" @click="open">
      select files
    </UButton>
    <div>
      <ul>
        <li v-for="file of selectedFiles" :key="file.name">
          {{ file.name }} / {{ file.size / 1000 }} KB /
          {{
            new Date(file.lastModified).toLocaleString("en-us", {
              timeStyle: "medium",
              dateStyle: "short",
            })
          }}
        </li>
      </ul>
    </div>
    <template v-for="fileName of missingFiles" :key="fileName">
      <div>missing {{ fileName }}</div>
    </template>
    <div>
      <p>
        <template v-if="statusMessage">
          {{ statusMessage }}
        </template>
      </p>
    </div>
    <UButton icon="i-lucide-upload"
      :disabled="missingFiles.length !== 0"
      type="submit"
    >
     upload
    </UButton>
  </form>
</template>
