import NextAuth, { User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import * as bcrypt from "bcrypt";

interface ExtendedUser extends User {
  id: string;
  email: string;
  tag: string;
  password: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL_SERVER;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const url_r = `${apiUrl}/user/verify/${credentials.email}`;
        try {
          
          const response = await fetch(url_r, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const user = await response.json();

          if (user && credentials.password && await bcrypt.compare(credentials.password, user.password)) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error, "\n", "URL: ", url_r);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
    async session({ session, token }: { session: Session; token: JWT }) {
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
    signIn: "/signin",
    error: "/auth/error", // Добавим страницу ошибки
  },
});

export { handler as GET, handler as POST };
