import type { User } from 'lucia'

export function useUser() {
  const {data: user} = useNuxtData<User | null>('user')
  return user
}
