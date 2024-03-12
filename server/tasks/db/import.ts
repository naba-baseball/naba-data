import { exec } from 'node:child_process'
import { promisify } from 'node:util'
export default defineTask({
    meta: {
        name: 'db:import',
        description: 'import csv files into sqlite'
    },
    async run() {
        const execAsync = promisify(exec)
        const keys = await useStorage('files').getKeys()
        for (const key of keys) {
            await execAsync((`sqlite3 sqlite.db ".import --csv --skip 1 .files/${key} ${key.replace('.csv', '')}"`))
        }
        return {
            result: 'imported files'
        }
    }
})