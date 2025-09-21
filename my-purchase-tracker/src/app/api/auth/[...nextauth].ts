// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client'; // Importer PrismaClient

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
	CredentialsProvider({
	  name: 'Credentials',
	  credentials: {
		email: { label: "Email", type: "email" },
		password: { label: "Password", type: "password" },
	  },
	  async authorize(credentials) {
		// Vérifier si l'utilisateur existe dans la base de données
		const user = await prisma.user.findUnique({
		  where: {
			email: credentials?.email,
		  },
		});

		if (user && user.password === credentials?.password) {
		  // Si l'utilisateur est trouvé et le mot de passe correspond
		  return { id: user.id, name: user.email, email: user.email };
		} else {
		  // Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
		  return null;
		}
	  },
	}),
  ],
  pages: {
	signIn: '/auth/signin', // Personnaliser la page de connexion
  },
  session: {
	strategy: 'jwt', // Utiliser JWT pour la gestion des sessions
  },
  callbacks: {
	async session({ session, token }) {
	  // Ajouter des données supplémentaires à la session si nécessaire
	  session.user.id = token.id;
	  session.user.email = token.email;
	  return session;
	},
  },
};

export default NextAuth(authOptions);
