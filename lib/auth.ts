import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',      type: 'email'    },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        if (
          email    !== process.env.ADMIN_EMAIL    ||
          password !== process.env.ADMIN_PASSWORD
        ) return null

        return { id: '1', email, name: 'Administrador' }
      },
    }),
  ],

  session: { strategy: 'jwt' },
  pages:   { signIn: '/auth/signin' },

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt(params: any) {
      const { token, user } = params
      if (user?.id) token.id = user.id
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session(params: any) {
      const { session, token } = params
      if (session.user) session.user.id = token.id
      return session
    },
  },
})
