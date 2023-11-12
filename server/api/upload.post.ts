export default eventHandler(async (event) => {
  const filename = await saveFile(event)
  return 'ok'
})
