import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
          include: {
            photographer: true,
          },
        })

        if (!user) {
          throw new Error('No account found with this email address')
        }

        if (!user.password) {
          throw new Error('Please sign in with the method you used to create your account')
        }

        if (!user.isVerified) {
          throw new Error('Please verify your email address before signing in')
        }

        if (!user.isActive) {
          throw new Error('Your account has been deactivated. Please contact support')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid email or password')
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          image: user.avatar,
          isVerified: user.isVerified,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.isVerified = user.isVerified
        token.firstName = user.firstName
        token.lastName = user.lastName
      }

      // Handle Google OAuth
      if (account?.provider === 'google' && user) {
        // Update or create user with Google data
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (existingUser) {
          // Update existing user
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              avatar: user.image,
              isVerified: true, // Google accounts are pre-verified
            },
          })
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.isVerified = token.isVerified as boolean
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign in
      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })

          if (!existingUser) {
            // Create new user from Google profile
            const names = user.name?.split(' ') || ['', '']
            const firstName = names[0] || ''
            const lastName = names.slice(1).join(' ') || ''

            await prisma.user.create({
              data: {
                email: user.email!,
                firstName,
                lastName,
                avatar: user.image,
                role: 'CLIENT', // Default role for Google sign-ups
                isVerified: true, // Google accounts are pre-verified
                isActive: true,
              },
            })
          }
          return true
        } catch (error) {
          console.error('Google sign in error:', error)
          return false
        }
      }

      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // Log successful sign ins
      console.log(`User ${user.email} signed in with ${account?.provider}`)
    },
  },
}
