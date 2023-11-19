// import { MongoClient } from 'mongodb'
import { PrismaClient } from '@prisma/client'

// const client = new MongoClient(useRuntimeConfig().databaseURL)
export function useDB() {
  const client = new PrismaClient()
  return client
}
