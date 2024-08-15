import NextAuth, { User, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  id: string;
  email: string;
  tag: string;
  password: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const response = await fetch(`http://localhost:5000/user/verify/${credentials?.email}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        })
        const user = await response.json();
        if (credentials && credentials.email) {
          return user;
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.tag = user.tag;
        token.password = user.password;
      }
      return token;
    },
    async session({ session, token }: { session: Session | null; token: JWT }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.tag = token.tag as string;
        session.user.password = token.password as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin"
  }
})

export { handler as GET, handler as POST }