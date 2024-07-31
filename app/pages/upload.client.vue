<script setup lang="ts">
function done() {
  const toast = useToast()
  toast.add({ title: 'Site upload successful', actions: [{ label: 'Go home', click: () => navigateTo('/') }] })
}
const showNotification = ref(false)
function notifyFound(files: File[]) {
  if (!files.length) {
    showNotification.value = false
    return
  }
  showNotification.value = true
}
const { lastUploaded } = useLastUploaded()
const isWatching = useWatchDirectoryPreference()
const { files, checkFiles } = useFileUploads()
const { pause, resume } = useTimeoutPoll(pollForNewFiles, 1000, { immediate: true })
watch(files, (files) => {
  if (files.length > 0)
    pause()
  else resume()
}, { immediate: true })
const showFoundToast = () => useToast().add({ title: 'Files Found', description: 'New files are ready to upload', timeout: 6000 })
async function pollForNewFiles() {
  await checkFiles()
  if (files.value.length) {
    showFoundToast()
  }
}
async function checkForNewFiles() {
  await checkFiles()
  if (!files.value.length) {
    useToast().add({ title: 'No new files found', timeout: 3000 })
    return
  }
  showFoundToast()
}
</script>

<template>
  <div class="grid gap-5">
    <h1>Upload CSV files</h1>
    <small>Last uploaded: {{ lastUploaded }}</small>
    <UButton v-if="isWatching" class="w-fit" color="gray" @click="checkForNewFiles()">
      Check for new files
    </UButton>
    <UAlert v-if="showNotification && isWatching" icon="i-lucide-folder-search" title="Updated files detected and are ready to upload" />
    <FilesUpload v-model="files" @done="done()" />
    <UDivider />
    <div class="space-y-3 text-gray-700 dark:text-gray-100 w-lg">
      <div class="flex items-center gap-2">
        <h2 class="text-lg font-medium">
          Automatically discover new CSV Files
        </h2>
        <UToggle v-model="isWatching" />
      </div>
      <p>
        You can select your save's csv folder and it'll automatically be checked for any updates when you visit this page.
      </p>
      <p>
        Usually this is located at <span class="font-bold text-sm">Documents\Out of the Park Developments\OOTP Baseball 24\saved_games\YOUR_SAVE.lg\import_export\csv</span>
      </p>
      <div>
        We'll scan any folder you select for the required files.
      </div>
      <FilesUploadDirectory v-model="files" @update:model-value="notifyFound" />
    </div>
  </div>
</template>
