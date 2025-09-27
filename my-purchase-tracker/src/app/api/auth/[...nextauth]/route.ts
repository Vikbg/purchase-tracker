// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "email@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) return null;

				// Compare hashed password
				const isValid = await bcrypt.compare(
					credentials.password,
					user.password,
				);
				if (!isValid) return null;

				return { id: user.id, name: user.email, email: user.email };
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error", // Error code passed in query string as ?error=
		verifyRequest: "/auth/verify-request", // (used for check email message)
		newUser: "/auth/new-user", // New users will be directed here on first sign in
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			// Add user ID to token on sign in
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			// Add user ID and email to session object
			if (session.user) {
				session.user.id = token.id as number;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
