import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // Use JWT for easier handling with simple credentials mixed in
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
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

                if (!user || !user.password) return null;

                // Verify password securely
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, trigger, session }) {
            // Handle session updates if needed
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }

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
            if (token && session.user) {
                // @ts-ignore
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.role = token.role as string;
                // @ts-ignore
                session.user.username = token.username as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login" // Redirect to login on error
    },
});
