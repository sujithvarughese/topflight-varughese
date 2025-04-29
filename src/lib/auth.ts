import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", value: "admin@mail.com" },
        password: { label: "Password", type: "password", value: "password" },
      },
      async authorize(credentials){
        const user = {
          id: "0",
          email: credentials?.email || "admin@mail.com",
          isAdmin: true,
        }
        if (!user) {
          throw new Error("Invalid credentials")
        }
        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  }
}

export default NextAuth(authOptions)