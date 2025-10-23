import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Accept any non-empty email and password for demo purposes
        if (credentials.email && credentials.password) {
          return { id: 1, name: credentials.email, email: credentials.email };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "changeme",
});
