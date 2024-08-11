import { prisma } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ token, session }) {
      if (token) {
        session = {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          } as AdapterUser,
        };
      }

      return session;
    },
  },
});
