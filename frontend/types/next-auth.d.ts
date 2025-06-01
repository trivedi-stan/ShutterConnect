import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      isVerified: boolean
      firstName: string
      lastName: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
    isVerified: boolean
    firstName: string
    lastName: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
    isVerified: boolean
    firstName: string
    lastName: string
  }
}
