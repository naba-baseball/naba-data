import type { User } from 'lucia'

export function useUser() {
  const user = useState<User | null>('user', () => ref(null))
  return user
}
