import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { createConnection } from 'mysql2'

const connection = createConnection('mysql://naba:naba@localhost:3306/naba')
const db = drizzle(connection)
// this hangs for some reason
await migrate(db, { migrationsFolder: 'drizzle' })
