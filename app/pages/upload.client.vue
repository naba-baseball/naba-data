<script setup lang="ts">
function done() {
  const toast = useToast()
  toast.add({ title: 'Site upload successful', actions: [{ label: 'Go home', click: () => navigateTo('/') }] })
}
const discoveredFiles = ref([])
</script>

<template>
  <div class="grid gap-5 w-lg">
    <h1>Upload CSV files</h1>
    <UCard :ui="{ body: { base: 'space-y-3' } }" class="shadow-md">
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-bold">
          Automatically discover new CSV Files
        </h2>
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
      <FilesUploadDirectory v-model="discoveredFiles" />
    </UCard>
    <FilesUpload v-model="discoveredFiles" @done="done()" />
  </div>
</template>
