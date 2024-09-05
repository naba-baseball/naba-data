declare global {
  type AuthRole = 'admin' | 'guest'
}

declare module '#auth-utils' {
  interface User {
    role: AuthRole
    username: string
    id: string
  }
}

export {}
