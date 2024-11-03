// src/app/api/auth/option.ts

import { User } from "@/models/user.models";
import { connectDB } from "@/database/db.config";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

// Extend the JWT and Session interfaces
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    };
  }

  interface JWT {
    id: string;  // Add id directly in JWT
    user: {
      email: string;
      name: string;
    };
  }
}

connectDB();

export const authOption: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const findUser = await User.findOne({ email: user.email });
        if (findUser) return true;
        await User.create({
          googleId: user.id, // or user.googleId if that's how it's returned
        name: user.name,
        email: user.email,
        image: user.image,
        isOAuthUser: true, // Ensure password is not required
        });
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id as string;  
        session.user.email = (token.user as { email: string }).email;
        session.user.name = (token.user as { name: string }).name;
      }
      return session;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.id;
        token.user = {
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },
  },
  providers: [
    Credentials({
      name: "Welcome Back",
      type: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        connectDB()
        
        const user = await User.findOne({ email: credentials?.email });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
  ],
};
