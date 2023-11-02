<script lang="ts" setup>
const props = defineProps<{ fileName: string; url: string }>()
const form = ref()
const { file, submit, error, status, results } = useNamedFileUpload(form, {
  fileName: props.fileName,
  uploadURL: props.url
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
        @change="file = $event.target.files[0]"
        required
        id="file"
        name="file"
        type="file"
      />
      <template v-if="results?.hasWarnings('file')">
        <template v-for="error of results.getWarnings('file')">
          {{ error }}
        </template>
      </template>
    </fieldset>
    <button :disabled="results.hasErrors()">submit</button>
    <div>
      <p>
        <template v-if="status === 'pending'"> uploading... </template>
        <template v-if="status === 'success'"> done! </template>
        <template v-if="status === 'error'"> uh oh... {{ error }} </template>
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
