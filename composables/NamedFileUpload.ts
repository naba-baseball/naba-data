import { create, test, enforce, warn } from 'vest'

type NamedFileUploadOptions = { fileName: string; uploadURL: string }
/**
 *
 * @param formRef should have a file input with name="file"
 * @param fileName
 * @returns
 */
export function useNamedFileUpload(
  formRef: MaybeRefOrGetter<HTMLFormElement>,
  options: MaybeRefOrGetter<NamedFileUploadOptions>
) {
  const opts = computed(() => toValue(options))
  const {
    execute: upload,
    status,
    error
  } = useLazyFetch(opts.value.uploadURL, {
    method: 'POST',
    immediate: false,
    onRequest(req) {
      req.options.body = new FormData(toValue(formRef))
    }
  })
  const suite = create<'file', '', (data: { file?: File }) => void>((data) => {
    test(
      'file',
      `File is not named ${opts.value.fileName}. Is this the right file?`,
      () => {
        warn()
        enforce(data.file?.name).equals(opts.value.fileName)
      }
    )
  })

  const file = shallowRef<File>()
  const { res: results, validate } = useVestSuite(suite)
  watchEffect(() => file.value && validate({ file: file.value }))

  function submit() {
    if (results.value?.hasErrors()) {
      return
    }
    upload()
  }

  return {
    /** store your file in this ref */
    file,
    /** submits the form in formRef you passed in */
    submit,
    /** status of the form submission request */
    status,
    /** errors of the form submission request */
    error,
    /** validation results */
    results
  }
}
