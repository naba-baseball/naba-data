export default defineNitroPlugin(async () => {
  const client = useDB()
  try {
    await client.connect()
  }
  catch (e) {
    console.error('failed to connect to mongodb:', e)
  }
})
