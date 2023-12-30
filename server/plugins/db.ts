export default defineNitroPlugin(nitro => {
    nitro.hooks.hook('request', async () => {
        const db = useDB()
        await db.connect()
    })
})