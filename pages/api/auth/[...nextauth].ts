import NextAuth from "next-auth/next";
import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "@/helpers/functions";
import { connectDB } from "@/helpers/db";

export const authOptions = {
  secret: "topsecret",
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials: Record<string, string> | undefined) {
        const client = await connectDB();

        if (!credentials) {
          throw new Error("invalid credentials");
        }

        const user = await client.db("auth").collection("users").findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("User not found.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log in.");
        }

        client.close();
        return Promise.resolve({ email: user.email }) as Promise<User>;
      },
      credentials: {},
    }),
  ],
} as AuthOptions;

export default NextAuth(authOptions);
