export default defineNitroPlugin(async (app) => {
  const client = useDB()
  try {
    await client.connect()
  } catch (e) {
    console.error('failed to connect to mongodb:', e)
  }
})
