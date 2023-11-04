<script lang="ts" setup>
const props = defineProps<{ fileName: string; url: string }>()
const form = ref()
const { file, submit, error: uploadError, status: uploadStatus, results } = useNamedFileUpload(form, {
  fileName: props.fileName,
  uploadURL: props.url,
})
</script>

<template>
  <form
    ref="form"
    method="POST"
    enctype="multipart/form-data"
    @submit.prevent="submit"
  >
    <fieldset>
      <label for="file">Upload {{ props.fileName }}</label>
      <input
        id="file"
        required
        name="file"
        type="file"
        @change="file = $event.target.files[0]"
      >
      <template v-if="results?.hasWarnings('file')">
        <template v-for="error of results.getWarnings('file')">
          {{ error }}
        </template>
      </template>
    </fieldset>
    <button :disabled="results.hasErrors()">
      submit
    </button>
    <div>
      <p>
        <template v-if="uploadStatus === 'pending'">
          uploading...
        </template>
        <template v-if="uploadStatus === 'success'">
          done!
        </template>
        <template v-if="uploadStatus === 'error'">
          uh oh... {{ uploadError }}
        </template>
      </p>
    </div>
  </form>
</template>

<style>
fieldset {
  & input,
  label {
    display: block;
  }
}
</style>
