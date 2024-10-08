export default eventHandler(async (event) => {
  await checkRole('admin')
  const data = await readFormData(event)
  for await (const chunk of data.entries()) {
    const [field, file] = chunk as [string, File]
    if (field !== 'file')
      continue
    const storage = useStorage('files')
    await storage.setItemRaw(file.name, file.stream())
  }
  return 'ok'
})
