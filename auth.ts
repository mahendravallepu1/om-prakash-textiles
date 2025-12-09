import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Mock bcrypt for now since we can't install it, but in real app use bcrypt
// const bcrypt = require('bcrypt');
// For now, simple string comparison for demo until env is fixed

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsed = z
                    .object({ username: z.string(), password: z.string() })
                    .safeParse(credentials);

                if (!parsed.success) return null;
                const { username, password } = parsed.data;

                // DB fetch
                const user = await prisma.user.findUnique({
                    where: { username },
                });

                if (!user) return null;

                // Verify password (plain text for now as we lack bcrypt, TODO: fix)
                if (user.password !== password) return null;

                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // @ts-ignore
                token.role = user.role;
                // @ts-ignore
                token.username = user.username;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                // @ts-ignore
                session.user.id = token.id;
                // @ts-ignore
                session.user.role = token.role;
                // @ts-ignore
                session.user.username = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
