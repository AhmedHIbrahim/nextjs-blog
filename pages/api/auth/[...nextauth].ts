import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials!.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isPasswordValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isPasswordValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
